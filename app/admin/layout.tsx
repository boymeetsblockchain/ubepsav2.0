import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user.role === "ADMIN") {
    redirect("/");
  }

  return <main>{children}</main>;
}
