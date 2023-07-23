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
        <h2 className="mb-2 lg:text-4xl text-xl font-semibold text-neutral">{`สถานที่ทั้งหมด ${locations.length} แห่ง`}</h2>
        {locations.map((location, index) => {
          return (
            <div
              key={`location-${index}`}
              id="accordion-collapse"
              className="w-full lg:w-8/12"
            >
              <h2
                id="accordion-collapse-heading-1"
                className="text-2xl font-semibold text-neutral"
              >
                <div className="flex items-center  justify-between w-full p-5 font-medium text-left text-neutral border border-light-background rounded-t-xl rounded-bl-xl focus:ring-4  hover:bg-light-background  ">
                  <span className="relative flex h-3 w-3 mr-2">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral ${
                        location.enable ? "bg-secondary" : "bg-neutral"
                      } opacity-75`}
                    ></span>
                    <span
                      className={`relative inline-flex rounded-full h-3 w-3 ${
                        location.enable ? "bg-primary" : "bg-neutral"
                      }`}
                    ></span>
                  </span>
                  {index + 1}
                  <input
                    type="text"
                    id={`location-${index}`}
                    className="rounded-lg text-lg ml-4 bg-neutral border text-light-background block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                    placeholder={`ใส่ชื่อสภานที่ ${index + 1}`}
                    name="name"
                    value={location.name}
                    onChange={onChangeLocation(index)}
                    onBlur={onBlurLocation}
                  />
                  <button
                    className="outline outline-1 outline-primary rounded ml-2 py-2 px-2 text-neutral hover:bg-primary hover:text-white transition-colors transition duration-150 ease-in-out"
                    onClick={() => {
                      toggleEnablelationLocation(index);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                        clipRule="evenodd"
                        className={`${location.enable ? "visible" : "hidden"}`}
                      />
                    </svg>
                  </button>
                  <button
                    className="outline outline-1 outline-primary rounded ml-2 py-2 px-2 text-neutral hover:bg-primary hover:text-white transition-colors transition duration-150 ease-in-out"
                    onClick={toggleRole(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className="outline outline-1 outline-primary rounded ml-2 py-2 px-2 text-neutral hover:bg-primary hover:text-white transition-colors"
                    onClick={onRemoveLocation(index)}
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
              </h2>
              <div
                id={`accordion-collapse-body-${index}`}
                aria-labelledby="accordion-collapse-heading-1"
                className={`overflow-hidden duration-700 transition-[max-height] duration-500 ease-out-in ${
                  index === expandIndex ? "max-h-[1340px]" : "max-h-0"
                }`}
              >
                {location.roles.map((role, roleIndex) => (
                  <div
                    key={`role-${roleIndex}`}
                    className="p-5 border border-light-background hover:bg-light-background ml-8"
                  >
                    <input
                      type="text"
                      value={role.name}
                      className="rounded-t-lg text-xs bg-neutral border text-light-background block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                      placeholder={`ใส่บทบาทที่ ${roleIndex + 1} ของ ${
                        location.name
                      }`}
                      name="name"
                      onChange={(e) => {
                        onChangeRole(index, roleIndex, e);
                      }}
                    />
                    <textarea
                      value={role.description}
                      className="resize-none rounded-b-lg text-xs bg-neutral border text-light-background block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 "
                      placeholder={`ใส่รายละเอียดของบทบาทที่ ${roleIndex + 1}`}
                      name="description"
                      onChange={(e) => {
                        onChangeRole(index, roleIndex, e);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <button
          className="outline outline-1 outline-primary rounded py-2 px-4 text-neutral hover:bg-primary hover:text-white transition-colors disabled:opacity-25"
          onClick={addLocation}
        >
          เพิ่มสถานที่
        </button>
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
