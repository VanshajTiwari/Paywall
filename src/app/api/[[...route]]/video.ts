import { verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";
import {zValidator} from "@hono/zod-Validator";
import {z} from "zod";
import { signStreamURL } from "../../../lib/signStreamURL";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
const app=new Hono()
.get("/get-sign-url",
    verifyAuth(),
    zValidator("query",z.object({
    iFrameUrl:z.string()
})
)
,async(c)=>{
    const session=c.get("authUser");
    const iFrameURL=c.req.valid("query").iFrameUrl;
    if(!session.token?.email){
        return c.json({error:"unauthorized"},401);
    }
    // check if user is permium
    const user=await db.select().from(users).where(eq(users.email,session.token.email));
    if(user.length==0){
        return c.json({error:"user not found"},404);
    }
    console.log(user);
    if(!user[0].isPremium){
        return c.json({error:"user is not premium"},403);
    }
    
    //get signed url
    const signedUrl=signStreamURL(iFrameURL,process.env.BUNNYCDN_TOKEN!);
    if(!signedUrl)
        return c.json({error:"error in signing url"},400);
    console.log(signedUrl);
    return c.json({data:signedUrl},200);
}
)



export default app;