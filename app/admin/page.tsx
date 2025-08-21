import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600">Only accessible to administrators.</p>
    </div>
  );
}
