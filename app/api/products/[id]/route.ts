import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    props : {params : Promise<{id: string}>}
){
    try {
        const {id} = await props.params;
        await connectToDatabase();
        const product = await Product.findById(id)?.lean(); // lean() is used to get the data in json format i.e. helps in listing the data
        if(!product || product.length === 0){
            return NextResponse.json({error: "No products found"}, {status: 404});
        }

        return NextResponse.json({product} , {status: 201});



        
    } catch (error) {
        console.error(error);
         return NextResponse.json({error : "Failed to fetch the product"} , {status: 500});
        
    }
}