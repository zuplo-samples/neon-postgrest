import Subzero, {
  SubzeroError,
  getIntrospectionQuery,
  Env as QueryEnv,
  Method,
} from "@subzerocloud/nodejs";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import * as fs from "fs/promises";
import { join } from "path";

const urlPrefix = "/api";
const publicSchema = "public";
const dbType = "postgresql";

let subzero: Subzero;
const role = "anonymous";
const touched = { current: false };

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

const handler = async (request: Request, method: Method) => {
  if (!touched.current) {
    const path = join(process.cwd(), "subzero", "subzero_wasm_bg.wasm");
    console.log("Reading", path);
    await fs.readFile(path);
    touched.current = true;
  }
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

  const headers = {
    "content-type": "application/json",
  };

  return new Response(JSON.stringify(result), {
    status: 200,
    headers,
  });
};

// export the handler functions for the different queries that can be performed
export async function GET(request: Request) {
  try {
    return await handler(request, "GET");
  } catch (e) {
    if (e instanceof SubzeroError) {
      console.log("SubzeroError:", e);
      return new Response(e.toJSONString(), {
        status: e.status || 500,
        headers: { "content-type": "application/json" },
      });
    } else {
      console.log("Error:", e);
      return new Response((e as Error).toString(), { status: 500 });
    }
  }
}
export async function POST(request: Request) {
  try {
    return await handler(request, "POST");
  } catch (e) {
    if (e instanceof SubzeroError) {
      console.log("SubzeroError:", e);
      return new Response(e.toJSONString(), {
        status: e.status || 500,
        headers: { "content-type": "application/json" },
      });
    } else {
      console.log("Error:", e);
      return new Response((e as Error).toString(), { status: 500 });
    }
  }
}
export async function PUT(request: Request) {
  try {
    return await handler(request, "PUT");
  } catch (e) {
    if (e instanceof SubzeroError) {
      console.log("SubzeroError:", e);
      return new Response(e.toJSONString(), {
        status: e.status || 500,
        headers: { "content-type": "application/json" },
      });
    } else {
      console.log("Error:", e);
      return new Response((e as Error).toString(), { status: 500 });
    }
  }
}
export async function DELETE(request: Request) {
  try {
    return await handler(request, "DELETE");
  } catch (e) {
    if (e instanceof SubzeroError) {
      console.log("SubzeroError:", e);
      return new Response(e.toJSONString(), {
        status: e.status || 500,
        headers: { "content-type": "application/json" },
      });
    } else {
      console.log("Error:", e);
      return new Response((e as Error).toString(), { status: 500 });
    }
  }
}
export async function PATCH(request: Request) {
  try {
    return await handler(request, "PATCH");
  } catch (e) {
    if (e instanceof SubzeroError) {
      console.log("SubzeroError:", e);
      return new Response(e.toJSONString(), {
        status: e.status || 500,
        headers: { "content-type": "application/json" },
      });
    } else {
      console.log("Error:", e);
      return new Response((e as Error).toString(), { status: 500 });
    }
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, PUT, DELETE, PATCH",
      "access-control-allow-headers": "Content-Type, Prefer",
    },
  });
}
