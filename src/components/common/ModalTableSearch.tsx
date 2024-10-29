import InputState from "../common/InputState";
import "../../ui/styles.css";
import ModalContainer from "../common/ModalContainer";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

interface ITableProps<T> {
  data: T[];
  isOpen: boolean;
  onSelect?: (item: T) => void;
  onClose?: () => void;
  headers: string[];
  keys: (keyof T)[];
  title?: string;
  selected?: boolean;
  itemsSelected?: T[];
  setSelected?: Dispatch<SetStateAction<T[]>>;
}

const ModalTableSearch = <T,>({
  data,
  isOpen,
  onSelect,
  onClose,
  headers,
  keys,
  title,
  selected = false,
  setSelected,
  itemsSelected,
}: ITableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = data.filter((item) => keys.some((key) => item[key]?.toString().toLowerCase().includes(lowercasedFilter)));
    setFilteredData(filtered);
  }, [searchTerm, data, keys]);

  const handleRowClick = (item: T) => {
    onSelect?.(item);
    handleCheckboxChange(item);
  };

  const handleCheckboxChange = (item: T) => {
    const isChecked = !isItemSelected(item);
    let newItems;
    if (isChecked) newItems = [...(itemsSelected || []), item];
    else {
      const filtered = itemsSelected?.filter((i) => JSON.stringify(i) !== JSON.stringify(item));
      newItems = filtered || [];
    }

    setSelected?.(newItems);
  };

  const isItemSelected = (item: T) => {
    return itemsSelected?.some((i) => JSON.stringify(i) === JSON.stringify(item)) || false;
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title={title}>
      <div className="px-4 pb-4">
        <InputState
          type="text"
          label="Buscar"
          preIcon="Search"
          value={searchTerm}
          placeholder="Buscar..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredData.length > 0 && (
          <div className="overflow-auto max-h-[400px]">
            <table className="table-auto w-full">
              <thead className="bg-gray-400 text-white">
                <tr>
                  {selected && <th className="text-sm py-1 border text-center p-4 w-1/12">Seleccionar</th>}
                  {headers.map((header) => (
                    <th key={header} className="text-sm py-1 border text-center p-4 w-1/4">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white text-gray-500">
                {filteredData.map((item) => (
                  <tr key={crypto.randomUUID()} className="hover:bg-gray-100 cursor-pointer py-3" onClick={() => handleRowClick(item)}>
                    {selected && (
                      <td className="text-sm py-5 border text-center p-4 w-1/12">
                        <input type="checkbox" checked={isItemSelected(item)} readOnly />
                      </td>
                    )}
                    {keys.map((key) => (
                      <td key={key as string} className="text-sm py-5 border text-center p-4 w-1/4">
                        {item[key] as number | string}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {filteredData.length === 0 && <p className="text-center text-gray-500">No se encontraron resultados</p>}
      </div>
    </ModalContainer>
  );
};

export default ModalTableSearch;