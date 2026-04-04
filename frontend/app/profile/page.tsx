import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SignOutButton from "./signout-button";

export default async function ProfilePage() {
  const session = (await getServerSession(authOptions as any)) as any;

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as { id?: number; name?: string; email?: string; role?: string };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="card-enhanced p-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Profile</h1>
        <p className="text-gray-300">Account details and session information</p>
      </div>

      <div className="card p-6 sm:p-8 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Name</p>
          <p className="text-white font-semibold text-lg">{user.name || "Student"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Email</p>
          <p className="text-gray-200">{user.email || "Not available"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">Role</p>
          <p className="text-gray-200 capitalize">{user.role || "student"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">User ID</p>
          <p className="text-gray-200">{user.id ?? "Not available"}</p>
        </div>
      </div>

      <div className="card p-6 flex items-center justify-between gap-4">
        <p className="text-gray-300">Need to switch account?</p>
        <SignOutButton />
      </div>
    </div>
  );
}
