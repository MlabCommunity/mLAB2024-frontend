"use client";
import { useModalStore } from "@/store/modalStore2";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { GeneratedQuestionT } from "../../types";

interface AddQuestionModalProps {
  setQuestions: Dispatch<SetStateAction<GeneratedQuestionT[]>>;
}

function AddQuestionModal({ setQuestions }: AddQuestionModalProps) {
  const { quizId } = useParams();
  const [modalValues, setModalValues] = useState({ title: "" });
  const t = useTranslations("AddQuestionModal");
  const { closeModal, isOpen, type } = useModalStore();
  const [answers, setAnswers] = useState([{ id: 1, value: "" }]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null);

  const samplePlaceholder =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

  if (!isOpen && type !== "addQuestion") return null;

  const handleAddQuestion = () => {
    setAnswers([...answers, { id: answers.length + 1, value: "" }]);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = answers.filter((_, i) => i !== index);
    setAnswers(updatedQuestions);

    if (selectedQuestionIndex === index) {
      setSelectedQuestionIndex(null);
    } else if (
      selectedQuestionIndex !== null &&
      selectedQuestionIndex > index
    ) {
      setSelectedQuestionIndex(selectedQuestionIndex - 1);
    }
  };

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newQuestions = [...answers];
    newQuestions[index].value = event.target.value;
    setAnswers(newQuestions);
  };

  const handleSelectQuestion = (index: number) => {
    setSelectedQuestionIndex(index);
  };

  const allQuestionsFilled = answers.every(
    (question) => question.value.trim().length > 0
  );

  const isReadyToSubmit =
    answers.length >= 2 &&
    modalValues.title.length > 0 &&
    allQuestionsFilled &&
    selectedQuestionIndex !== null;

  const handleSubmit = () => {
    const newQuestion = {
      quizId,
      title: modalValues.title,
      generateAnswers: answers.map((answer, index) => {
        return {
          content: answer.value,
          isCorrect: index === selectedQuestionIndex,
        };
      }),
    };

    setQuestions((prev: GeneratedQuestionT[]) => [...prev, newQuestion]);
    closeModal();
  };

  return (
    <Modal
      className="p-6 gap-6 flex"
      isOpen={isOpen}
      onOpenChange={closeModal}
      size="4xl"
    >
      <ModalContent>
        <Tabs
          size="md"
          variant="solid"
          radius="md"
          aria-label="Options"
          className="w-full h-full"
        >
          <Tab className="flex flex-col gap-4" key="photos" title={t("manual")}>
            <div className="flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-2">
                <h3>{t("questionTitle")}</h3>
                <Input
                  placeholder={samplePlaceholder}
                  value={modalValues.title}
                  onChange={(event) =>
                    setModalValues({
                      ...modalValues,
                      title: event.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <h3>{t("answers")}</h3>
                <div className="flex flex-col gap-2">
                  {answers.map((question, index) => (
                    <div className="flex items-center gap-2" key={index}>
                      <Checkbox
                        isSelected={selectedQuestionIndex === index}
                        onChange={() => handleSelectQuestion(index)}
                      />
                      <Input
                        placeholder={samplePlaceholder}
                        value={question.value}
                        onChange={(event) => handleInputChange(index, event)}
                      />
                      <Button onClick={() => handleRemoveQuestion(index)}>
                        {t("remove")}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <Button color="primary" onClick={handleAddQuestion}>
                {t("addQuestion")}
              </Button>
            </div>
          </Tab>
          <Tab className="w-full h-full " key="AIGeneration" title={t("ai")}>
            <div className="flex flex-col justify-center w-full p-6 gap-6 h-full">
              <h3>Prompt</h3>
              <Input variant="flat" color="default" radius="sm" size="md" />
            </div>
          </Tab>
        </Tabs>
        <ModalFooter>
          <Button variant="flat" color="primary" onClick={closeModal}>
            {t("cancel")}
          </Button>
          <Button
            color="primary"
            variant="solid"
            isDisabled={!isReadyToSubmit}
            onClick={handleSubmit}
          >
            {t("save")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddQuestionModal;