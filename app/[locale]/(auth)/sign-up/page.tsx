import React from "react";
import Image from "next/image";
import SignUpForm from "../components/SignUpForm";
import learnGO from "@/public//assets/logo.svg";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { routes } from "@/routes";
import { absoluteUrl } from "@/lib";

export const metadata: Metadata = {
  title: routes.signUp.title,
  alternates: {
    canonical: routes.signUp.pathname,
  },
  openGraph: {
    title: routes.signUp.title,
    url: absoluteUrl(routes.signUp.pathname),
  },
};

async function SignUp() {
  const t = await getTranslations("AuthPages");
  return (
    <div className="h-screen flex items-center justify-center px-4 w-xl text-white">
      <div className="bg-content2-foreground p-8 rounded-xl sm:w-[32rem] w-full shadow-2xl transform transition-transform duration-500 ">
        <Image
          src={learnGO}
          alt="logo"
          className="mx-auto mb-4 transition-transform "
        />
        <p className="text-sm font-semibold text-primary my-6">
          {t("signUpEnterText")}
        </p>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUp;
