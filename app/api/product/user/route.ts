import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
    console.log("ENTER IN THIS BLOCK")
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Fetch products belonging to the logged-in user, sorted by creation date
    const products = await Product.find({ userId: session.user.id })
      .select("imageUrl name price category createdAt")
      .sort({ createdAt: -1 })
      .lean();

      console.log(products);
      console.log(products.length);
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
