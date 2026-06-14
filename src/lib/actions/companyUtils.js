"use server"
import { toast } from "sonner";
import { serverMutation } from "../core/server";
import { revalidatePath } from "next/cache";


export const uploadLogoToImgBB = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const apiKey = process.env.NEXT_PUBLIC_IMG_BB_API_KEY;

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: formData,
    }
  );

  console.log('test form', Object.fromEntries(formData.entries()).image)
  const result = await response.json();
  console.log('result', result)

  if (!result.success) {
    toast.error("Upload failed");
  }

  return result.data.url;
};


export const createCompany =async (newCompanyData) =>{
  return serverMutation('/api/company', newCompanyData)
  
}

export const updateCompany = async(id, data)=>{
 const result =serverMutation(`/api/companies/${id}`, data, 'PATCH')
 revalidatePath('/dashboard/admin/companies')
 return result
}