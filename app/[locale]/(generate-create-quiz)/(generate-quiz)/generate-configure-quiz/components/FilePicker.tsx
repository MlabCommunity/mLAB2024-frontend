import { Button, Input } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef, useState } from "react";

function generateFileUrl(file: File, callback: (fileUrl: string) => void) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result as string);
  reader.readAsDataURL(file);
}

interface FilePickerProps {
  id: string;
  name: string;
  defaultValue?: string;
}

function FilePreview({
  fileName,
  fileUrl,
}: {
  fileName: string;
  fileUrl: string;
}) {
  return (
    <div className="file-preview mb-4 flex items-center flex-col">
      <p className="text-medium">{fileName}</p>
    </div>
  );
}

function FileCard({
  fileName,
  fileUrl,
  fileInput,
}: {
  fileName: string;
  fileUrl: string;
  fileInput: React.RefObject<HTMLInputElement>;
}) {
  const t = useTranslations("CreateQuiz");
  return (
    <div className="border border-slate-500 border-dashed h-[200px] flex flex-col items-center justify-center">
      <div className="text-foreground-600 md:text-2xl text-lg flex gap-2">
        {fileUrl ? (
          <FilePreview fileName={fileName} fileUrl={fileUrl} />
        ) : (
          <>
            <div className="flex flex-col gap-4 ">
              <span className="text-medium">{`${t("uploadFileData")} ${t(
                "uploadFile"
              )}`}</span>
              <span
                onClick={() => fileInput.current?.click()}
                className="w-full underline cursor-pointer"
              ></span>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Link
          href={fileUrl}
          rel="noopener noreferrer"
          download={!fileUrl ? false : true}
        >
          <Button
            hidden={!fileUrl}
            isDisabled={!fileUrl}
            variant="solid"
            color="danger"
          >
            {t("uploadFileDownload")}
          </Button>
        </Link>
        <Button onClick={() => fileInput.current?.click()} type="button">
          {t("uploadFile")}
        </Button>
      </div>
    </div>
  );
}

export default function FilePicker({
  id,
  name,
  defaultValue,
}: Readonly<FilePickerProps>) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(defaultValue ?? null);
  const t = useTranslations("CreateQuiz");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      generateFileUrl(file, setFileUrl);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Input
          type="file"
          id={id}
          name={name}
          onChange={handleFileChange}
          ref={fileInput}
          hidden // Hide the actual input
        />
      </div>
      <FileCard
        fileName={fileName ?? ""}
        fileUrl={fileUrl ?? ""}
        fileInput={fileInput}
      />
    </>
  );
}
