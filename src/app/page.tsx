import Image from "next/image";
import MobileMainHeader from "@/components/header/mobilemainheader";
import MobileHeaderButton from "@/components/button/mobileheaderbutton";
import MainCarousel from "@/components/section/maincarousel";
import DragScrollContainer from "@/components/section/dragscrollcontainer";
import SectionButton from "@/components/button/sectionbutton";
import { auth } from "@/auth";
import { Search } from "lucide-react";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col w-full min-h-screen">
      <MobileMainHeader text="원집">
        <MobileHeaderButton icon={Search} />
      </MobileMainHeader>
      <main className="flex flex-col gap-6 row-start-2 items-center pt-5 px-6">
        <MainCarousel />
        <SectionButton text="전체 서비스" />
        <DragScrollContainer>{}</DragScrollContainer>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
