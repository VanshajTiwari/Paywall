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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-full h-screen">
        <VideoPlayer/>
      </div>
    </main>
  );
}
