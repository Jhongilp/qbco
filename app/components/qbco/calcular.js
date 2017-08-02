import { inventory } from 'Inventario';
import { createItem } from 'HandleOrder';
import { _HTML} from '_HTML';
import { ORDER } from 'ResumenPedido';

function crearEncabezado(headerTitles) {
  const div = document.createElement("div");
  div.setAttribute("class", "row");
  const encabezado = `${headerTitles.map( header => `<div> ${header} </div>` ).join("")}`;
  div.innerHTML = encabezado;
  return div;
}

function getRowByProduct(cells) {
  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  const rowData = cells.map( (cell) => `<div>${cell}</div>` ).join("");
  row.innerHTML = rowData;
  return row;
}

function createBodyTable(table) {
  for (const prop in ORDER) {
    if (inventory[prop]) {
      const item = createItem(prop);
      const name = prop;
      const cantidad = ORDER[prop];
      const palletsCompletos = item.completePallet(ORDER[prop]);
      const unidadesPorPallet = item.unitsByPallets(cantidad);
      const unidadesPendientesCubicar = item.unidadesPendienteCubicar(cantidad, palletsCompletos, unidadesPorPallet);
      const unidsPalletCompleto = cantidad - unidadesPendientesCubicar;
      const metrosCubicosCompletos = item.metrosCubicosCompletos(cantidad, unidsPalletCompleto, palletsCompletos);
      const itemInfo = [name, cantidad, palletsCompletos, unidadesPendientesCubicar, metrosCubicosCompletos];
      table.appendChild( getRowByProduct(itemInfo) );
    }
  }
}

function crearRelacionPallets() {
  const tablaPallets = document.createElement('div');
  tablaPallets.setAttribute('id', 'tablaPallets');
  const titlesHeader = ['Item', 'Unidades', '#Pallets completos', 'Unidades pendientes por cubicar', 'M3 Pallets completos'];
  tablaPallets.appendChild(crearEncabezado(titlesHeader));
  createBodyTable(tablaPallets);
  return tablaPallets;
};

function calcularPallets() {
  _HTML.inner('', 'pallet');
  _HTML.append(crearRelacionPallets(), 'pallet');
}

export { calcularPallets };