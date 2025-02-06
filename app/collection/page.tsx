"use client";

import React, { useEffect, useState } from "react";
import ImageGallery from "../components/ImageGallery";
import { IProduct } from "@/models/Product";
import { apiClient } from "@/lib/api-client";
import { BackgroundBeams } from "../components/ui/background-beams";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiClient.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="relative"> {/* Add this wrapper div */}
        <BackgroundBeams className="absolute inset-0 z-0" /> {/* Ensure background stretches across the container */}
        <h1 className="text-3xl font-bold mb-8 z-10 relative">Browse Collections</h1>
        <div className="relative z-10"> {/* Add z-index to ensure cards are above background */}
          <ImageGallery products={products} />
        </div>
      </div>
    </main>
  );
}
