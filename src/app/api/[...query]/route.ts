import Subzero, {
  SubzeroError,
  getIntrospectionQuery,
  Env as QueryEnv,
  fmtContentRangeHeader /*fmtPostgreSqlEnv*/,
  Method,
} from "@subzerocloud/nodejs";
import { Pool } from "pg";

const urlPrefix = "/api";
const publicSchema = "public";
const dbType = "postgresql";
const connectionString = process.env.DATABASE_URL;
const dbPool = new Pool({
  connectionString,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
let subzero: Subzero;
async function initSubzero() {
  console.log("initSubzero");

  const { query, parameters } = getIntrospectionQuery(
    dbType, // database type
    publicSchema // the schema name that is exposed to the HTTP api (ex: public, api)
  );
  const db = await dbPool.connect();
  const result = await db.query(query, parameters);
  db.release();

  // the result of the introspection query is a json string representation of the database schema/structure
  // this schema object is used to generate the queries and check the permissions
  // to make the function startup faster, one can cache the schema object
  const schema = JSON.parse(result.rows[0].json_schema);
  //console.log('schema', schema)
  subzero = new Subzero(dbType, schema);
}

const handler = async (request: Request, method: Method) => {
  const role = "anonymous";
  const requestURL = new URL(request.url);
  const offset = requestURL.searchParams.get("offset");
  if (!["GET", "POST", "PUT", "DELETE", "PATCH"].includes(method))
    throw new SubzeroError(`Method ${method} not allowed`, 400);
  // initialize the subzero instance if it is not initialized yet
  if (!subzero) {
    await initSubzero();
  }

  const queryEnv: QueryEnv = [
    ["role", role],
    ["request.method", method],
    ["request.headers", JSON.stringify(request.headers)],
    ["request.jwt.claims", JSON.stringify({ role })],
  ];
  const { query, parameters } = await subzero.fmtStatement(
    publicSchema,
    `${urlPrefix}/`,
    role,
    request,
    queryEnv
  );

  let result;
  const db = await dbPool.connect();
  try {
    const txMode = method === "GET" ? "READ ONLY" : "READ WRITE";
    await db.query(`BEGIN ISOLATION LEVEL READ COMMITTED ${txMode}`);
    //await db.query(envQuery, envParameters)
    result = (await db.query(query, parameters)).rows[0];
    if (!result.constraints_satisfied) {
      throw new SubzeroError(
        "Permission denied",
        403,
        "check constraint of an insert/update permission has failed"
      );
    }
    await db.query("COMMIT");
  } catch (e) {
    await db.query("ROLLBACK");
    throw e;
  } finally {
    db.release();
  }

  const status = Number(result.status) || 200;
  const pageTotal = Number(result.page_total) || 0;
  const totalResultSet = Number(result.total_result_set) || undefined;

  const offsetInt = Number(offset) || 0;
  const headers = {
    "range-unit": "items",
    "content-range": fmtContentRangeHeader(
      offsetInt,
      offsetInt + pageTotal - 1,
      totalResultSet
    ),
    "content-type": "application/json",
  };

  return new Response(JSON.stringify(result), {
    status,
    headers,
  });
};

// export the handler functions for the different queries that can be performed
export async function GET(request: Request) {
  return handler(request, "GET");
}
export async function POST(request: Request) {
  return handler(request, "POST");
}
export async function PUT(request: Request) {
  return handler(request, "PUT");
}
export async function DELETE(request: Request) {
  return handler(request, "DELETE");
}
export async function PATCH(request: Request) {
  return handler(request, "PATCH");
}
