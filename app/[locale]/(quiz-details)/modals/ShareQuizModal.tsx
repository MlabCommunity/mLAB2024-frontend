"use client";
import React, { useState } from "react";
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

const ShareQuizModal = ({ shareLink }: { shareLink: string }) => {
  const { isOpen, closeModal, type } = useModalStore();
  const [activeTab, setActiveTab] = useState<Key>("link");
  const t = useTranslations("ShareQuizModal");

  const code = `<iframe
   src="${shareLink}" 
   width="100%" 
   height="680" 
   frameborder="0"
   style="border:1px solid #EAEAEA">
  </iframe>`;

  const handleTabChange = (key: Key) => {
    setActiveTab(key);
  };

  const handleCopy = async () => {
    try {
      if (activeTab === "link") {
        await navigator.clipboard.writeText(shareLink);
      } else if (activeTab === "code") {
        await navigator.clipboard.writeText(code);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const isModalOpen = isOpen && type === "shareQuizz";

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

  return (
    <AnimatePresence>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onOpenChange={closeModal}
          size="5xl"
          className="bg-content2"
          closeButton={
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
            </motion.button>
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
                  >
                    <Input
                      type="text"
                      value={shareLink}
                      readOnly
                      variant="flat"
                      className="p-2"
                    />
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" color="default" onClick={handleCopy}>
                  {t("copyToClipboard")}
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={closeModal}>{t("close")}</Button>
              </motion.div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ShareQuizModal;
