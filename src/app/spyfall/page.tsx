"use client";
import { ChangeEvent, MouseEvent } from "react";
import { useSpyfallContext } from "./SpyfallContext";
import { useRouter } from "next/navigation";

const SpyFallPage = () => {
  const {
    players,
    updatePlayers,
    addPlayer,
    removePlayer,
    setPlayersToLocalStorage,
  } = useSpyfallContext();

  const router = useRouter();

  const onChangePlayer =
    (index: number) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      let temp_players = [...players];
      temp_players[index] = {
        ...temp_players[index],
        [name]: value,
      };
      updatePlayers(temp_players);
    };

  const onBlurPlayer = (): void => {
    setPlayersToLocalStorage();
  };

  const onRemovePlayer = (index: number) => (e: MouseEvent<HTMLElement>) => {
    removePlayer(index);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-8">
      <div className="z-10 w-full max-w-5xl items-center align-center text-neutral  justify-center lg:flex">
        <h1 className="text-center lg:text-9xl text-4xl font-extrabold text-primary ">
          สายลับ
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

      <div className="z-10 max-w-4xl items-center justify-between text-neutral lg:flex">
        <h6 className="text-center lg:text-l text-xs line-clamp-5">
          เกม Spyfall
          เป็นเกมที่ท้าทายและน่าสนุกที่ให้ผู้เล่นมีโอกาสแสดงฝีมือและความคิดสร้างสรรค์อย่างเต็มที่
          ด้วยบทบาทที่สุ่มให้ทุกคนได้รับ
          เราต้องเล่นบทบาทของสปาย์ที่ซ่อนตัวอย่างเก่งกาจเพื่อไม่ให้คนอื่นสงสัย
          ในเวลาเดียวกันเราต้องถามและตอบคำถามเพื่อค้นหาคำตอบที่ถูกต้อง
          การสร้างความเชื่อมั่นในความรับผิดชอบและการสื่อสารกับคนอื่นก็เป็นส่วนสำคัญในการสร้างบรรยากาศที่มีความสนุกและความตื่นเต้นในการเล่น
          Spyfall ร่วมกัน
        </h6>
      </div>

      <div className="relative flex flex-col place-items-center gap-4 w-full">
        {players.map((player, index) => (
          <div key={index} className="w-full lg:w-8/12">
            <label
              htmlFor={`player-${index}`}
              className="block mb-2 text-sm font-medium text-neutral "
            >
              ผู้เล่นคนที่ {index + 1}
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-neutral bg-neutral border border-r-0 border-gray-300 rounded-l-md">
                <svg
                  className="w-4 h-4 text-background"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input
                type="text"
                id={`player-${index}`}
                className="rounded-none rounded-r-lg  bg-neutral border text-light-background block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 "
                placeholder={`ใส่ชื่อผู้เล่นคนที่ ${index + 1}`}
                name="name"
                value={player.name}
                onChange={onChangePlayer(index)}
                onBlur={onBlurPlayer}
              />
              <button
                className="outline outline-1 outline-primary rounded ml-2 py-2 px-2 text-neutral hover:bg-primary hover:text-white transition-colors"
                onClick={onRemovePlayer(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
        <button
          className="outline outline-1 outline-primary rounded py-2 px-4 text-neutral hover:bg-primary hover:text-white transition-colors disabled:opacity-25"
          onClick={addPlayer}
          disabled={players.length > 11}
        >
          เพิ่มผู้เล่น
        </button>
      </div>

      <div className="mb-32 grid  place-content-end text-center mt-4 lg:mb-0 lg:grid-cols-4 lg:text-left gap-8">
        <a
          href="/spyfall/start"
          className="group rounded-lg text-neutral border border-transparent px-5 py-4 transition-colors hover:border-neutral hover:bg-light-background"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            เริ่มเกม{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1 left-2"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            เป็นสายลับแล้วหาให้เจอว่าสถานที่แห่งนี้อยู่ที่ไหน !!!
          </p>
        </a>
        <a
          href="/spyfall/setting"
          className="group rounded-lg text-neutral border border-transparent px-5 py-4 transition-colors hover:border-neutral hover:bg-light-background"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            สถานที่{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1 left-2"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            ตั้งค่าสถานที่ และ บทบาทของผู้เล่น
          </p>
        </a>
        <a
          href="/spyfall/rule"
          className="group rounded-lg text-neutral border border-transparent px-5 py-4 transition-colors hover:border-neutral hover:bg-light-background"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            กฎ{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1 left-2"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            เกมสายลับ และ วิธีการเล่น
          </p>
        </a>
      </div>
    </main>
  );
};

export default SpyFallPage;
