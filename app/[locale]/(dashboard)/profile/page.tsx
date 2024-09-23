"use client";

import { Button, Avatar } from "@nextui-org/react";
import React, { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useGetCurrentProfile } from "@/utils/hooks/useGetCurrentProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/utils/actions/user/updateProfile";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { UploadButton } from "@/utils/uploadThing";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const { data: currentProfile } = useGetCurrentProfile();
  const [formData, setFormData] = useState({
    displayName: currentProfile?.displayName ? currentProfile?.displayName : "",
    imageUrl: currentProfile?.imageUrl ? currentProfile?.imageUrl : "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);
  const t = useTranslations("Dashboard");

  useEffect(() => {
    if (currentProfile) {
      setFormData({
        displayName: currentProfile?.displayName || "",
        imageUrl: currentProfile?.imageUrl || "",
      });
    }
  }, [currentProfile]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(t("profileUpdated"));
      setIsFormChanged(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["currentProfile"] });
    },
  });

  const handleUpdateProfile = useCallback(() => {
    mutate({
      displayName: formData.displayName,
      imageUrl: formData.imageUrl,
    });
  }, [mutate, formData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setIsFormChanged(true);
    },
    []
  );

  const handleAvatarUpload = useCallback(
    (url: string) => {
      setFormData((prev) => ({ ...prev, imageUrl: url }));
      setIsFormChanged(true);
      toast.success(t("avatarUploaded"));
    },
    [t]
  );

  const isUpdateDisabled =
    !isFormChanged || !formData.displayName || !formData.imageUrl || isPending;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8 w-full md:max-w-7xl"
    >
      <h2 className="text-4xl font-bold mb-4 text-foreground-700">
        {t("profile")}
      </h2>
      <p className="text-foreground-600 mb-4 text-medium md:text-large">
        {t("manageSettings")}
      </p>
      <hr className="mb-4" />
      <div className="bg-[#F4F4F5] rounded-md p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <label className="text-gray-700" htmlFor="avatar">
            {t("avatar")}
          </label>
          <div className="flex items-center gap-4">
            <Avatar
              src={formData.imageUrl}
              alt="Profile"
              className="w-20 h-20"
            />
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  handleAvatarUpload(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                toast.error(`${t("uploadError")}: ${error.message}`);
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-gray-700" htmlFor="name">
            {t("name")}
          </label>
          <input
            id="name"
            name="displayName"
            type="text"
            value={formData.displayName}
            onChange={handleInputChange}
            className="p-3 rounded-lg shadow-sm"
          />
          <p className="text-foreground-500 text-sm">{t("displayName")}</p>
          <Button
            variant="solid"
            className="bg-base-primary text-white w-min py-5 disabled:bg-base-primary/50"
            onClick={handleUpdateProfile}
            disabled={isUpdateDisabled}
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
            variant="solid"
            color="danger"
            disabled={isPending}
          >
            {t("delete")}
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default ProfilePage;
