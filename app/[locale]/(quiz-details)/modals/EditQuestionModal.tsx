import React, { useState, useEffect } from "react";
import Image from "next/image";
import closeIcon from "/public/assets/closeIcon.svg";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore2";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface QuestionData {
  question: string;
  description: string;
  options: string[];
  selected: string;
}

interface EditQuestionModalProps {
  questionData: QuestionData;
  onSave: (updatedQuestion: QuestionData) => void;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  questionData,
  onSave,
}) => {
  const t = useTranslations("QuestionsOnAnswers");
  const { closeModal, isOpen, type } = useModalStore();

  const [question, setQuestion] = useState(questionData.question);
  const [description, setDescription] = useState(questionData.description);
  const [options, setOptions] = useState(questionData.options);
  const [selectedOption, setSelectedOption] = useState(questionData.selected);

  useEffect(() => {
    setQuestion(questionData.question);
    setDescription(questionData.description);
    setOptions(questionData.options);
    setSelectedOption(questionData.selected);
  }, [questionData]);

  const handleSave = () => {
    const updatedQuestion: QuestionData = {
      question,
      description,
      options,
      selected: selectedOption,
    };
    onSave(updatedQuestion);
    closeModal();
  };

  if (!(isOpen && type === "editQuestion")) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={closeModal}
      size="4xl"
      closeButton={
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#292D32",
            color: "white",
            width: 22,
            height: 22,
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
    >
      <ModalContent className="bg-content2">
        <ModalHeader className="flex flex-col gap-3">
          <div>
            <label className="block font-semibold" htmlFor="question">
              {t("questionTitle")} <span className="text-red-500">*</span>:
            </label>
            <Input
              variant="bordered"
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full py-2 rounded-lg"
            />
          </div>
          <div>
            <label
              className="text-lg text-foreground-700 font-semibold"
              htmlFor="desc"
            >
              {t("questionDescription")} ({t("optional")}):
            </label>
            <Input
              variant="bordered"
              id="desc"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg py-2"
            />
          </div>
        </ModalHeader>
        <ModalBody className="-mt-3">
          <label className="text-lg text-foreground-700 font-semibold">
            {t("answers")}:
          </label>
          <ul className="bg-white py-1 px-4 rounded-lg border-dashed border-2">
            {options?.map((option, index) => (
              <li key={index} className="flex items-center space-x-2 mb-2">
                <div
                  className={`custom-radio ${
                    selectedOption === option ? "custom-radio-checked" : ""
                  }`}
                  onClick={() => setSelectedOption(option)}
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="w-full px-3 py-2 rounded-lg outline-black"
                />
              </li>
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-2">
            <button
              onClick={closeModal}
              className="bg-primary-200 text-primary-600 py-2 px-4 rounded-md "
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              {t("save")}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditQuestionModal;
