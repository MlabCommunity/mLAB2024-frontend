import React, { useState, useEffect } from "react";
import Image from "next/image";
import closeIcon from "/public/assets/closeIcon.svg";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore2";

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
  const { type, isOpen, closeModal } = useModalStore((state) => ({
    type: state.type,
    isOpen: state.isOpen,
    closeModal: state.closeModal,
  }));

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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-[800px] min-h-[400px] relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 p-1 bg-transparent hover:bg-gray-200 rounded-full transition"
        >
          <Image src={closeIcon} alt="close icon" />
        </button>

        <div className="mb-4">
          <label className="block font-semibold mb-2">
            {t("questionTitle")} <span className="text-red-500">*</span>:
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">
            {t("questionDescription")} ({t("optional")}):
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">{t("answers")}:</label>
          {options?.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
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
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
};

export default EditQuestionModal;
