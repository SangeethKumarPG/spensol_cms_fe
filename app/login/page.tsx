"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { localApi } from "@/lib/localApi";
import type { LoginResponse } from "@/types/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async (): Promise<void> => {
    try {
      const res = await localApi.post<LoginResponse>(
        "/api/auth/login",
        { username, password }
      );

      const siteName = res.data.user.site?.sitename;
      if (siteName) {
        sessionStorage.setItem("siteName", siteName);
      }

      router.push("/dashboard");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      alert(err.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4 bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold text-center">
          CMS Login
        </h1>

        <input
          placeholder="Username"
          className="border w-full p-3 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-black text-white w-full p-3 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
