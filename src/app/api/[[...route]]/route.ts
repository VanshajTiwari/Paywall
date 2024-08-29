import { Context, Hono } from 'hono'
import { handle } from 'hono/vercel';
import {AuthConfig,initAuthConfig} from "@hono/auth-js";
import authConfig from '@/auth.config';
export const runtime="nodejs";
import userRoutes from "@/app/api/[[...route]]/user";
import paymentRoute from "@/app/api/[[...route]]/payments";
import videoRoute from "@/app/api/[[...route]]/video";
const app = new Hono().basePath("/api");
//...

function getAuthConfig(c:Context):AuthConfig{
    return {
        secret:c.env.AUTH_SECRET,
        ...authConfig
    }
}
app.use("*",initAuthConfig(getAuthConfig));

const routes=app.route("/user",userRoutes).route("/payments",paymentRoute).route("/video",videoRoute);



export const GET=handle(app);
export const POST=handle(app);
export const DELETE=handle(app);
export const PATCH=handle(app );

export type AppType=typeof routes;