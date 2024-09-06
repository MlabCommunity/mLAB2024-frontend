"use client";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { routes } from "@/routes";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "@/utils/actions/auth/sign-in";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AuthSchemas from "../schemas/authSchemas";

export default function LoginForm() {
  const router = useRouter();
  const { signInSchema } = AuthSchemas();
  const t = useTranslations("AuthPages");
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

  const { mutate, isPending, error } = useMutation({
    mutationFn: signInUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.push(routes.dashboard);
      toast.success(t("signedIn"));
    },
  });

  async function onSubmit(data: FormData) {
    mutate(data);
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <label htmlFor="email" className="text-medium text-foreground-100">
          E-mail
        </label>
        <Input
          variant="flat"
          {...register("email", { required: true })}
          id="email"
          name="email"
          type="text"
          radius="sm"
          placeholder="Email"
          autoComplete="off"
          className="text-foreground-500 mt-1 text-sm"
          disabled={isPending}
        />
        {errors?.email && (
          <p className="text-red-500 mt-2 text-sm">{errors?.email?.message}</p>
        )}
      </div>

      <div className="relative mt-6">
        <label htmlFor="password" className="text-medium text-foreground-100">
          {t("password")}
        </label>
        <Input
          variant="flat"
          {...register("password", { required: true })}
          id="password"
          type="password"
          name="password"
          className="text-foreground-500 mt-1 text-sm"
          placeholder={t("password")}
          autoComplete="off"
          disabled={isPending}
        />
        {errors?.password && (
          <p className="text-red-500 mt-2 text-sm">
            {errors?.password?.message}
          </p>
        )}
      </div>

      <div className="flex mt-6 items-center ml-2">
        <Checkbox
          color="default"
          radius="none"
          size="sm"
          isDisabled={isPending}
          {...register("rememberMe")}
        >
          <span className="text-primary text-sm">{t("rememberMe")}</span>
        </Checkbox>
      </div>

      {error?.message && (
        <p className="text-white text-center px-1 py-3 rounded-lg bg-red-500 mt-5 text-sm">
          {error?.message}
        </p>
      )}

      <Button
        variant="solid"
        color="primary"
        size="lg"
        radius="sm"
        type="submit"
        className="w-full mt-5 bg-primary text-primary-foreground cursor-pointer text-medium disabled:opacity-50"
        disabled={isPending}
      >
        {t("login")}
      </Button>
      <div className="flex justify-between mt-6 gap-2">
        <Button
          variant="ghost"
          size="lg"
          radius="sm"
          className="text-tiny sm:text-medium disabled:opacity-50"
          color="primary"
          disabled={isPending}
        >
          <Link href={routes.signUp}>{t("createAccount")}</Link>
        </Button>
        <Button
          variant="ghost"
          size="lg"
          radius="sm"
          color="primary"
          className="text-tiny sm:text-medium disabled:opacity-50"
          disabled={isPending}
        >
          {t("forgotPassword")}
        </Button>
      </div>
    </form>
  );
}
