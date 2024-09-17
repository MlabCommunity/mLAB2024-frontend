import Image from "next/image";
import React from "react";
import pdfIcon from "@/public/assets/pdfIcon.svg";
import xlsIcon from "@/public/assets/excelIcon.svg";
import wordIcon from "@/public/assets/wordIcon.svg";
import txtIcon from "@/public/assets/txtIcon.svg";
import { Button, Divider } from "@nextui-org/react";
import pptIcon from "@/public/assets/pptIcon.svg";
import trashIcon from "@/public/assets/trash.svg";
import downloadIcon from "@/public/assets/download.svg";
import Link from "next/link";
type FileItemProps = {
  fileName: string;
  fileSize: number;
  onDelete: (fileName: string) => void;
};

const FileItem = ({ fileName, fileSize, onDelete }: FileItemProps) => {
  const fileFormat = fileName.split(".");
  const fileType = fileFormat[fileFormat.length - 1];
  const file = fileFormat[0];
  const fileSizeInMB = fileSize / 1024 / 1024;
  const renderCorrespondingIcon = () => {
    switch (fileType) {
      case "pdf":
        return <Image width={32} height={32} src={pdfIcon} alt="PDF icon" />;
      case "txt":
        return <Image width={32} height={32} src={txtIcon} alt="TXT icon" />;
      case "xlsx":
        return <Image width={32} height={32} src={xlsIcon} alt="XLSX icon" />;
      case "pptx":
        return <Image width={32} height={32} src={pptIcon} alt="PPTX icon" />;
      default:
        return <Image width={32} height={32} src={wordIcon} alt="Word icon" />;
    }
  };

  return (
    <div className=" flex items-center justify-between p-6 rounded-lg gap-4 text-foreground-700 shadow-md shadow-default-200 relative ">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">{renderCorrespondingIcon()}</div>
        <div className="flex flex-col ">
          <span className="md:text-lg md:w-3/4 w-1/2 text-sm break-words border">
            {file}
          </span>

          <div className="flex gap-3 text-sm text-foreground-400 ">
            <span>.{fileType}</span>
            <Divider orientation="vertical" />
            <span>{`${
              fileSizeInMB < 0.1 ? "<0.5 MB" : `${fileSizeInMB.toFixed(2)} MB`
            }`}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Rounded delete button with trash icon */}
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          onClick={() => onDelete(fileName)}
        >
          <Image width={24} height={24} src={trashIcon} alt="trash" />
        </Button>

        {/* Rounded download button */}
        <Link href={"#"} target="_blank" download={fileName}>
          <Button isIconOnly size="sm" variant="flat">
            <Image width={24} height={24} src={downloadIcon} alt="download" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FileItem;
