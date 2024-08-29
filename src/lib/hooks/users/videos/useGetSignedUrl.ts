import { client } from "@/lib/hono";
import { useQuery } from '@tanstack/react-query'
import { InferResponseType,InferRequestType } from "hono";

// type ResponseType=InferResponseType<(typeof client.api.user)["signedUrl"]["$get"]>
// type RequestType=InferRequestType<(typeof client.api.user)["signedUrl"]["$get"]>

export const useSignedUrl=(iFrameURL:string)=>{
    const query=useQuery({
        queryKey:["signedUrl"],
        queryFn:async()=>{
            const response=await client.api.video["get-sign-url"].$get({
                query:{
                    iFrameUrl:iFrameURL
                }
            });
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data=await response.json();
            return await data.data;
        }
    });
    console.log(query);
    return query;
}