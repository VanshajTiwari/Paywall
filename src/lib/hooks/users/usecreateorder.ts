import { client } from "@/lib/hono";
import { useMutation } from '@tanstack/react-query'
import { InferResponseType,InferRequestType } from "hono";
import { toast } from "sonner";

type ResponseType=InferResponseType<(typeof client.api.payments)["create-order"]["$post"],200>
type RequestType=InferRequestType<(typeof client.api.payments)["create-order"]["$post"]>["json"]

export const useCreateOrder=()=>{
    const mutation=useMutation<ResponseType,Error,RequestType>({
        mutationFn:async(json)=>{
            const response=await client.api.payments["create-order"].$post({json});
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const data=await response.json();
            return data;
        },
        onError:(error)=>{
            console.log(error);
            toast.error("order fail!");
        },
        onSuccess:()=>{
            toast.success("order created successfully")
        }
    })
    return mutation;
}