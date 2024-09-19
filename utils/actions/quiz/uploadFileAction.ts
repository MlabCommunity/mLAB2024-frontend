"use server";
import { image } from "@nextui-org/react";
import axios, { Axios, AxiosError } from "axios";
import { cookies } from "next/headers";

export async function uploadFileAction(
  fileId: string,
  prevState: any,
  formData: FormData
) {
  // const data = Object.fromEntries(formData);
  // const validatedFields = uploadSchema.safeParse({ image: data.fileId });
  const access = cookies().get("AccessToken")?.value;
  // return validatedFields;
}
//   if (validatedFields.success) {
//     // API Request here
//     try {
//       if (!access) {
//         throw new Error("Access token is missing.");
//       }
//       const payload = {
//         data: data,
//       };
//       const response = await axios.post(data, {
//         headers: {
//           Authorization: `Bearer ${access}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       if (error instanceof AxiosError) {
//         throw error;
//       } else {
//         throw new Error("An unexpected error occurred");
//       }
//     }
//   }
// }
