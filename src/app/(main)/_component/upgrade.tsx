import { useCreateOrder } from "@/lib/hooks/users/usecreateorder"
import { useVerifyOrder } from "@/lib/hooks/users/useverifyorder";
import { loadScript } from "@/lib/loadscript";
import Razorpay from "razorpay";
import { useEffect } from "react";
export const Upgrade=()=>{
    const cretaeOrderMutation=useCreateOrder();
    const verifyOrderMutation=useVerifyOrder();

    const verifyPayment=async(orderData:any)=>{
        verifyOrderMutation.mutate({
            signature:orderData.razorpay_signature,
            orderId:orderData.razorpay_order_id,
            paymentId:orderData.razorpay_payment_id
        },{
            onSuccess:()=>{
            console.log("Payment verified");
            },
            onError:()=>{
            console.log("Payment Error")
            }})};
    
    const onPayment=async()=>{
        let orderData;
        cretaeOrderMutation.mutate({planId:"premium"},{onSuccess:async (data)=>{
            const paymentObject=new  (window as any).Razorpay({
                key:process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                order_id:data.data.id,
                ...data.data,
                handler:async function(response:any){
                    console.log(response);
                    orderData=response;
                    await verifyPayment(orderData);
                }
            })
                await paymentObject.open();
        }});
    }
    useEffect(()=>{
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    },[]);
    return (
        <button onClick={onPayment} className="">Upgrade</button>
    )
}