"use client";
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
      router.push(routes.dashboard.pathname);
      toast.success(t("signedIn"));
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white">
          E-mail
        </label>
        <Input
          variant="flat"
          {...register("email")}
          id="email"
          type="email"
          radius="sm"
          placeholder="Email"
          className="mt-1 text-sm text-foreground-500"
          disabled={isPending}
        />
        {errors?.email && (
          <p className="text-red-500 mt-2 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          {t("password")}
        </label>
        <Input
          variant="flat"
          {...register("password")}
          id="password"
          type="password"
          className="mt-1 text-sm text-foreground-500"
          placeholder={t("password")}
          autoComplete="current-password"
          disabled={isPending}
        />
        {errors?.password && (
          <p className="text-red-500 mt-2 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <Checkbox
          color="default"
          radius="sm"
          size="sm"
          isDisabled={isPending}
          {...register("rememberMe")}
        >
          <span className="text-sm text-primary">{t("rememberMe")}</span>
        </Checkbox>
      </div>

      {error?.message && (
        <p className="text-white text-center px-1 py-3 rounded-lg bg-red-500 mt-5 text-sm">
          {error.message}
        </p>
      )}

      <Button
        color="primary"
        size="lg"
        radius="sm"
        type="submit"
        isDisabled={isPending}
        isLoading={isPending}
        className="w-full"
      >
        {isPending ? t("pending") : t("login")}
      </Button>

      <div className="flex justify-between gap-2">
        <Button
          as={Link}
          href={routes.signUp.pathname}
          variant="ghost"
          size="lg"
          radius="sm"
          color="primary"
          className="text-sm sm:text-base flex-1"
          isDisabled={isPending}
        >
          {t("createAccount")}
        </Button>
        <Button
          variant="ghost"
          size="lg"
          radius="sm"
          color="primary"
          className="text-sm sm:text-base flex-1"
          isDisabled={isPending}
        >
          {t("forgotPassword")}
        </Button>
      </div>
    </form>
  );
}
