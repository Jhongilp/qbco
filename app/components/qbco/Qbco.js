import { _HTML } from '_HTML';
import { ingresarItem } from 'ResumenPedido';

function moduleQbco() {
	const qbcoDiv = document.createElement('div');
	qbcoDiv.setAttribute('id', 'qbco-module');
  const contentInfo = `
    <div class="content-info">
			<div class="input-section">
				<input id='referencia' type='text'>
				<input id='cantidad' type='number'>
				<div id='cmd-buttons'>
					<a href='#' class='button submit' id='btnIngresar'>Add</a>
				</div>
				</div>
			<div class="columns">
					<div id="resume" class="col col-1"> </div>
			</div>
		</div> <!-- / content-info -->
		<div id="pallet" class="col col-2"></div>`;
	qbcoDiv.innerHTML = contentInfo;
	return qbcoDiv;
}

export function Qbco(location) {
  _HTML.append( moduleQbco(), location );
	const li = document.getElementById('btnIngresar');
	li.onclick = function() {
	  const item = document.getElementById('referencia').value.toLowerCase();
	  const qty = parseInt(document.getElementById('cantidad').value);
	  ingresarItem(item, qty);
	};
}