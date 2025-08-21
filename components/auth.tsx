import { signOut } from "@/auth";
import Link from "next/link";

export function SignInButton() {
  return (
    <Link
      href="/login"
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
    >
      Sign in
    </Link>
  );
}

export async function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium hover:bg-gray-50 transition-colors">
        Sign out
      </button>
    </form>
  );
}
