import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch, Button, Tooltip } from "@nextui-org/react";
import { SunIcon, MoonIcon } from "lucide-react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-4">
      <Tooltip content="Switch theme">
        <Switch
          defaultSelected={theme === "dark"}
          size="lg"
          color="primary"
          isSelected={isSelected}
          startContent={<SunIcon />}
          endContent={<MoonIcon />}
          onValueChange={() => {
            setIsSelected(!isSelected);
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        />
      </Tooltip>
    </div>
  );
}
