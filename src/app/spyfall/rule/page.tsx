"use client";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useSpyfallContext } from "../SpyfallContext";

const SpyFallPage = () => {
  const {
    locations,
    updateLocations,
    addLocation,
    removeLocation,
    setLocationToLocalStorage,
    toggleEnablelationLocation,
  } = useSpyfallContext();

  const [expandIndex, setExpandIndex] = useState<number | null>(null);

  const onChangeLocation =
    (index: number) =>
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      let temp_locations = [...locations];
      temp_locations[index] = {
        ...temp_locations[index],
        [name]: value,
      };
      updateLocations(temp_locations);
    };

  const onChangeRole = (
    index: number,
    roleIndex: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    let temp_locations = [...locations];
    temp_locations[index].roles[roleIndex] = {
      ...temp_locations[index].roles[roleIndex],
      [name]: value,
    };

    updateLocations(temp_locations);
  };

  const onBlurLocation = (): void => {
    setLocationToLocalStorage();
  };

  const onRemoveLocation = (index: number) => (e: MouseEvent<HTMLElement>) => {
    removeLocation(index);
  };

  const toggleRole = (index: number) => (e: MouseEvent<HTMLElement>) => {
    if (expandIndex === index) {
      setExpandIndex(null);
    } else {
      setExpandIndex(index);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-8">
      <div className="relative flex flex-col place-items-center gap-4 w-full">
        <h2 className="mb-2 lg:text-4xl text-xl  font-semibold text-neutral">
          เกมสายลับ
        </h2>
        <div className="z-10 max-w-4xl items-center justify-between text-neutral lg:flex">
          <h6 className="text-center lg:text-md text-sm">
            Spyfall
            เป็นเกมที่ให้ผู้เล่นมีโอกาสแสดงฝีมือในการล่องหนในบทบาทของสปาย์ตัวจริงหรือสปาย์สมมติเพื่อค้นหาตัวตนของสปาย์ในกลุ่มคนอื่นๆ
            ที่อยู่ในสถานที่ที่กำหนดไว้
            ภารกิจของสปาย์คือต้องหาวิธีในการถามและตอบคำถามให้เหมาะสมเพื่อไม่ให้คนอื่นรู้ว่าตัวเองเป็นสปาย์
            ในแต่ละรอบของเกม Spyfall ผู้เล่นจะได้รับบทบาทแบบสุ่ม
            ซึ่งรวมถึงบทบาทของสปาย์และบทบาทของพนักงานทั่วไป
            การเล่นจะเริ่มต้นด้วยการให้สถานที่ที่กำหนดไว้สำหรับบทบาททุกคน เช่น
            โรงแรม ชุมชน หรือร้านอาหาร
            และผู้เล่นจะเริ่มที่มีหน้าที่ของการถามคำถามหรือตอบคำถามเพื่อหาข้อมูลในการระบุตัวตนของสปาย์
            ความสนุกของเกม Spyfall
            อยู่ที่การใช้ความคิดสร้างสรรค์ในการพูดคุยและการค้นหาเฉลย
            เพื่อทำให้ผู้เล่นคนอื่น ๆ
            ไม่สงสัยถึงตัวตนของเราว่าเราเป็นสปาย์หรือไม่ ในขณะเดียวกัน
            สปาย์จะต้องใช้เทคนิคการหลีกเลี่ยงการตอบคำถามที่ชัดเจนเกินไปหรือคำถามที่อาจเปิดเผยตัวตนของตัวเอง
            เกม Spyfall
            เป็นที่นิยมในงานสังสรรค์หรือส่งเสริมความสามัคคีระหว่างกลุ่มเพื่อน ๆ
            หรือครอบครัว
            เนื่องจากสามารถสร้างการสนทนาที่มีความสนุกสนานและน่าตื่นเต้นได้
          </h6>
        </div>
        <h2 className="mb-2 lg:text-4xl text-xl font-semibold text-neutral">
          วิธีการเล่น
        </h2>
        <ol className="z-10 max-w-4xl list-decimal items-center justify-between text-neutral lg:text-md text-sm">
          <li>สุ่มสถานที่และบทบาทให้กับผู้เล่น</li>
          <li>โดยทุกคนจะได้สถานที่เป็นสถานที่เดียวกัน</li>
          <li>แต่จะมีคนหนึ่งที่ได้บทบาทเป็น &ldquo;สายลับ&rdquo;</li>
          <li>&ldquo;สายลับ&rdquo; จะไม่รู้ว่าผู้เล่นอื่นได้สถานที่ใด</li>
          <li>จับเวลา 8 นาที ผลัดกันถามคำถามและตอบ</li>
          <li>
            คนที่ถูกถามจะได้เป็นคนตั้งคำถามกับผู้เล่นคนอื่น
            โดยห้ามถามซ้ำกลับคนเดิม
          </li>
          <li>
            ผู้เป็น &ldquo;สายลับ&rdquo; ต้องพยายามตอบตำถามให้ถูก
            โดยสังเกตจากผู้เล่นก่อนหน้า
          </li>
          <li>
            ผู้เล่นอื่นต้องพยายามอย่าถามคำถามเจาะจงเกินไป เพราะจะทำให้
            &ldquo;สายลับ&rdquo; รู้
          </li>
          <li>
            เมื่อครบ 8 นาทีให้ทุกคนคุยกันและโหวตกันว่าใครน่าจะเป็น
            &ldquo;สายลับ&rdquo;
          </li>
          <li>
            ถ้าโหวตผิด &ldquo;สายลับ&rdquo; จะเป็นฝ่ายชนะ ถ้าโหวตถูก
            &ldquo;สายลับ&rdquo; จะเป็นฝ่ายแพ้
          </li>
        </ol>
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
      </div>
    </main>
  );
};

export default SpyFallPage;
