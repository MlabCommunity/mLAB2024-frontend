import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/store/modalStore";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateQuizQuestions } from "@/utils/actions/quiz/updateQuizQuestions";
import { AnswerT, GeneratedQuestionsT } from "../types";

type QuestionEditT = {
  questionTitle: string;
  questionId: string;
  options: AnswerT[];
};

const EditQuestionModal = ({
  questionData,
}: {
  questionData: QuestionEditT;
}) => {
  const queryClient = useQueryClient();
  const t = useTranslations("quizDetails");
  const { closeModal, isOpen, type } = useModalStore();

  const [question, setQuestion] = useState(questionData.questionTitle);
  const [options, setOptions] = useState(questionData.options);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    setQuestion(questionData.questionTitle);
    setOptions(questionData.options);
  }, [questionData]);

  useEffect(() => {
    const hasTitleChanged = question !== questionData.questionTitle;
    const haveOptionsChanged =
      JSON.stringify(options) !== JSON.stringify(questionData.options);

    setIsFormChanged(hasTitleChanged || haveOptionsChanged);
  }, [question, options, questionData]);

  const { mutate } = useMutation({
    mutationFn: updateQuizQuestions,
    onSuccess: () => {
      toast.success(t("changedQuestionSuccessfully"));
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSettled: (_data, _error, variables) => {
      queryClient.setQueryData(
        ["singleQuiz"],
        (oldData: GeneratedQuestionsT) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            questions: oldData.questions.map((question) =>
              question.id === variables.id
                ? {
                    ...question,
                    title: variables.title,
                    answers: variables.updateAnswers,
                  }
                : question
            ),
          };
        }
      );
    },
  });

  const handleSave = () => {
    const updatedQuestion = {
      title: question,
      id: questionData.questionId,
      updateAnswers: options,
    };
    mutate(updatedQuestion);
    closeModal();
  };

  const handleOptionSelect = (index: number) => {
    const newOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setOptions(newOptions);
  };

  const handleOptionChange = (index: number, newContent: string) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = {
        ...newOptions[index],
        content: newContent,
      };
      return newOptions;
    });
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
      <ModalContent className="bg-Content-content2-light dark:bg-Content-content2-dark">
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
        </ModalHeader>
        <ModalBody className="-mt-3">
          <label className="text-lg text-foreground-700 font-semibold">
            {t("answers")}:
          </label>
          <ul className="bg-Content-content2-light dark:bg-Content-content2-dark py-1 px-4 rounded-lg border-dashed border-2">
            {options?.map((option, index) => (
              <li key={index} className="flex items-center space-x-2 mb-2">
                <div
                  className={`custom-radio ${
                    option.isCorrect ? "custom-radio-checked" : ""
                  }`}
                  onClick={() => handleOptionSelect(index)}
                />
                <input
                  type="text"
                  value={option.content}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg outline-black"
                />
              </li>
            ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-end space-x-2">
            <Button
              onClick={closeModal}
              className="bg-primary-200 text-primary-600 py-2 px-4"
              radius="md"
            >
              {t("cancel")}
            </Button>
            <Button
              color="primary"
              onClick={handleSave}
              className="disabled:bg-primary/50"
              radius="md"
              isDisabled={!isFormChanged}
            >
              {t("save")}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditQuestionModal;
