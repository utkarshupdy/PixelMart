"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IProduct } from "@/models/Product";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { BackgroundBeams } from "../components/ui/background-beams";
import UserProduct from "../components/UserProduct";
import { useRouter } from "next/navigation";

export default function MyProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Define state variables at the top
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect if the user is not an admin or if they are logged out
  useEffect(() => {
    if (status !== "loading" && (!session || session.user.role !== "admin")) {
      router.replace("/");
    }
  }, [session, status, router]);

  // Fetch products only if the session exists
  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const data = await apiClient.getProductsOfThatUser();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchMyProducts();
  }, [session]);

  // Early return should come **after** hooks
  if (!session || session.user.role !== "admin") {
    return null; // Prevents flickering
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackgroundBeams />
      <h1 className="text-3xl font-bold mb-8">My Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
  <UserProduct key={product._id?.toString()} product={{ ...product, _id: product._id?.toString() ?? "" }} />
))}



        {products.length === 0 && (
          <div className="text-center py-12 col-span-full">
            <div className="text-base-content/70 text-lg">
              You haven&apos;t uploaded any products yet.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
