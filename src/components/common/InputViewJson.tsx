import "../../ui/styles.css";
import "react18-json-view/src/style.css";
import { CustomHelper } from "./CustomHelper";
import { useEffect, useState } from "react";
import Button from "./Button";
import JsonView from "react18-json-view";
import { FieldError, Merge } from "react-hook-form";

interface IInputViewJson {
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
  label: string;
  signature: string | object;
  setValue: (field: string, value: string) => void;
}

const InputViewJson = ({ label, setValue, signature, error }: IInputViewJson) => {
  const [jsonData, setJsonData] = useState<string | null | object>(null);
  const [focusInput, setFocusInput] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const onFocusAction = () => {
    setFocusInput(true);
  };

  const onResetValues = () => {
    setJsonData(null);
    setFileName(null);
    setValue("signature", "");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const json = JSON.parse(result);
          setJsonData(json);
          setValue("signature", json);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error("Please upload a valid JSON file.");
    }
  };

  useEffect(() => {
    if (signature !== "") {
      setJsonData(signature);
      setFileName("Archivo cargado");
    } else onResetValues();
  }, [signature]);

  return (
    <main>
      {!jsonData ? (
        <section>
          <label className={`block text-sm font-medium ${focusInput ? "text-primary" : ""}`}>
            {label}
            <span className="text-accent"> *</span>
          </label>
          <input
            className="hidden"
            type="file"
            accept=".json"
            id="fileInput"
            onChange={handleFileChange}
            onFocus={() => onFocusAction()}
            onBlur={() => setFocusInput(false)}
          />
          <label
            htmlFor="fileInput"
            className={`cursor-pointer text-center block w-full py-2 border rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
          >
            Seleccionar archivo {fileName}
          </label>
        </section>
      ) : (
        <section className="border rounded-md p-2">
          <article className="flex justify-end mb-2">
            <Button onClick={onResetValues} addIcon="CircleX" />
          </article>
          <article className="json-view-container scroll-app">
            <JsonView
              src={jsonData}
              collapseStringsAfterLength={8}
              collapsed={1}
              displaySize={true}
              style={{ fontSize: "0.8rem" }}
              theme="winter-is-coming"
            />
          </article>
        </section>
      )}
      {error && <CustomHelper message={error.message} />}
    </main>
  );
};

export default InputViewJson;
