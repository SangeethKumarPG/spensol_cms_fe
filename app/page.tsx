import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieStore = await cookies(); // ✅ await is REQUIRED
  const token = cookieStore.get("token");

  if (token) {
    redirect("/dashboard");
  }

  redirect("/login");
}
