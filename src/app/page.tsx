"use client";
import Image from "next/image";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import spyFallImage from "../../public/spyfall.webp";
import undercoverImage from "../../public/undercover.png";

export interface Player {
  name: string;
  score: number;
}

const initialPlayer = {
  name: "",
  score: 0,
};

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setPlayers([initialPlayer]);
  }, []);

  const onChangePlayer =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPlayers((prevPlayers) => {
        const updatedPlayers = [...prevPlayers];
        if (index >= 0 && index < updatedPlayers.length) {
          updatedPlayers[index] = { ...updatedPlayers[index], [name]: value };
        }
        return updatedPlayers;
      });
    };

  const onAddPlayer = () => {
    setPlayers([...players, initialPlayer]);
  };

  const onRemovePlayer = (index: number) => (e: MouseEvent<HTMLElement>) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers.splice(index, 1);
      return updatedPlayers;
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start  lg:justify-between lg:p-24 p-8">
      <div className="z-10 w-full max-w-5xl items-center justify-between  font-mono text-sm lg:flex"></div>
      <div className="z-10 w-full max-w-5xl items-center align-center text-neutral  justify-center lg:flex">
        <h1 className="text-center lg:text-9xl text-4xl font-extrabold text-primary ">
          บอร์ดเกม
        </h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-background via-background lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.linkedin.com/in/ongsa-sungkanit-615410215/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <h2 className="text-white font-semibold">PiggyPigs</h2>
          </a>
        </div>
      </div>
      <div className="mb-4 grid  text-center mt-4 lg:mb-0 lg:grid-cols-4 lg:text-left gap-8">
        <a
          href="/spyfall"
          className="flex flex-col xs:flex-row lg:flex-col items-center bg-white border border-2 border-white rounded-lg shadow   hover:bg-gray-100 "
        >
          <Image
            className="object-cover w-full xs:w-5/12 lg:w-full rounded rounded-lg h-auto md:h-auto"
            src={spyFallImage}
            alt="สายลับ"
            priority
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              สายลับ
            </h5>
            <p className="mb-3 font-normal text-gray-700">
              ท้าทายและสนุกแสดงฝีมือ ความคิดสร้างสรรค์อย่างเต็มที่
              ด้วยบทบาทที่สุ่มให้ทุกคนได้รับ
              ผู้เล่นจะต้องสวมบทบาทและปิดซ่อนสถานที่
              เพื่อป้องกันไม่ให้สายลับรู้ว่าพวกเราอยู่ที่ไหน !!!
            </p>
          </div>
        </a>

        <div className="relative flex flex-col xs:flex-row lg:flex-col items-center bg-white border border-2 border-white rounded-lg shadow hover:bg-gray-100 ">
          <div
            role="status"
            className="absolute z-5 -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              className="w-full h-20 mr-2 text-background animate-spin fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
          <Image
            className="animate-pulse object-cover w-full xs:w-5/12 lg:w-full rounded rounded-lg h-auto md:h-auto"
            src={undercoverImage}
            alt="นักสืบขี้ลืม"
            priority
          />

          <div className="flex flex-col w-full animate-pulse justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              นักสืบขี้ลืม เร็วๆนี้...
            </h5>
            <div className="flex-1 space-y-5 py-1 w-full">
              <div className="h-2 bg-light-background rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-light-background rounded col-span-2"></div>
                <div className="h-2 bg-light-background rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-light-background rounded"></div>
              <div className="h-2 bg-light-background rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-light-background rounded col-span-1"></div>
                <div className="h-2 bg-light-background rounded col-span-2"></div>
                <div className="h-2 bg-light-background rounded col-span-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
