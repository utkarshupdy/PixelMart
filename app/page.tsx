"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Full Screen Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/4284805/pexels-photo-4284805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Welcome to Pixel Mart
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Share your images, set your price, and let the world purchase your art.
          </p>
          <Link href="/collection">
            <button className="btn btn-primary btn-lg flex items-center gap-2">
              Explore Gallery <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
