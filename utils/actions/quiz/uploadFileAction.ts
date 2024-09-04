"use server";

import { uploadSchema } from "@/lib/form-schemas";
import { image } from "@nextui-org/react";

export async function name(
  imageId: string,
  prevState: any,
  formData: FormData
) {
  const data = Object.fromEntries(formData);

  const validatedFiels = uploadSchema.safeParse({ image: data.imageId });
}
