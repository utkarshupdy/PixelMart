
import { connectToDatabase } from '@/lib/db';
import Order from '@/models/Order';
import crypto from 'crypto';
import { NextRequest , NextResponse } from 'next/server';
import nodemailer from "nodemailer";
export async function POST(req: Request) {
    try {
        const body = await req.text();
        const signature = req.headers.get('x-razorpay-signature');

        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
        .update(body)
        .digest('hex');

        if(expectedSignature !== signature){
            return NextResponse.json({error: "Invalid signature"}, {status: 400});
        }

        const event = JSON.parse(body);
        await connectToDatabase();
        console.log(event);

        if(event.event === "payment.succeeded") {
            const payment = event.payload.payment.entity; // payload is just a text information that comes up to you from razorpay

            const order = await Order.findOneAndUpdate(
                {razorpayOrderId: payment.order_id},
                {
                    razorpayPaymentId: payment.id,
                    status: "completed"
                }
            ).populate([
                {path: "productId" , select: "name"},
                {path: "userId" , select: "email"},
            ])

            if(order){
                const transporter = nodemailer.createTransport({
                    service: "sandbox.smtp.mailtrap.io",
                    port: 2525 ,
                    auth: {
                        user: process.env.MAILTRAP_USERNAME!,
                        pass: process.env.MAILTRAP_PASSWORD!,
                    }
                });

                await transporter.sendMail({
                    from: "your@example.com",
                    to: order.userId.email,
                    subject: "Your order has been placed successfully",
                    html: `<h1>Hi ${order.userId.email}</h1><p>Thanks for ordering ${order.productId.name} from our website. Your order has been placed successfully.</p>`,
                });
            }

            return NextResponse.json({message: "Payment successful"} , {status: 200});
        }

        
    } catch (error) {
        console.log(error);
        return NextResponse.json({error : "Something went wrong"} , {status: 500});
        
    }

}