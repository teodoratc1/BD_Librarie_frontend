import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import ProductsPage from "../pages/produse"; // Importă corect pagina produselor

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center mx-auto bg-gradient-to-r from-[#4676e6] to-[#63b1c9] min-h-screen">
            <header className="text-center py-10">
                <h1 className="text-4xl font-bold text-white">Bine ați venit!</h1>
                <p className="mt-4 text-lg text-indigo-200">
                    Descoperiți cele mai bune produse din colecția noastră.
                </p>
            </header>

            <Menu>
                <MenuButton>
                    <div className="flex place-items-center border-indigo-900 border-2 bg-indigo-700 capitalize gap-2 lg:px-5 lg:py-5 px-2 py-2 text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6 items-center justify-start flex"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                        Categorii de produse
                    </div>
                </MenuButton>
                <MenuItems className="border-indigo-900 border-2 bg-indigo-700 text-white flex flex-col gap-3">
                    <MenuItem>
                        <Link
                            className="flex items-center gap-2 lg:px-5 lg:py-5 px-2 py-2 hover:bg-indigo-800"
                            href="/"
                        >
                            Accesorii
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <Link
                            className="flex items-center gap-2 lg:px-5 lg:py-5 px-2 py-2 hover:bg-indigo-800"
                            href="/"
                        >
                            BoardGames
                        </Link>
                    </MenuItem>
                </MenuItems>
            </Menu>

            <section className="mt-10 w-full px-5">
                <ProductsPage />
            </section>
        </div>
    );
}
