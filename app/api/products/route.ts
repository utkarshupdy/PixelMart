import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Product, { IProduct } from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectToDatabase();
        const products = await Product.find({}).lean(); // lean() is used to get the data in json format i.e. helps in listing the data
        if(!products || products.length === 0){
            return NextResponse.json({error: "No products found"}, {status: 404});
        }
        return NextResponse.json({products} , {status: 201});
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error : "Something went wrong"} , {status: 500});
        
    }
}

export async function POST(request : Request){
    try {
        const session = await getServerSession(authOptions);

        if(!session || session.user?.role !== "admin"){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        await connectToDatabase();
        const body : IProduct = await request.json();


        if(
            !body.name ||
            !body.description ||
            !body.imageUrl ||
            body.variants.length === 0
        ){
            return NextResponse.json({error: "Missing required fields"}, {status: 400});
        }

        const newProducts = await Product.create(body);
        return NextResponse.json({newProducts} , {status: 201});
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({error : "Something went wrong"} , {status: 500});
        
    }
}