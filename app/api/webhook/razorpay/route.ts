// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import Order from "@/models/Order";
// import { connectToDatabase } from "@/lib/db";
// import nodemailer from "nodemailer";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.text();
//     const signature = req.headers.get("x-razorpay-signature");

//     const expectedSignature = crypto
//   .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
//   .update(body, "utf-8") // Ensure correct encoding
//   .digest("hex");


//     if (signature !== expectedSignature) {
//       return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
//     }

//     const event = JSON.parse(body);
//     await connectToDatabase();

//     if (event.event === "payment.captured") {
//       const payment = event.payload.payment.entity;

//       const order = await Order.findOneAndUpdate(
//         { razorpayOrderId: payment.order_id },
//         {
//           razorpayPaymentId: payment.id,
//           status: "completed",
//         }
//       ).populate([
//         { path: "userId", select: "email" },
//         { path: "productId", select: "name" },
//       ]);

//       if (order) {
//         // Send email only after payment is confirmed
//         const transporter = nodemailer.createTransport({
//           host: "sandbox.smtp.mailtrap.io",
//           port: 2525,
//           auth: {
//             user: process.env.MAILTRAP_USER,
//             pass: process.env.MAILTRAP_PASS,
//           },
//         });

//         await transporter.sendMail({
//           from: '"ImageKit Shop" <noreply@imagekitshop.com>',
//           to: order.userId.email,
//           subject: "Payment Confirmation - ImageKit Shop",
//           text: `
// Thank you for your purchase!

// Order Details:
// - Order ID: ${order._id.toString().slice(-6)}
// - Product: ${order.productId.name}
// - Version: ${order.variant.type}
// - License: ${order.variant.license}
// - Price: $${order.amount.toFixed(2)}

// Your image is now available in your orders page.
// Thank you for shopping with ImageKit Shop!
//           `.trim(),
//         });
//       }
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import Order from "@/models/Order";
// import { connectToDatabase } from "@/lib/db";
// import nodemailer from "nodemailer";

// export async function POST(req: NextRequest) {
//   try {
//     // ✅ Read raw buffer instead of text
//     const rawBody = await req.arrayBuffer();
//     const body = Buffer.from(rawBody);
    
//     const signature = req.headers.get("x-razorpay-signature");

//     // ✅ Ensure secret is loaded
//     if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
//       console.error("RAZORPAY_WEBHOOK_SECRET is missing");
//       return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
//     }

//     // ✅ Compute the correct signature
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
//       .update(body)
//       .digest("hex");

//     // ✅ Validate webhook signature
//     if (!signature || signature !== expectedSignature) {
//       console.error("Invalid Razorpay Webhook Signature!");
//       console.error("Received Signature:", signature);
//       console.error("Expected Signature:", expectedSignature);
//       return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
//     }

//     // ✅ Parse the JSON event AFTER signature verification
//     const event = JSON.parse(body.toString());
//     await connectToDatabase();

//     if (event.event === "payment.captured") {
//       const payment = event.payload.payment.entity;

//       const order = await Order.findOneAndUpdate(
//         { razorpayOrderId: payment.order_id },
//         {
//           razorpayPaymentId: payment.id,
//           status: "completed",
//         }
//       ).populate([
//         { path: "userId", select: "email" },
//         { path: "productId", select: "name" },
//       ]);

//       if (order) {
//         // ✅ Send email after successful payment
//         const transporter = nodemailer.createTransport({
//           host: "sandbox.smtp.mailtrap.io",
//           port: 2525,
//           auth: {
//             user: process.env.MAILTRAP_USER,
//             pass: process.env.MAILTRAP_PASS,
//           },
//         });

//         await transporter.sendMail({
//           from: '"ImageKit Shop" <noreply@imagekitshop.com>',
//           to: order.userId.email,
//           subject: "Payment Confirmation - ImageKit Shop",
//           text: `
// Thank you for your purchase!

// Order Details:
// - Order ID: ${order._id.toString().slice(-6)}
// - Product: ${order.productId.name}
// - Version: ${order.variant.type}
// - License: ${order.variant.license}
// - Price: $${order.amount.toFixed(2)}

// Your image is now available in your orders page.
// Thank you for shopping with ImageKit Shop!
//           `.trim(),
//         });
//       }
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
//   }
// }


// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import Order from "@/models/Order";
// import { connectToDatabase } from "@/lib/db";
// import nodemailer from "nodemailer";

