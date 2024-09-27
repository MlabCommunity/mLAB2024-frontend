"use client";
import React, { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { CodeBlock, solarizedDark } from "react-code-blocks";
import { Key } from "@react-types/shared";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useModalStore } from "@/store/modalStore";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { QRCodeSVG } from "qrcode.react";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

const ShareQuizModal = ({ shareLink }: { shareLink: string }) => {
  const { isOpen, closeModal, type } = useModalStore();
  const [activeTab, setActiveTab] = useState<Key>("link");
  const t = useTranslations("ShareQuizModal");

  const sharedCode = shareLink?.split("/").pop();
  const sharedLink = `${window.location.origin}/${sharedCode}`;

  const code = `<iframe
   src="${shareLink}" 
   width="100%" 
   height="680" 
   frameborder="0"
   style="border:1px solid #EAEAEA">
  </iframe>`;

  const handleTabChange = useCallback((key: Key) => {
    setActiveTab(key);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      const textToCopy = activeTab === "link" ? sharedLink : code;
      await navigator.clipboard.writeText(textToCopy);
      toast.success(t("copiedToClipboard"));
    } catch (err) {
      toast.error(t("failedToCopy"));
      console.error("Failed to copy: ", err);
    }
  }, [activeTab, sharedLink, code, t]);

  const isModalOpen = isOpen && type === "shareQuizz";

  return (
    <AnimatePresence>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onOpenChange={closeModal}
          size="5xl"
          className="bg-content2"
          closeButton={
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#292D32",
                color: "white",
                width: 24,
                height: 24,
                fontSize: 11,
                fontWeight: "bold",
                borderRadius: "100%",
                top: 10,
                right: 10,
              }}
            >
              X
            </button>
          }
          motionProps={{
            variants: modalVariants,
            initial: "hidden",
            animate: "visible",
            exit: "exit",
          }}
        >
          <ModalContent>
            <ModalBody>
              <Tabs selectedKey={activeTab} onSelectionChange={handleTabChange}>
                <Tab key="link" title={t("shareAsLinkTitle")}>
                  <motion.div
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center gap-4"
                  >
                    <Input
                      type="text"
                      value={sharedLink}
                      readOnly
                      variant="flat"
                      className="w-full bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg"
                    />
                    <p className="text-center text-gray-600 mt-4 mb-2">
                      {t("scanQRCodeToShare")}
                    </p>
                    <QRCodeSVG value={shareLink} size={200} />
                  </motion.div>
                </Tab>
                <Tab key="code" title={t("shareAsCodeTitle")}>
                  <motion.div
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col gap-4"
                  >
                    <div className="rounded-lg">
                      <CodeBlock
                        text={code}
                        theme={solarizedDark}
                        showLineNumbers={false}
                        wrapLongLines
                      />
                    </div>
                  </motion.div>
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" color="default" onClick={handleCopy}>
                  {t("copyToClipboard")}
                </Button>
              </motion.div>
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button color="primary" onClick={closeModal}>
                  {t("closeButton")}
                </Button>
              </motion.div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ShareQuizModal;
