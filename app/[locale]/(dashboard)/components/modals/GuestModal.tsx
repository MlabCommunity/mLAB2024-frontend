"use client";

import AuthSchemas from "@/app/[locale]/(auth)/schemas/authSchemas";
import { routes } from "@/routes";
import { logOutUser } from "@/utils/actions/auth/log-out";
import { convertGuest } from "@/utils/actions/user/convertGuest";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Divider,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { z } from "zod";

export default function GuestModal() {
  const t = useTranslations("Guest");
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { signInSchema } = AuthSchemas();
  type FormData = z.infer<typeof signInSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutate: logOutMutate } = useMutation({
    mutationFn: logOutUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.push(routes.signIn.pathname);
    },
  });

  const {
    mutate: convertGuestMutation,
    error,
    isPending: isPendingConvertGuest,
  } = useMutation({
    mutationFn: convertGuest,
    onSuccess: () => {
      setIsOpen(false);
      location.reload();
    },
  });

  const onSubmit = (data: FormData) => {
    convertGuestMutation(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={true}
      placement="center"
      size="3xl"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p className="text-xl">{t("signUp")}</p>
              <p className="text-small font-normal">{t("tookPart")}</p>
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Email"
                placeholder={t("enterEmail")}
                variant="bordered"
                className="disabled:cursor-not-allowed"
                endContent={
                  <IoMdMail className="text-2xl text-default-400 pointer-events-none my-auto" />
                }
                {...register("email", { required: true })}
                isDisabled={isPendingConvertGuest}
              />
              {errors?.email && (
                <p className="text-red-500  text-sm">
                  {errors?.email?.message}
                </p>
              )}
              <Input
                label={t("password")}
                placeholder={t("enterPassword")}
                type="password"
                variant="bordered"
                isDisabled={isPendingConvertGuest}
                className="disabled:cursor-not-allowed"
                endContent={
                  <RiLockPasswordFill className="text-2xl text-default-400 pointer-events-none my-auto" />
                }
                {...register("password", { required: true })}
              />
              {errors?.password && (
                <p className="text-red-500  text-sm">
                  {errors?.password?.message}
                </p>
              )}
              <div className="flex py-2 px-1 justify-between">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                  className="disabled:cursor-not-allowed"
                  isDisabled={isPendingConvertGuest}
                  {...register("rememberMe")}
                >
                  {t("rememberMe")}
                </Checkbox>
              </div>
            </ModalBody>
            <ModalFooter className="flex flex-col gap-4">
              <Button
                color="primary"
                className="w-full disabled:bg-primary/50"
                type="submit"
                isDisabled={isPendingConvertGuest}
              >
                {t("signUp")}
              </Button>
              {error?.message && (
                <p className="text-white text-center px-1 py-3 rounded-lg bg-red-500  text-sm">
                  {error?.message}
                </p>
              )}
              <Divider />
              <Button
                isDisabled={isPendingConvertGuest}
                href={routes.signIn.pathname}
                className="mx-auto w-full bg-default-100"
                onClick={() => {
                  logOutMutate();
                }}
              >
                {t("toAuthPage")}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </form>
    </Modal>
  );
}
