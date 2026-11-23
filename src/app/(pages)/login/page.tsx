"use client";

import {
  Field,
  FieldLabel,
  
  FieldError,
} from "../../../components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginSchema, loginSchemaType } from "@/schema/loginSchema";

import {signIn} from "next-auth/react"
const Login = () => {


  const router=useRouter()
  const form = useForm<loginSchemaType>({
    defaultValues: {
     
      email: "",
      password: "",
     
    },
    resolver:zodResolver(loginSchema)
  });

  async function Signin(values:loginSchemaType) {

  const res=await signIn("credentials",{
    email:values.email,
    password:values.password,
    redirect:false,
    callbackUrl:"/"
  })
  
  if(res?.ok===true){
    toast.success("login successfully",
    {position:"top-center"}
    )

    window.location.href=res?.url || "/"
  }
  else{
     toast.error(res?.error,
    {position:"top-center"}
     )
  }

}
  return (
    <div className="w-full my-12 p-5 mx-auto md:w-[60%]">
      <form onSubmit={form.handleSubmit(Signin)}>
    

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
       
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
