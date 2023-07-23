"use client";
import { useState, useMemo, useEffect } from "react";
import { shuffle } from "../../../../utils/functions";
import { initialRole, useSpyfallContext } from "../SpyfallContext";
import { Role, Location } from "../types";
import moment from "moment";

const COUNT_TIME = 8;
const SpyFallPage = () => {
  const { players, locations } = useSpyfallContext();

  const [playerInfoIndex, setPlayerInfoIndex] = useState<number | null>(null);
  const [playerViewdInfoIndex, setPlayerViewdInfoIndex] = useState<number[]>(
    []
  );

  const stampDate = useMemo(() => moment().add(COUNT_TIME, "minutes"), []);
  const [counter, setCounter] = useState({
    minutes: COUNT_TIME,
    seconds: 0,
  });

  useEffect(() => {
    var interval = setInterval(() => {
      setCounter({
        minutes: Math.trunc(
          moment.duration(stampDate.diff(moment())).minutes()
        ),
        seconds: Math.trunc(
          moment.duration(stampDate.diff(moment())).seconds()
        ),
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [stampDate]);

  const locationToPlay = useMemo(
    () => locations[Math.floor(Math.random() * locations.length)],
    [locations]
  );

  const roleIndexPlayers: Role[] = useMemo(() => {
    const temp_locationToPlay = JSON.parse(JSON.stringify(locationToPlay));
    const rolesByIndex = [initialRole];
    const spyIndex = Math.floor(Math.random() * players.length);
    temp_locationToPlay.roles = shuffle<Role>(temp_locationToPlay.roles);
    for (let i = 0; i < players.length; i++) {
      if (i === spyIndex) {
        rolesByIndex[i] = {
          name: "คุณคือสายลับ",
          description: "ค้นหาว่าขณะนี้เรากำลังอยู่ในสถานที่ใด",
        };
      } else {
        rolesByIndex[i] = temp_locationToPlay.roles[i];
      }
    }
    return rolesByIndex;
  }, [locationToPlay, players]);

  const filteredLocation: Location[] = useMemo(
    () => locations.filter((location) => location.enable),
    [locations]
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-8">
      <dialog
        open={typeof playerInfoIndex === "number"}
        className="backdrop:bg-white shadow-out z-10 fixed line shadow-primary bg-background rounded-lg px-6 py-8 shadow-xl"
      >
        {typeof playerInfoIndex === "number" && (
          <>
            <h3 className="text-primary mt-2 text-2xl font-large tracking-tight">
              สถานที่:{" "}
              {roleIndexPlayers[playerInfoIndex].name === "คุณคือสายลับ"
                ? "⊬⍜⎍ ⏃⍀⟒ ⌇⌿⊬"
                : locationToPlay.name}
            </h3>
            <h3 className="text-primary mt-2 text-2xl font-large tracking-tight">
              คุณคือ: {roleIndexPlayers[playerInfoIndex].name}
            </h3>
            <p className="text-neutral  mt-2 font-xl">
              {roleIndexPlayers[playerInfoIndex].description}
            </p>
            <button
              className="outline outline-1 outline-primary rounded py-2 px-4 float-right mt-4 text-neutral hover:bg-primary hover:text-white transition-colors disabled:opacity-25"
              onClick={() => {
                setPlayerInfoIndex(null);
              }}
            >
              ปิด
            </button>
          </>
        )}
      </dialog>
      <div
        id="toast-success"
        className={`flex items-center w-fit p-4 mb-4 ${
          counter.minutes + counter.seconds > 0
            ? "text-neutral  border-neutral"
            : "text-red-500  border-red-500"
        } border rounded-lg shadow fixed bottom-0 right-2 lg:bg-transparent bg-background z-10`}
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 0 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 lg:text-4xl text-xl font-normal">
          {counter.minutes + counter.seconds > 0 ? (
            `เหลือเวลาอีก ${String(counter.minutes).padStart(2, "0")}:${String(
              counter.seconds
            ).padStart(2, "0")} นาที`
          ) : (
            <>
              หมดเวลา
              <button
                className="outline outline-1 ml-8 outline-red-500 rounded py-2 px-4 text-neutral hover:bg-red-500 hover:text-white transition-colors disabled:opacity-25"
                onClick={() => {
                  window.location.reload();
                }}
              >
                เริ่มใหม่
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
        <div className="relative flex flex-col place-items-center gap-4 w-full">
          <h2 className="mb-2 lg:text-4xl text-xl font-semibold text-neutral">
            {`ผู้เล่นทั้งหมด ${players.length} คน`}
          </h2>
          {players.map((player, index) => {
            return (
              <div
                key={`player-${index}`}
                id="accordion-collapse"
                className="w-full"
              >
                <h2
                  id="accordion-collapse-heading-1"
                  className="lg:text-2xl text-xl font-semibold text-neutral"
                >
                  <div className="flex items-center  justify-between w-full p-5 font-medium text-left text-neutral border border-light-background rounded-xl focus:ring-4  hover:bg-light-background  ">
                    {`${index + 1} - ${player.name}`}
                    <button
                      className={`${
                        playerViewdInfoIndex.includes(index)
                          ? "hidden"
                          : "visible"
                      } outline outline-1   outline-primary rounded ml-2 py-2 px-2 text-neutral hover:bg-primary hover:text-white transition-colors transition duration-150 ease-in-out`}
                      onClick={() => {
                        setPlayerInfoIndex(index);
                        setPlayerViewdInfoIndex([
                          ...playerViewdInfoIndex,
                          index,
                        ]);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path
                          fillRule="evenodd"
                          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </h2>
              </div>
            );
          })}
        </div>
        <div className="relative flex flex-col place-items-center gap-4 w-full">
          <h2 className="mb-2 lg:text-4xl text-xl font-semibold text-neutral">{`สถานที่ทั้งหมด ${locations.length} แห่ง`}</h2>
          <ul className="flex flex-wrap text-neutral indent-4 leading-8">
            {filteredLocation.map((location, index) => (
              <li key={location.name}>● {location.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-32 grid  place-content-end text-center mt-4 lg:mb-0 lg:grid-cols-4 lg:text-left gap-8">
        <a
          href="/spyfall"
          className="group rounded-lg text-neutral border border-transparent px-5 py-4 transition-colors hover:border-neutral hover:bg-light-background"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            สายลับ
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1 left-2"
              >
                <path d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z" />
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.575 15.6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            กลับไปที่หน้าหลัก เพื่อเลือกผู้เล่น
          </p>
        </a>
        <a
          href="/spyfall/start"
          className="group rounded-lg text-neutral border border-transparent px-5 py-4 transition-colors hover:border-neutral hover:bg-light-background"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            เริ่มใหม่
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1 left-2"
              >
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>เริ่มเกมใหม่</p>
        </a>
      </div>
    </main>
  );
};

export default SpyFallPage;
