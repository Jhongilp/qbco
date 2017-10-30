export const inventarioForm = (function ProductForm() {
  const inventarioFields = {
      'Cod':                true
    , 'Description':        true
    , 'Cantidad':           true
    , 'Precio U':           true
    , 'Empaque':            true
    , 'Moneda':             false
    , 'Unidades x Empaque': false
    , 'Unidad de carga':    true
    , 'Campo 1':            false
  };
  
  function getFields() {
    return inventarioFields;
  }
  
  function updateFields(columnName, value) {
    inventarioFields[columnName] = value;
  }
  
  return {
    getFields: getFields,
    updateFields: updateFields,
  };
})();