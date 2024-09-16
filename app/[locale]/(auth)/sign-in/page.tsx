import SignInForm from "../components/SignInForm";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import logo from "@/public/assets/logo.svg";
import { Metadata } from "next";
import { routes } from "@/routes";
import { absoluteUrl } from "@/lib";

export const metadata: Metadata = {
  title: routes.signIn.title,
  alternates: {
    canonical: routes.signIn.pathname,
  },
  openGraph: {
    title: routes.signIn.title,
    url: absoluteUrl(routes.signIn.pathname),
  },
};


const SignInPage = async () => {
  const t = await getTranslations("AuthPages");
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="bg-content2-foreground p-8 rounded-xl sm:w-[32rem] w-full shadow-2xl">
        <Image src={logo} alt="logo" className="mx-auto" />
        <p className="text-sm font-semibold text-primary mt-4">
          {t("signInEnterText")}
        </p>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
