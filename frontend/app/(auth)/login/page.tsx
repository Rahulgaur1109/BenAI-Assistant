"use client";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: true, callbackUrl: "/dashboard" });
    if ((res as any)?.error) setError((res as any).error);
  }

  return (
    <div className="max-w-md mx-auto mt-16 card p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
        <input className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="btn-primary w-full" type="submit">Sign in</button>
      </form>
      <div className="text-sm mt-3 text-white/70">
        New here? <a className="text-indigo-400 hover:underline" href="/register">Create an account</a>
      </div>
    </div>
  );
}
