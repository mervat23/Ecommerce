import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(4,"min length 3").max(20,"max length 20"),
  email: z.email("invalid Email"),
  password: z.string().min(6,"must be at least 6 chars").max(20,"max length 20"),
  rePassword: z.string().min(6,"must be at least 6 chars").max(20,"max length 20"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/,"invalid phone number"),
}).refine(function(data){
  if(data.password===data.rePassword){
    return true
  }
  return false
},{path:["rePassword"],error:"password does not match"})



export type registerSchemaType=z.infer<typeof registerSchema>