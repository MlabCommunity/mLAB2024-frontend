import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import polandFlag from "@/public/assets/poland-flag.svg";
import ukFlag from "@/public/assets/uk-flag.svg";
import Image from "next/image";

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set(locale === "pl" ? ["polish"] : ["english"])
  );
  const getDisplayName = (key: string) => {
    switch (key) {
      case "polish":
        return t("polish");
      case "english":
        return t("english");
      default:
        return t("selectLanguage");
    }
  };

  const updateLocale = (key: string) => {
    const newLocale = key === "polish" ? "pl" : "en";
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  useEffect(() => {
    const selectedKey = Array.from(selectedKeys)[0];
    updateLocale(selectedKey);
  }, [selectedKeys]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="flex items-center gap-2 capitalize"
        >
          <Image
            src={Array.from(selectedKeys)[0] === "polish" ? polandFlag : ukFlag}
            alt="flag"
            className="w-7 h-7"
          />
          {getDisplayName(Array.from(selectedKeys)[0])}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        // @ts-expect-error
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="english">
          <div className="flex items-center gap-2">
            <Image src={ukFlag} alt="uk flag" className="w-9 h-9" />
            <p>{t("english")}</p>
          </div>
        </DropdownItem>
        <DropdownItem key="polish">
          <div className="flex items-center gap-2">
            <Image src={polandFlag} alt="uk flag" className="w-9 h-9" />
            <p>{t("polish")}</p>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
