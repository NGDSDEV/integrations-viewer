import { useState } from "react";
import Subtitle from "./Subtitle";
import AutoComplete from "@/components/common/AutoComplete";
import Button from "@/components/common/Button";

const Form: React.FC<{ control: any; selectOptions: any; errors: any }> = ({ control, selectOptions, errors }) => {
  const [products, setProducts] = useState([{ id: 1 }]);

  const addProductForm = () => {
    setProducts([...products, { id: products.length + 1 }]);
  };

  const removeProductForm = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <main>
      <article>
        <header className="flex items-center">
          <Subtitle text="Productos" className="mr-1" id="products" />
          <Button addIcon="CirclePlus" onClick={addProductForm} />
        </header>
        <section className="flex flex-col gap-2">
          {products.map((product, index) => (
            <article key={crypto.randomUUID()} className={`${products.length > 1 && "border p-2 rounded-xl"}  `}>
              <section className="flex items-center">
                {products.length > 1 && (
                  <>
                    <p className="text-sm font-semibold mr-1"> {`Producto - ${index + 1}`} </p>
                    <Button addIcon="Trash2" size={15} onClick={() => removeProductForm(index)} />
                  </>
                )}
              </section>
              <AutoComplete
                control={control}
                options={selectOptions}
                error={errors.order?.products?.[index]?.product_code}
                label="Código del producto"
                name={`order.products[${index}].product_code`}
              />
              <AutoComplete
                control={control}
                options={selectOptions}
                error={errors.order?.products?.[index]?.product_description}
                label="Descripción del producto"
                name={`order.products[${index}].product_description`}
              />
              <AutoComplete
                control={control}
                options={selectOptions}
                error={errors.order?.products?.[index]?.product_image}
                label="Imagen del producto"
                name={`order.products[${index}].product_image`}
              />
              <AutoComplete
                control={control}
                options={selectOptions}
                error={errors.order?.products?.[index]?.product_quantity}
                label="Cantidad del producto"
                name={`order.products[${index}].product_quantity`}
              />
              <AutoComplete
                control={control}
                options={selectOptions}
                error={errors.order?.products?.[index]?.product_barcode}
                label="Código de barras del producto"
                name={`order.products[${index}].product_barcode`}
              />
            </article>
          ))}
        </section>
      </article>
    </main>
  );
};

export default Form;
