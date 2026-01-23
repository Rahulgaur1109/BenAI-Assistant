"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.message || "Failed to register");
      return;
    }
    router.push("/login");
  }

  return (
    <div className="max-w-md mx-auto mt-16 card p-6">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Full name" required />
        <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
        <input className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button className="btn-primary w-full" type="submit">Sign up</button>
      </form>
      <div className="text-sm mt-3 text-white/70">
        Already have an account? <a className="text-indigo-400 hover:underline" href="/login">Sign in</a>
      </div>
    </div>
  );
}
