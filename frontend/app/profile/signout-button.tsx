"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="btn-primary px-6 py-3"
      type="button"
    >
      Sign out
    </button>
  );
}
