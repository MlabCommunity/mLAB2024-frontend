"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useGetCurrentProfile } from "@/utils/hooks/useGetCurrentProfile";
import { motion } from "framer-motion";
import Statistics from "../../(quiz-details)/NavbarContent/Statistics";
const StatisticsPage = () => {
  const t = useTranslations("Dashboard");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8 w-full md:max-w-7xl"
    >
      <h2 className="text-4xl font-bold mb-4 text-foreground-700">
        {t("statistics")}
      </h2>
      <p className="text-foreground-600 mb-4 text-medium md:text-large"></p>
      <div>
        <Statistics />
      </div>
      <hr className="mb-4" />
    </motion.section>
  );
};

export default StatisticsPage;