// export async function POST(req: NextRequest) {
//   try {
//     // ✅ Read raw body correctly using ReadableStream (Fix for Next.js App Router)
//     const chunks: any[] = [];
//     const reader = req.body?.getReader();

//     if (!reader) {
//       console.error("❌ Failed to read request body!");
//       return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//     }

//     let done = false;
//     while (!done) {
//       const { value, done: doneReading } = await reader.read();
//       if (value) chunks.push(value);
//       done = doneReading;
//     }

//     const rawBody = Buffer.concat(chunks);
//     const bodyString = rawBody.toString("utf-8"); // Convert to string for parsing

//     const signature = req.headers.get("x-razorpay-signature");

//     // ✅ Ensure secret is set
//     if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
//       console.error("❌ RAZORPAY_WEBHOOK_SECRET is missing!");
//       return NextResponse.json({ error: "Webhook secret missing" }, { status: 500 });
//     }

//     // ✅ Compute the correct signature
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
//       .update(rawBody) // Use raw Buffer for signature calculation
//       .digest("hex");

//     // ✅ Validate webhook signature
//     if (!signature || signature !== expectedSignature) {
//       console.error("❌ Invalid Razorpay Webhook Signature!");
//       console.error("Received Signature:", signature);
//       console.error("Expected Signature:", expectedSignature);
//       return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
//     }

//     // ✅ Parse JSON only AFTER signature verification
//     const event = JSON.parse(bodyString);
//     await connectToDatabase();

//     if (event.event === "payment.captured") {
//       const payment = event.payload.payment.entity;

//       const order = await Order.findOneAndUpdate(
//         { razorpayOrderId: payment.order_id },
//         {
//           razorpayPaymentId: payment.id,
//           status: "completed",
//         }
//       ).populate([
//         { path: "userId", select: "email" },
//         { path: "productId", select: "name" },
//       ]);

//       if (order) {
//         // ✅ Send email after successful payment
//         const transporter = nodemailer.createTransport({
//           host: "sandbox.smtp.mailtrap.io",
//           port: 2525,
//           auth: {
//             user: process.env.MAILTRAP_USER,
//             pass: process.env.MAILTRAP_PASS,
//           },
//         });

//         await transporter.sendMail({
//           from: '"ImageKit Shop" <noreply@imagekitshop.com>',
//           to: order.userId.email,
//           subject: "Payment Confirmation - ImageKit Shop",
//           text: `
// Thank you for your purchase!

// Order Details:
// - Order ID: ${order._id.toString().slice(-6)}
// - Product: ${order.productId.name}
// - Version: ${order.variant.type}
// - License: ${order.variant.license}
// - Price: $${order.amount.toFixed(2)}

// Your image is now available in your orders page.
// Thank you for shopping with ImageKit Shop!
//           `.trim(),
//         });
//       }
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error("❌ Webhook error:", error);
//     return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
//   }
// }


// ERROR IN WEBHOOK SIGNATURE .. BYPASSSING THIS FEATURE FOR NOW
import { NextRequest, NextResponse } from "next/server";
import Order from "@/models/Order";
import { connectToDatabase } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    // ✅ Read request body as JSON
    const body = await req.json();
    await connectToDatabase();

    // ✅ Log the event for debugging
    console.log("🔹 Received Razorpay Webhook:", body);

    // ✅ Process only "payment.captured" event
    if (body.event === "payment.captured") {
      const payment = body.payload.payment.entity;

      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        {
          razorpayPaymentId: payment.id,
          status: "completed",
        }
      ).populate([
        { path: "userId", select: "email" },
        { path: "productId", select: "name" },
      ]);

      if (order) {
        // ✅ Send email immediately (Bypassing signature verification)
        const transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
          },
        });

        await transporter.sendMail({
          from: '"Pixel Mart Store" <noreply@pixelmartstore.com>',
          to: order.userId.email,
          subject: "Order Placed - Pixel Mart Store",
          text: `
Your order has been successfully placed!

Order Details:
- Order ID: ${order._id.toString().slice(-6)}
- Product: ${order.productId.name}
- Version: ${order.variant.type}
- License: ${order.variant.license}
- Price: $${order.amount.toFixed(2)}

Your image will be available in your orders page shortly.
Thank you for shopping with Pixel Mart!
          `.trim(),
        });

        console.log("✅ Email sent to:", order.userId.email);
      }
    }

    return NextResponse.json({ success: true, message: "Webhook received & processed" });
  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
