"use client";

import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useDebouncedCallback } from "use-debounce";

export default function Header() {
  const pathname = usePathname();
  const home = pathname === "/";
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
      <>
        {!home ? null : (
            <header className="sticky lg:pt-6 lg:pb-6 pt-4 pb-4 w-full flex border-b-2 items-center md:justify-center ">
              <nav className=" flex lg:text-[14px] xl:gap-14 lg:gap-18 md:gap-8 gap-4 lg:ml-10 ">
                <div className=" items-center flex justify-start lg:w-20 lg:h-20 md:w-14 md:h-14 w-14 h-14 ml-4">
                  <img src="/logo2.png" />
                  <Link href="/"></Link>
                </div>
                <div className="flex items-center lg:gap-10 gap-4 ml-10 md:ml-0">
                  <Menu>
                    <MenuButton>
                      <div className="hidden lg:flex border-2 rounded-md px-4 py-2 gap-24">
                        Cauta un titlu aici
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 ml-24"
                        >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>
                      </div>
                      <div className="lg:hidden flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 ml-24"
                        >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                          />
                        </svg>
                      </div>
                    </MenuButton>

                    <MenuItems
                        anchor="bottom"
                        className="sticky flex flex-col items-center justify-center rounded-md"
                    >
                      <MenuItem>
                        <div>
                          <input
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                              onChange={(e) => {
                                handleSearch(e.target.value);
                              }}
                              defaultValue={searchParams.get("query")?.toString()}
                              type="search"
                              className="relative m-0 block w-full min-w-0 flex-auto rounded border-2  bg-transparent  px-4 py-2 gap-24 outline-none transition duration-200 ease-in-out"
                              id="exampleSearch"
                              placeholder="Sugestii de cautare"
                          />
                        </div>
                      </MenuItem>
                    </MenuItems>
                  </Menu>

                  <div className="flex">
                    <Link href="/contulmeu" className="flex gap-2">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                      <div className="hidden lg:flex">Contul meu</div>
                    </Link>
                  </div>

                  <div className="flex">
                    <Link href="/favorite" className="flex font-semibold gap-2 ">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                      <div className="hidden lg:flex">Favorite</div>
                    </Link>
                  </div>

                  <div className="flex mr-4">
                    <Link href="/cosulmeu" className="flex font-semibold gap-2">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                      >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                      <div className="hidden lg:flex">Cosul meu</div>
                    </Link>
                  </div>

                  {/* Butoane Login/Register */}
                  <div className="flex ml-6">
                    <Link href="/login" className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-2">
                      Login
                    </Link>
                    <Link href="/signup" className="flex items-center px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
                      Register
                    </Link>
                  </div>
                </div>
              </nav>
            </header>
        )}
      </>
  );
}
