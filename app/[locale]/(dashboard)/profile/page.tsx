"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { routes } from "@/routes";
import { useGetCurrentProfile } from "@/utils/hooks/useGetCurrentProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/utils/actions/user/updateProfile";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { data: currentProfile } = useGetCurrentProfile();
  const [nameValue, setNameValue] = useState<string>(
    currentProfile?.userName || ""
  );
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const router = useRouter();
  const t = useTranslations("Dashboard");

  useEffect(() => {
    if (currentProfile?.userName) {
      setNameValue(currentProfile.userName);
    }
  }, [currentProfile]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(t("profileUpdated"));
      setIsChanged(false);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentProfile"] });
    },
  });

  const handleUpdate = () => {
    mutate({
      userName: nameValue,
    });
  };

  const handleDelete = () => {
    if (window.confirm(t("areYouSure"))) {
      console.log("Delete account");
      router.push(routes.signIn);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
    setIsChanged(e.target.value !== currentProfile?.userName);
  };

  return (
    <section className="py-8 w-full md:max-w-7xl">
      <h1 className="text-4xl font-bold mb-4 text-foreground-700">
        {t("profile")}
      </h1>
      <p className="text-foreground-600 mb-4 text-medium md:text-large">
        {t("manageSettings")}
      </p>
      <hr className="mb-4" />
      <div className="bg-[#F4F4F5] rounded-md p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <label className="text-gray-700" htmlFor="name">
            {t("name")}
          </label>
          <input
            id="name"
            type="text"
            value={nameValue}
            onChange={handleChange}
            className="p-3 rounded-lg shadow-sm"
          />
          <p className="text-foreground-500 text-sm">{t("displayName")}</p>
          <Button
            variant="solid"
            className="bg-base-primary text-white w-min py-5 disabled:bg-base-primary/50"
            onClick={handleUpdate}
            disabled={isPending || !nameValue || !isChanged}
          >
            {t("updateButton")}
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-medium">{t("deleteAccount")}</h2>
          <p className="text-small text-foreground-500 -mt-1">
            {t("deleteAccountWarningProfile")}
          </p>
          <Button
            className="transition-all hover:bg-danger-500 text-white px-4 text-medium w-min py-5 disabled:bg-danger-200"
            onClick={handleDelete}
            variant="solid"
            color="danger"
            disabled={isPending}
          >
            {t("delete")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
