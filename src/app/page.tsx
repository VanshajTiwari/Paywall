import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session=await auth();
  if(!session){
    redirect("/api/auth/signin");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{position:"relative"}} className="w-screen h-screen">
        <iframe src="https://iframe.mediadelivery.net/embed/296912/fc2daec2-9654-496a-9a35-35740d53d099?autoplay=true&loop=false&muted=false&preload=true&responsive=true" 
        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" allowFullScreen={true} className="w-full h-full">
        </iframe>
      </div>
    </main>
  );
}
