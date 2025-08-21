import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", {
              email: formData.get("email") as string,
              password: formData.get("password") as string,
              redirectTo: "/",
            });
          } catch {
            redirect("/login?error=Invalid%20credentials");
          }
        }}
      >
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-1 w-full border rounded p-2"
            required
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{decodeURIComponent(error)}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
