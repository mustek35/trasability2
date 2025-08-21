import { signIn, signOut } from "@/auth";

export function SignInForm() {
  return (
    <form
      action={async (formData) => {
        "use server";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        await signIn("credentials", { email, password, redirectTo: "/" });
      }}
      className="flex flex-col gap-2"
    >
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border border-gray-300 rounded px-3 py-2"
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded px-3 py-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
      >
        Sign in
      </button>
    </form>
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
