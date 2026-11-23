"use client";

import {
  Field,
  FieldLabel,
  
  FieldError,
} from "../../../components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { registerSchema, registerSchemaType } from "@/schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const Register = () => {


  const router=useRouter()
  registerSchema
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver:zodResolver(registerSchema)
  });

  async function Signup(values:registerSchemaType) {
   try{
   const{data} =await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
   toast.success(data.message,{
    position:"top-center"
   })
   router.push("/login")
} catch (e) {
  if (isAxiosError(e)) {
    toast.error(
      e.response?.data?.message || "Registration failed"
    );
  } else {
    toast.error("Something went wrong");
  }
}
  }

  return (
    <div className="w-full my-12 p-5 mx-auto md:w-[60%]">
      <form onSubmit={form.handleSubmit(Signup)}>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter Your Name</FieldLabel>
              <Input
                className="mb-5"
                {...field}
                type="text"
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter Your Email</FieldLabel>
              <Input
                className="mb-5"
                {...field}
                type="email"
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
            <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter Your Password</FieldLabel>
              <Input
                className="mb-5"
                {...field}
                type="password"
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
            <Controller
          name="rePassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter Your rePassword</FieldLabel>
              <Input
                className="mb-5"
                {...field}
                type="password"
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
            <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Enter Your Phone</FieldLabel>
              <Input
                className="mb-5"
                {...field}
                type="tel"
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register;
