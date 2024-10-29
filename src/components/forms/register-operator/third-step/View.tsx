import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Poppins } from "next/font/google";

import Button from "@/components/common/Button";
import { Form } from "@/components/forms/register-operator/third-step/Form";
import { Json } from "@/components/forms/register-operator/third-step/Json";
import { NavigationMenu } from "@/components/forms/register-operator/third-step/NavigationMenu";
import { JsonCheck } from "./JsonCheck";

import { flattenValues } from "@/utils/parametryUtils";
import { useParametry } from "@/hooks/useParametry";
import { IThirdStep } from "@/types/forms/operator";
import { useAppDispatch } from "@/lib/hooks";
import { showToast } from "@/lib/features/common/toast";

const poppins400 = Poppins({ weight: "400", subsets: ["latin"] });

export const ThirdStep = () => {
  const responsive = "w-full md:w-[350px] xl:w-[550px] lg:w-[450px] 2xl:w-[650px] max-h-[550px] overflow-y-auto";

  const dispatch = useAppDispatch();
  const [json, setJson] = useState({});
  const [jsonCheck, setJsonCheck] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signatureOper, setSignatureOper] = useState(false);

  const {
    watch,
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IThirdStep>();

  useEffect(() => {
    dataInit();
  }, []);

  const dataInit = async () => {
    let signature = null;
    const dataParametry = await getParametry();

    if (dataParametry) {
      signature = dataParametry;
      setSignatureOper(true);
    } else {
      const data = await getSignature();
      signature = data;
      setSignatureOper(false);
    }

    setJson(signature);
    const data2 = { ...signature };
    clearValues(data2);
    setJsonCheck(data2);
  };

  const showModal = () => setIsModalOpen((pre) => !pre);

  const values = watch();
  const flattenedValues = flattenValues(values);
  const { createParametry, clearValues, hasValue, getSignature, getParametry } = useParametry(jsonCheck, showModal);

  const validJsonCheck = () => {
    const isValid = hasValue(jsonCheck);

    if (!isValid) dispatch(showToast({ type: "error", title: "Seleccione mínimo un parámetro" }));
    else showModal();
  };

  return (
    <main className="space-y-4 lg:space-y-6 2xl:space-y-8 shadow-md rounded-lg p-4 bg-white">
      <section className="flex flex-col">
        <NavigationMenu />

        <section className="flex sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 lg:space-x-6 2xl:space-x-8 ">
          <Form
            className={`${responsive} lg:p-6 2xl:p-8`}
            control={control}
            errors={errors}
            reset={reset}
            handleSubmit={handleSubmit}
            isValid={isValid}
            watch={watch}
            json={json}
            setJson={setJson}
            jsonCheck={jsonCheck}
            setJsonCheck={setJsonCheck}
          />
          <article className="w-px bg-gray-300 mx-4"></article>
          <article className={`p-4 ${responsive} lg:p-6 2xl:p-8`}>
            {json &&  (<Json json={json} flattenedValues={flattenedValues} />)}
          </article>
        </section>

        {isModalOpen && <JsonCheck json={jsonCheck} isOpen={isModalOpen} onClose={showModal} onOk={createParametry} />}

        <article className="flex justify-center pt-4">
          <Button type="submit" className={`${poppins400.className} text-sm  border rounded-2xl bg-highest`} onClick={validJsonCheck}>
            <p className="text-xs py-2 px-6 text-low"> {signatureOper ? "Actualizar" : "Registrar"} </p>
          </Button>
        </article>
      </section>
    </main>
  );
};
