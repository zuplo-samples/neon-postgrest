"use client";

import { PostgrestClient } from "@supabase/postgrest-js";
import { useState } from "react";
const REST_URL = "http://localhost:3000/api";

interface PostgrestResponse {
  body: string;
  constraints_satisfied: boolean;
  page_total: number;
  response_headers: Headers | null;
  response_status: number | null;
  total_result_set: number;
}

export default function Home() {
  const [neonData, setNeonData] = useState<string>();
  const [error, setError] = useState<string>();
  const handleClick = async () => {
    const postgrest = new PostgrestClient(REST_URL);
    const { data, error } = await postgrest
      .from("playing_with_neon")
      .select("*");
    if (data) {
      setNeonData(JSON.parse((data as unknown as PostgrestResponse).body));
    }
    if (error) {
      setError(error.message);
    }
  };
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex p-8 flex-col gap-y-4">
      <button
        onClick={handleClick}
        className="bg-white text-black rounded-lg w-fit font-mono p-4 hover:bg-green-300"
      >
        Get Neon data
      </button>
      <div>
        {neonData && (
          <div className="bg-slate-800 text-green-400 font-mono p-4 rounded-lg shadow-md w-full max-h-[50vh] overflow-auto">
            <pre className="whitespace-pre-wrap break-words">
              {JSON.stringify(neonData, null, 2)}
            </pre>
          </div>
        )}
      </div>
      {error && (
        <div className="bg-red-100 p-4 rounded-lg shadow-md w-full text-red-700">
          <pre className="whitespace-pre-wrap break-words">{error}</pre>
        </div>
      )}
    </div>
  );
}
