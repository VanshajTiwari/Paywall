import { Hono } from "hono";
import {zValidator} from "@hono/zod-Validator";
import { verifyAuth } from "@hono/auth-js";
import { razorpay } from "@/lib/razorpay";
import {z} from "zod";
import crypto from "crypto";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
const app=new Hono()
.post("/verify-payment",verifyAuth(),zValidator("json",z.object({
    orderId:z.string(),
    paymentId:z.string(),
    signature:z.string()
})),async(c)=>{
    const session=c.get("authUser");
    const {orderId,paymentId,signature}=c.req.valid("json");
    if(!session.token?.email){
        return c.json({error:"not auth"},401);
    }
    const crypt=crypto.createHmac("sha256",process.env.RAZOR_KEY_SECRET!);
    crypt.update(`${orderId}|${paymentId}`);
    const digest=crypt.digest("hex");
    const isVerified=digest===signature;
    if(!isVerified)
        return c.json({error:"Payment verification failed"},400);
    await db.update(users).set({isPremium:true}).where(eq(users.email,session.token.email));
    return c.json({data:"data is verified"},200);
})
.post("/create-order",verifyAuth(),zValidator("json",z.object({planId:z.string()})
),
async(c)=>{
    const session=c.get("authUser");
    if(!session.token?.email){
        return c.json({error:"not auth"},401);
    }
    //create order
    let options={
        amount:100,
        currency:"INR",
        receipt:"order-rcpid_11",
    }
    const order=await razorpay.orders.create(options);
    if(!order){
        return c.json({error:"order not received"},500);
    }
    return c.json({data:order},200);
})

export default app;