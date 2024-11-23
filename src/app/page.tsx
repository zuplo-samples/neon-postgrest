"use client";

import { PostgrestClient } from "@supabase/postgrest-js";
import { useState } from "react";
import Image from "next/image";
// Replace the REST_URL with your Zuplo gateway URL (or your Vercel URL directly
// if you don't want protection)
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
  const handleFetchClick = async () => {
    const postgrest = new PostgrestClient(REST_URL);
    const { data, error } = await postgrest
      .from("playing_with_neon")
      .select("*")
      .order("id", { ascending: false });
    if (data) {
      setNeonData(JSON.parse((data as unknown as PostgrestResponse[])[0].body));
    }
    if (error) {
      setError(error.message);
    }
  };
  const handleInsertClick = async () => {
    const randomName = Math.random().toString(36).substring(7);
    const random = Math.random();
    const postgrest = new PostgrestClient(REST_URL, {
      headers: {
        Prefer: "return=minimal",
      },
    });
    const { data, error } = await postgrest
      .from("playing_with_neon")
      .insert({ name: randomName, value: random });
    if (data) {
      handleFetchClick();
    }
    if (error) {
      setError(error.message);
    }
  };
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex p-8 items-center flex-col gap-y-4">
      <header className="text-4xl font-medium text-green-400">
        Neon PostgREST API Demo
      </header>
      <div>A Supabase-like API DevX with Neon and PostgREST.</div>
      <div className="flex gap-x-4">
        <button
          onClick={handleFetchClick}
          className="bg-white text-black rounded-lg w-fit font-mono p-4 hover:bg-green-600 hover:text-white"
        >
          Fetch Table Data
        </button>
        <button
          onClick={handleInsertClick}
          className="bg-white text-black rounded-lg w-fit font-mono p-4 hover:bg-green-600 hover:text-white"
        >
          Add Random Data
        </button>
      </div>
      <div className="w-full">
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
      <footer className="absolute bottom-8 w-full">
        <div className="flex justify-center text-xl pb-3">BUILT WITH</div>
        <div className="flex gap-x-8 items-center w-full justify-center flex-wrap">
          <Image src="/vercel.svg" alt="Vercel Logo" width={32} height={32} />
          <Image
            src="/neon-logo-dark-mono.svg"
            alt="Neon Logo"
            width={78}
            height={32}
          />
          <Image src="/zuplo.svg" alt="Zuplo Logo" width={78} height={32} />
          <Image src="/next.svg" alt="NextJS Logo" width={78} height={32} />
          <Image src="/subzero.png" alt="Subzero Logo" width={40} height={40} />
        </div>
      </footer>
    </div>
  );
}
