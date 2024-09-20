"use client";
import { Input } from "@nextui-org/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import AuthSchemas from "../schemas/authSchemas";
import { signUp } from "@/utils/actions/auth/sign-up";

function SignUpForm() {
  const { signUpSchema } = AuthSchemas();
  const t = useTranslations("AuthPages");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });
  type FormData = z.infer<typeof signUpSchema>;
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      toast.error("Registration failed");
      console.log(error.message);
    },
    onSuccess: () => {
      toast.success(t("signedUp"));
      router.push(routes.signIn.pathname);
    },
  });

  const onSubmit = async (data: FormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-6">
      <div className="flex flex-col gap-2">
        <label className="text-medium" htmlFor="email">
          E-mail
        </label>
        <Input
          {...register("email", { required: t("emailRequired") })}
          id="email"
          type="email"
          name="email"
          disabled={isPending}
          placeholder="E-mail"
          className="text-black"
        />
      </div>
      {errors?.email && (
        <p className="text-red-500 text-sm">{errors?.email.message}</p>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="password">{t("password")}</label>
        <Input
          {...register("password", { required: true })}
          type="password"
          id="password"
          name="password"
          disabled={isPending}
          placeholder={t("password")}
          autoComplete="off"
          className="text-black"
        />
      </div>
      {errors?.password && (
        <p className="text-red-500 text-sm">{errors?.password?.message}</p>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="repeatPassword">{t("repeatPassword")}</label>
        <Input
          {...register("repeatPassword", {
            required: t("pleaseRepeatPassword"),
          })}
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          disabled={isPending}
          placeholder={t("repeatPassword")}
          autoComplete="off"
          className="text-black"
        />
      </div>
      {errors?.repeatPassword && (
        <p className="text-red-500 text-sm">
          {errors?.repeatPassword?.message}
        </p>
      )}
      {error?.message && (
        <p className="text-white text-center px-1 py-3 rounded-lg bg-red-500 mt-5 text-sm">
          {error?.message}
        </p>
      )}

      <Button
        variant={isPending ? "bordered" : "solid"}
        color="primary"
        size="lg"
        radius="sm"
        type="submit"
        disabled={isPending}
        isLoading={isPending}
        className="mt-5 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-primary-600 active:bg-primary-700"
      >
        {isPending ? t("pending") : t("register")}
      </Button>
    </form>
  );
}

export default SignUpForm;
