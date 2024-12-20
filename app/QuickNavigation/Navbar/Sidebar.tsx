"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function capitalizeFirstLetter(string: string | undefined) {
  return string && string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Sidebar({
  user,
}: {
  user: {
    name: string | null;
    email: string | null;
  };
}) {
  const {
    isMenuOpen: expanded,
    toggleMenu,
    buttonRef,
    portalRef,
  } = useSidebarMenu();
  const username = user?.email?.split("@")[0];

  return (
    <aside
      className="sticky top-0 hidden h-screen flex-col gap-10 bg-blue-100 p-5 shadow-sm lg:flex z-[50] "
      ref={portalRef}
    >
      <div
        className={`flex items-center ${
          expanded ? "justify-between" : "justify-center"
        }`}
      >
        <button
          onClick={() => toggleMenu()}
          ref={buttonRef}
          className="rounded-lg p-1.5 hover:text-indigo-800"
        >
          {expanded ? (
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>
      <nav className="flex h-full flex-col justify-between">
        <div className="flex h-full flex-col justify-between">
          <ul>
            <SidebarItem
              text="Acasa"
              isExpanded={expanded}
              href="/dashboard"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              }
            />

            <SidebarItem
              text="Capitala"
              isExpanded={expanded}
              href="/dashboard/capitala"
              icon={
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
                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
              }
            />
          </ul>
          <ul>
            <SidebarItem
              text="Profilul"
              isExpanded={expanded}
              href="/dashboard/profile"
              icon={
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
              }
            />
            {/* <SidebarItem
              text="Settings"
              isExpanded={expanded}
              href="/dashboard/profile/profileSettings"
              icon={
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
                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              }
            /> */}
          </ul>
        </div>

        <div className="mt-4 flex border-t-[1px] px-3 pt-5 font-semibold">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-white">
            {capitalizeFirstLetter(username?.at(0))}
          </div>
          <div
            className={`flex items-center justify-between overflow-hidden transition-all ${
              expanded ? "ml-3 w-52" : "w-0"
            } `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{username}</h4>
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
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
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </div>
        </div>
      </nav>
    </aside>
  );
}

function useSidebarMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const portalRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isMenuOpen &&
        !portalRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  return { isMenuOpen, toggleMenu, portalRef, buttonRef };
}
export function SidebarItem({
  icon,
  href,
  text,
  isExpanded,
}: {
  icon: React.ReactNode;
  href: string;
  text: string;
  isExpanded: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li className="pt-2">
      <Link
        href={href}
        className={`group relative flex cursor-pointer items-center justify-center rounded-md px-3 py-2 font-semibold transition-colors ${
          isActive
            ? "bg-neon-blue/10"
            : "hover:bg-indigo-100 hover:text-indigo-800"
        } `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            isExpanded ? "ml-3 w-52" : "w-0"
          }`}
        >
          {text}
        </span>

        {!isExpanded && (
          <div className="invisible absolute z-[999] left-full ml-6 -translate-x-3 rounded-md bg-indigo-100 px-2 py-1 text-sm text-indigo-800 opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100">
            {text}
          </div>
        )}
      </Link>
    </li>
  );
}
