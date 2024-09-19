"use client";

import Container from "@/components/shared/Container";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import Image from "next/image";

import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

const Header = () => {
  const t = useTranslations("Dashboard");
  const [user, setUser] = useState({
    email: "robbie@mlab.com",
    avatar: "https://via.placeholder.com/50",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", closeDropdown);
    return () => {
      document.removeEventListener("mouseup", closeDropdown);
    };
  }, []);

  return (
    <header className="flex justify-between items-center border-b border-gray-200 px-5 py-4 border-none">
      <div className="flex items-center">
        <ul className="flex space-x-6">{/* Link to profile */}</ul>
      </div>
      <Container>
        <div className="flex items-center justify-end">
          <div className="relative flex gap-2">
            <LanguageSwitcher />
            <Image
              src={user.avatar}
              alt={t("userAvatar")}
              className="rounded-full cursor-pointer w-10"
              onClick={(event) => {
                toggleDropdown(event);
              }}
            />
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 bg-white border rounded-lg py-2 z-50 shadow-md"
              >
                <span className="block px-4 py-2 text-foreground-700 text-large">
                  {user.email}
                </span>
                <hr className=" w-[85%] mx-auto" />
                <Link
                  href={routes.profile.pathname}
                  className="block w-full text-left px-4 py-2 hover:bg-white hover:text-gray-900 transition-colors text-foreground-600 text-medium"
                >
                  {t("profile")}
                </Link>
                <hr className=" w-[85%] mx-auto" />
                <button
                  className="block w-full text-left px-4 py-2 hover:text-gray-900 transition-colors text-foreground-600 text-medium"
                  onClick={handleLogout}
                >
                  {t("logOut")}
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
