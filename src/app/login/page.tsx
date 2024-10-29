"use client";

import * as yup from "yup";
import { changeStateSpinner } from "@/lib/features/common/general";
import { changeUserInfo } from "@/lib/features/auth";
import { loginService } from "@/services/auth/authServices";
import { Poppins } from "next/font/google";
import { showToast } from "@/lib/features/common/toast";
import { useAppDispatch } from "@/lib/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Input from "@/components/common/Input";
import LogoHeader from "../../../public/colsubsidio_header.webp";
import { useEffect } from "react";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export default function LoginPage() {
  interface IOperAuth {
    username: string;
    password: string;
  }
  const dispatch = useAppDispatch();
  const router = useRouter();

  const schema = yup
    .object({
      username: yup.string().required("El campo es requerido"),
      password: yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("El campo es requerido"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, disabled, isSubmitSuccessful, isValid },
  } = useForm<IOperAuth>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema) as any,
  });

  useEffect(() => {
  }, [isValid, disabled, isSubmitSuccessful]);

  const onSubmit: SubmitHandler<IOperAuth> = async (data) => {
    dispatch(changeStateSpinner(true));
    try {
      const response = await loginService(data.username, data.password);

      dispatch(changeUserInfo(response));
      router.push("/modulos/home", { scroll: false });
    } catch (error) {
      console.error("Login failed:", error);
      dispatch(showToast({ type: "error", title: "Error", description: "Error al iniciar sesión, inténtelo nuevamente" }));
    } finally {
      dispatch(changeStateSpinner(false));
    }
  };

  return (
    <main className="flex h-screen">
      <section className="w-full flex items-center justify-center bg-white p-8">
        <article className="w-full max-w-lg bg-white  sm:py-40 sm:px-20 sm:shadow-lg ">
          <h1 className={`text-base sm:text-2xl text-highest ${poppins.className} antialiased`}>Te damos la bienvenida a</h1>
          <Image src={LogoHeader} width={160} height={60} alt="logo colsubsidio" className="w-[168px] h-[50px] mb-4" priority={false} />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input error={errors.username} label="Nombre de usuario" preIcon="User" register={{ ...register("username") }} />

            <Input preIcon="Lock" error={errors.password} label="Contraseña" type="password" register={{ ...register("password") }} />

            <button type="submit" className="rounded py-1 w-full bg-secundary hover:bg-secundary/90 text-primary font-bold">
              Iniciar sesión
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
