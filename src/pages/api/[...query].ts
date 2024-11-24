import type { NextApiRequest, NextApiResponse } from "next";
import Subzero, {
  SubzeroError,
  getIntrospectionQuery,
  Env as QueryEnv,
} from "@subzerocloud/nodejs";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";

const urlPrefix = "/api";
const publicSchema = "public";
const dbType = "postgresql";
export const dynamic = "force-dynamic"; // static by default, unless reading the request

let subzero: Subzero;
const role = "anonymous";

async function initSubzero(sql: NeonQueryFunction<false, false>) {
  const { query, parameters } = getIntrospectionQuery(
    dbType,
    publicSchema // the schema name that is exposed to the HTTP api (ex: public, api)
  );
  const data = await sql(query, parameters);

  // the result of the introspection query is a json string representation of the database schema/structure
  // this schema object is used to generate the queries and check the permissions
  // to make the function startup faster, one can cache the schema object
  const schema = JSON.parse(data[0].json_schema);
  subzero = new Subzero(dbType, schema);
}

// Similar implementation to Subzero's handler: https://github.com/subzerocloud/showcase/blob/main/vercel-postgresql-neon/pages/api/%5B...path%5D.ts
// I swap out the library used for a better serverless experience, and less
// boilerplate
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method || "GET";
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!["GET", "POST", "PUT", "DELETE", "PATCH"].includes(method)) {
    throw new SubzeroError(`Method ${method} not allowed`, 400);
  }

  const sql = neon(process.env.DATABASE_URL!);
  // initialize the subzero instance if it is not initialized yet
  if (!subzero) {
    await initSubzero(sql);
  }

  const queryEnv: QueryEnv = [
    ["role", role],
    ["request.method", method],
    ["request.headers", JSON.stringify(req.headers)],
    ["request.jwt.claims", JSON.stringify({ role })],
  ];
  const { query, parameters } = await subzero.fmtStatement(
    publicSchema,
    `${urlPrefix}/`,
    role,
    req,
    queryEnv
  );

  let result: Record<string, unknown>[];

  try {
    result = await sql(query, parameters);
  } catch (e) {
    console.error(
      `Error performing query ${query} with parameters ${parameters}`,
      e
    );
    throw e;
  }
  res.setHeader("Content-Type", "application/json");
  res.json(result);
}
