"use client";
import { useCheckPremium } from "@/lib/hooks/users/use-check-premium";
import React from "react";
import { Upgrade } from "./upgrade";
import { useSignedUrl } from "@/lib/hooks/users/videos/useGetSignedUrl";

export default function VideoPlayer(){
    const {data:isPremium,isPending,isError}=useCheckPremium();
    const {isPending:isSingedUrlPending,isError:isSignedUrlError,data:signedUrl,error}=useSignedUrl("https://iframe.mediadelivery.net/embed/296912/fc2daec2-9654-496a-9a35-35740d53d099");
    console.log({isError,isSignedUrlError});
    console.log({isPremium,signedUrl,error});
    if(isPending || isSingedUrlPending){
        return <div className="w-full h-full flex justify-center items-center text-[20px]">Loading...</div>
    }
    if(isError){
        return <div className="w-full h-full flex justify-center items-center text-[20px] text-red-500 font-bold">Error Found</div>
    }
    if(!isPremium && !isSignedUrlError){
        return <div className="w-full h-full flex flex-col justify-center items-center text-[20px]">
            <span>Upgrade to premium to watch this video</span>
            <div className="bg-black px-3 py-2 text-white rounded-md ml-4"><Upgrade/></div>
        </div>
    }
    return (        
        <iframe src={signedUrl} 
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowFullScreen={true} className="w-full h-full">
        </iframe>)
}