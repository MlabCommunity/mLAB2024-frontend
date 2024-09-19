import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

function CopyToClipboardButton({ shareLink }: { shareLink: string }) {
  const handleCopyClick = (link: string) => {
    navigator.clipboard.writeText(link);
  };
  const t = useTranslations("QuestionsOnAnswers");
  return (
    <Popover
      offset={10}
      placement="left"
      shouldFlip
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              opacity: {
                duration: 0.15,
              },
            },
          },
          exit: {
            x: "5%",
            opacity: 0,
            transition: {
              opacity: {
                duration: 0.3,
              },
            },
          },
        },
      }}
    >
      <PopoverTrigger>
        <Button
          variant="ghost"
          size="md"
          onClick={() => handleCopyClick(shareLink)}
        >
          {t("copyToClipboard")}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">{t("linkCopiedMsg")}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CopyToClipboardButton;
