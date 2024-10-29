export const flattenValues = (obj: Record<string, any>): any[] => {
  const valuesArray: any[] = [];

  // Función recursiva para aplanar los valores
  function extractValues(object: Record<string, any>) {
    for (let key in object) {
      if (typeof object[key] === 'object' && object[key] !== null) {
        extractValues(object[key]);  // Recursión para objetos anidados
      } else if (object[key] !== undefined && object[key] !== null && object[key] !== '') {
        // Solo agregar valores que no estén vacíos, undefined o null
        valuesArray.push(object[key]);
      }
    }
  }

  extractValues(obj);
  return valuesArray;
}
