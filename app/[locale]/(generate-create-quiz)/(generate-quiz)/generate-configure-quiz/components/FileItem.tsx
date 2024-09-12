import Image from "next/image";
import React from "react";
import pdfIcon from "@/public/assets/pdfIcon.svg";
import xlsIcon from "@/public/assets/excelIcon.svg";
import wordIcon from "@/public/assets/wordIcon.svg";
import txtIcon from "@/public/assets/txtIcon.svg";
import { Button, Divider } from "@nextui-org/react";
import pptIcon from "@/public/assets/pptIcon.svg";

type FileItemProps = {
  fileName: string;
  fileSize: number;
  onDelete: (fileName: string) => void;
};

const FileItem = ({ fileName, fileSize, onDelete }: FileItemProps) => {
  const fileFormat = fileName.split(".");
  const fileType = fileFormat[fileFormat.length - 1];
  const file = fileFormat[0];
  const fileSizeInMB = (fileSize / 1024).toFixed(2);
  const renderCorrespondingIcon = () => {
    switch (fileType) {
      case "pdf":
        return <Image width={32} height={32} src={pdfIcon} alt="PDF icon" />;
      case "txt":
        return <Image width={32} height={32} src={txtIcon} alt="TXT icon" />;
      case "xls":
        return <Image width={32} height={32} src={xlsIcon} alt="XLS icon" />;
      case "ppt":
        <Image width={32} height={32} src={pptIcon} alt="PPT icon" />;
      default:
        return <Image width={32} height={32} src={wordIcon} alt="Word icon" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-6 rounded-lg gap-4 text-foreground-700 shadow-sm shadow-default-200">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">{renderCorrespondingIcon()}</div>
        <div className="flex flex-col">
          <span className="md:text-lg text-sm">{file}</span>
          <div className="flex gap-3 ">
            <span className="text-sm">.{fileType}</span>
            <span className="text-sm text-gray-400">{fileSizeInMB} KB</span>
          </div>
        </div>
      </div>
      <Button
        size="sm"
        onClick={() => onDelete(fileName)}
        variant="flat"
        color="danger"
      >
        Delete
      </Button>
    </div>
  );
};

export default FileItem;
