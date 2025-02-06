"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AdminProductForm from "../components/AdminProductForm";
import { BackgroundBeams } from "../components/ui/background-beams";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if the user is not an admin or if they are logged out
  useEffect(() => {
    if (status !== "loading" && (!session || session.user.role !== "admin")) {
      router.replace("/");
    }
  }, [session, status, router]);

  if (!session || session.user.role !== "admin") {
    return null; // Prevents flickering
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackgroundBeams />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
        <AdminProductForm />
      </div>
    </div>
  );
}
