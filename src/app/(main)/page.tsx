import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import VideoPlayer from "./_component/video-player";

export default async function Home() {
  const session=await auth();
  if(!session){
    redirect("/api/auth/signin");
  }
  return (
    <main className="flex h-screen w-full flex-col items-center justify-between">
        <VideoPlayer/>
    </main>
  );
}
