import { absoluteUrl } from "@/lib";
import { routes } from "@/routes";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: routes.profile.title,
  alternates: {
    canonical: routes.profile.pathname,
  },
  openGraph: {
    title: routes.profile.title,
    url: absoluteUrl(routes.profile.pathname),
  },
};

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default ProfileLayout;
