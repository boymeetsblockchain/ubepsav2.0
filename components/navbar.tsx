"use client";
import { AlignJustify, Home, Info, Briefcase, Mail, User2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { name: "Home", icon: Home, link: "/" },
  { name: "About", icon: Info, link: "/about" },
  { name: "Blogs", icon: Briefcase, link: "/blog" },
  { name: "Contact", icon: Mail, link: "/contact" },
];
export const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <nav className="sticky top-0 z-50">
      <div className="bg-white h-16 shadow-md px-6 md:px-12 lg:px-16 relative">
        <div className="flex items-center justify-between h-full">
          <h1 className="font-bold text-2xl md:text-3xl text-gray-800 dark:text-white">
            Logo
          </h1>
          <ul className="hidden md:flex space-x-6 md:space-x-8 lg:space-x-10 text-gray-600">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer hover:bg-ubepsa hover:text-white  font-semibold px-3 py-1.5 rounded-md transition-colors"
              >
                <Link href={item.link}>{item.name}</Link>
              </li>
            ))}

            {session ? (
              <>
                <Button className="bg-ubepsa" asChild>
                  <Link href={"/profile"}>Profile</Link>
                </Button>
              </>
            ) : (
              <>
                <li className="cursor-pointer hover:bg-ubepsa hover:text-white  font-semibold px-3 py-1.5 rounded-md transition-colors">
                  <Link href="/login">Login</Link>
                </li>
                <li className="cursor-pointer hover:bg-ubepsa hover:text-white  font-semibold px-3 py-1.5 rounded-md transition-colors">
                  <Link href="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>

          <div>
            <Avatar>
              {session?.user.image ? (
                <AvatarImage src={session?.user.image} />
              ) : (
                <AvatarImage src="https://github.com/shadcn.png" />
              )}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-center md:hidden space-x-4">
            <AlignJustify
              size={24}
              className="md:hidden text-black  cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
        </div>
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            ref={menuRef}
            className={`absolute right-0 top-0 h-screen w-60 bg-white dark:bg-[#0C4860] shadow-lg z-50 transition-transform transform duration-300 login-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="py-6 px-4">
                <h1 className="font-bold text-2xl text-center text-gray-800 dark:text-white">
                  Logo
                </h1>
              </div>

              {/* Mobile Menu Items */}
              <ul className="flex-1 flex flex-col space-y-4 text-gray-600 dark:text-gray-300 px-4">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-3 cursor-pointer border-b-2 hover:bg-ubepsa hover:text-white dark:hover:text-white font-semibold px-3 py-2 rounded-md transition-colors"
                  >
                    <item.icon size={20} />
                    <span>
                      <Link href={item.link}>{item.name}</Link>
                    </span>
                  </li>
                ))}

                {/* Login/Signup for mobile menu */}

                {session ? (
                  <>
                    <Button className="bg-ubepsa" asChild>
                      <Link href={"/profile"}>Profile</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <li className="cursor-pointer hover:bg-ubepsa hover:text-white dark:hover:text-white font-semibold px-3 py-2 rounded-md transition-colors">
                      <Link href="/login">Login</Link>
                    </li>
                    <li className="cursor-pointer hover:bg-ubepsa hover:text-white dark:hover:text-white font-semibold px-3 py-2 rounded-md transition-colors">
                      <Link href="/register">Sign Up</Link>
                    </li>
                  </>
                )}
              </ul>
              {session && (
                <div className="m-5 p-4 rounded-lg shadow-md bg-gray-100 dark:bg-[#0b3d50] hover:shadow-lg transition-shadow duration-300">
                  <div className="leading-4 flex flex-col space-y-2">
                    <div className="flex items-center space-x-3">
                      <User2 className="text-gray-700 dark:text-gray-300 w-6 h-6" />
                      <h4 className="font-semibold text-gray-800 dark:text-white text-lg">
                        {session.user.name}
                      </h4>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {session.user.email}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
