import { client } from "@/lib/hono";
import { useQuery } from '@tanstack/react-query'
import { InferResponseType,InferRequestType } from "hono";

type ResponseType=InferResponseType<(typeof client.api.user)["is-premium"]["$get"]>
type RequestType=InferRequestType<(typeof client.api.user)["is-premium"]["$get"]>

export const useCheckPremium=()=>{
    const query=useQuery({
        queryKey:["is-premium"],
        queryFn:async()=>{
            const response=await client.api.user["is-premium"]["$get"]();
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const {isPremium}=await response.json();
            return await isPremium;
        }
    });
    console.log(query);
    return query;
}