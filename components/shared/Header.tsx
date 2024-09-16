"use client";

import Container from "@/components/shared/Container";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { routes } from "@/routes";
import { logOutUser } from "@/utils/actions/auth/log-out";
import { useGetCurrentProfile } from "@/utils/hooks/useGetCurrentProfile";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Header = () => {
  const { data: currentProfile } = useGetCurrentProfile();
  const router = useRouter();
  const t = useTranslations("Header");

  const { mutate } = useMutation({
    mutationFn: logOutUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.push(routes.signIn.pathname);
      toast.success(t("loggedOut"));
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <header className="flex justify-between items-center border-b border-gray-200 px-5 py-4 border-none">
      <div className="flex items-center">
        <ul className="flex space-x-6">{/* Link to profile */}</ul>
      </div>
      <Container>
        <div className="flex items-center justify-end">
          <div className="relative flex gap-2">
            <LanguageSwitcher />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                className="px-2"
              >
                <DropdownItem
                  key="profile"
                  className="gap-2"
                  isReadOnly
                  showDivider
                >
                  <p className="text-lg text-foreground-700 hover:bg-none">
                    {currentProfile?.email}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  className="text-foreground-600"
                  href="/profile"
                  showDivider
                >
                  {t("profile")}
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  className="text-lg text-foreground-600"
                  onPress={handleLogout}
                >
                  {t("logOut")}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
