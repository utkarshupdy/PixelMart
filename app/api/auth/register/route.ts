import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {


    try {
        const {email , password} = await request.json()
        if(!email || !password){
            return NextResponse.json({error: "Missing email or password"}, {status: 400})
        }
        await connectToDatabase()
        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        await User.create({email , password , role: "user"})
        return NextResponse.json(
            {message: "User registered successfully"},
            {status: 201}
        )

        
    } catch (error) {
        console.error("Registration error" , error);
        return NextResponse.json(
            {message: "Registration failed"},
            {status: 501}
        )
        
    }
}