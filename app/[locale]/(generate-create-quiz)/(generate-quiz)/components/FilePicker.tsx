"use client";
import { useGenerateQuizStore } from "@/store/generateQuizStore";
import { Button } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { z } from "zod";
import document from "@/public/assets/docxIcon.svg";
import FileItem from "./FileItem";
interface FilePickerProps {
  id: string;
  name: string;
  onClose: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function FilePicker({ id, name, onClose }: FilePickerProps) {
  const t = useTranslations("CreateQuiz");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const isValidExtension = (file: File) => {
    const fileTypes = ["docx", "pdf", "txt", "xlsx", "pptx"];
    if (file?.name) {
      const fileType = file?.name.split(".").pop()?.toLowerCase();
      return fileType && fileTypes.includes(fileType);
    }
    return false;
  };

  const uploadSchema = z.object({
    file: z
      .any()
      .refine((file: File) => file.size > 0, t("pleaseSelectAFile"))
      .refine(
        (file: File) => file.size <= MAX_FILE_SIZE,
        t("uploadFileExceededMaximumSize")
      )
      .refine(
        (file: File) => isValidExtension(file),
        t("uploadFileInvalidFormat")
      ),
  });

  const { setGenerateQuizData, generateQuizData } = useGenerateQuizStore();
  const [errorMessage, setErrorMessage] = useState("");

  const attachments: File[] = generateQuizData.Attachments || [];

  const handleDeleteAttachment = (fileName: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
    setGenerateQuizData({
      ...generateQuizData,
      Attachments: attachments.filter((att) => att.name !== fileName),
    });
  };

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDrop: (acceptedFiles) => validateFiles(acceptedFiles),
      maxSize: MAX_FILE_SIZE,
    });

  const validateFiles = (acceptedFiles: File[]) => {
    let errorFound = false;
    const newAttachments: File[] = [];
    let messages: string[] = [];

    acceptedFiles.forEach((file) => {
      const result = uploadSchema.safeParse({ file });
      if (!result.success) {
        errorFound = true;
        messages.push(result.error.errors[0]?.message);
        toast.error(result.error.errors[0]?.message);
      } else {
        newAttachments.push(file);
      }
    });

    if (errorFound) {
      setErrorMessage(messages.join(" "));
    } else {
      setErrorMessage("");
      toast.success(t("uploadFileSuccess"));
      setGenerateQuizData({
        Attachments: [...attachments, ...newAttachments], // Append to existing attachments
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errorMessage) {
      onClose();
      console.log("Form submitted with data:", generateQuizData.Attachments);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        {...getRootProps()}
        className={`border-dashed border-4 p-4 flex flex-col justify-center rounded-lg h-[50vh] ${
          isDragActive ? "bg-gray-100 border-blue-400" : "bg-white"
        } cursor-pointer`}
      >
        <input {...getInputProps()} ref={fileInputRef} />
        <label htmlFor={id}>
          {attachments.length > 0 ? (
            <div className=" p-4 gap-3">
              <ul className="flex flex-col gap-3">
                {attachments.map((file, index) => (
                  <FileItem
                    key={index}
                    fileName={file.name}
                    fileSize={file.size}
                    onDelete={handleDeleteAttachment}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Image className="h-72" src={document} alt="document" />
              <p className="text-center text-foreground-600 font-semibold md:text-2xl text-lg">
                {isDragActive ? t("uploadFileDragActive") : t("uploadFileData")}
              </p>
            </div>
          )}
        </label>
      </div>
      <div className="flex gap-2 justify-end p-6">
        <Button variant="flat" color="primary" onPress={onClose}>
          {t("cancelButton")}
        </Button>
        <Button type="submit" color="primary">
          {t("nextButton")}
        </Button>
      </div>
    </form>
  );
}
