import { deleteQuiz } from "@/constants/api";
import axiosInstance from "@/utils/axiosInstance";

export const deleteQuizz = async (id: string) => {
  const response = await axiosInstance.delete(
    `https://mlab2024-backend.yellowocean-31330507.westeurope.azurecontainerapps.io/api/quiz/${id}
`,
    {
      params: {
        id: id,
      },
    }
  );
  console.log(response.data);
  if (response.status === 200) {
    return response.data;
  }
};
