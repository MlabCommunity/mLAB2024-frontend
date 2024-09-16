import { absoluteUrl } from "@/lib";
import { routes } from "@/routes";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: routes.dashboard.title,
  alternates: {
    canonical: routes.dashboard.pathname,
  },
  openGraph: {
    title: routes.dashboard.title,
    url: absoluteUrl(routes.dashboard.pathname),
  },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default DashboardLayout;
