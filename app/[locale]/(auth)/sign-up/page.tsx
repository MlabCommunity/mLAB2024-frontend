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
    <main className=" h-screen text-white flex items-center p-4">
      <div className="md:w-[34.38rem] w-full  place-self-center p-6 rounded-lg bg-content2-foreground mx-auto">
        <picture>
          <Image alt="learngo" className="mx-auto" src={learnGO} />
        </picture>
        <h2 className="p-5 text-sm font-semibold">{t("signUpEnterText")}</h2>
        <SignUpForm />
      </div>
    </main>
  );
}

export default SignUp;
