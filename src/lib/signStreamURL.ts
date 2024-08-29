import { createHash } from "crypto";

export function signStreamURL(iFrameURL:string,securityKey:string){
    const expiration=3600;
    const parsedURL=new URL(iFrameURL);
    const segments=parsedURL.pathname.split("/");
    const videID=segments[3];
    const expires=Math.floor(Date.now()/1000)+expiration;
    const token=generateToken(videID,expires,securityKey);
    parsedURL.searchParams.set("token",token);
    parsedURL.searchParams.set("expires",expires.toString());
    return parsedURL.toString();
}
function generateToken(videId:string,expires:number,securityKey:string){
    const data=securityKey+videId+expires.toString();
    const hash=createHash('sha256');
    hash.update(data);
    return hash.digest("hex");
}