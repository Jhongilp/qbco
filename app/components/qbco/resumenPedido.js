import { inventory } from 'Inventario';
import { _HTML } from '_HTML';
import { calcularPallets } from 'Calcular';

const ORDER = {
  i_item: 0, // Keep the count of items appened to the order table. Important to updateOrder
};

function generateRow(...args) {
  // --> append input for each 'td' tag in order to edit if user click 'edit' buttton
	// --> inputs appended should have a class that hide the element, only visible when 'edit'
  const rowItem = document.createElement('tr');
  args.forEach((td) => {
    const tdItem = document.createElement('td');
    const item = document.createElement('div');
    item.appendChild(document.createTextNode(td));
    // Above line: Display it if 'edit' botton is clicked
    tdItem.innerHTML = `<input type="text" class="hidden" value=${td}></input>`;
    tdItem.appendChild(item); // --> show this data by default
    rowItem.appendChild(tdItem);
  });
  return rowItem;
}

function updateOrder(itemOrder, qtyOrder) {
  // Create a new row and appends it into the table
  _HTML.append(generateRow(itemOrder, qtyOrder), 'tabla_pedido');
  ORDER.i_item += 1;
}

function restartEditedOrder(arrayToEdit) {
  const cmdButtons = document.getElementById('cmd-buttons');
  const editButton = document.getElementById('edit_btn');
  cmdButtons.removeChild(editButton);
  document.getElementById('resume').innerHTML = '';
  ORDER.i_item = 0;

	// Collect the editable input and convert into an object
  const orderPendingToUpdate = arrayToEdit.reduce((obj, input, i) => {
    if (i % 2 === 0) {
      const qtyInt = arrayToEdit[i + 1].value;
      if (!obj[input.value.toLowerCase()]) {
        ORDER[input.value] = 0;
        obj[input.value.toLowerCase()] = parseInt(qtyInt);
      } else {
        obj[input.value.toLowerCase()] += parseInt(qtyInt);
      }
    }
    return obj;
  }, {});

  for (const item in orderPendingToUpdate) {
    ingresarItem(item, orderPendingToUpdate[item]);
  }
  // Reset the item from order if it is not longer in orderPendingToUpdate
  for (const j in ORDER) {
    if (!orderPendingToUpdate[j]) {
      delete ORDER[j];
    }
  }
}

// Assign className to 'td' elements and return the data into them.
const makeEditable = function makeEditable(tableName) {
  const orderResumeTable = document.getElementById(tableName);
  const dataFromOrderResume = orderResumeTable.getElementsByTagName('td');
  const editableInput = Array.from(dataFromOrderResume);

  const inputData = editableInput.map((td) => {
    td.className = 'chooseToEdit';
    td.addEventListener('click', () => {
      td.children[0].className = 'edit_order'; // make visible the input field to edit the order
      td.children[1].className = 'hidden'; // hide the <div> that contains the innerText
    });
    return td.children[0];
  });
  return inputData;
};

function handleButtonEvents() {
  let editionComplete = false;
  const editButton = document.getElementById('edit_btn');
  let editedInput; // Will be asigned with makeEditable()
  editButton.onclick = function editButtonOnclick() {
    if (editionComplete) {
			// var return the editedInput = td.children[0] and pass as argument to restartEditedOrder
			// in order to update the order before printing again
      restartEditedOrder(editedInput);
    } else {
      editedInput = makeEditable('tabla_pedido'); // --> Collect the editedInputs
      editionComplete = true;
    }
  };
	// calcularBtn
  const btnCalcular = document.getElementById('calcularBtn');
  // To prevent the user clicked several times and append repeated elements to the DOM
  let notClickedAlready = true;
  btnCalcular.onclick = function onClickBtnCalcular() {
    if (notClickedAlready) {
      calcularPallets();
      notClickedAlready = false;
    }
  };
}

function generarResumenPedido(item, qty) {
  if (ORDER.i_item === 0) {
	  // Add 'edit' button:
    const editBtn = _HTML.createButton('a', 'button edit', 'Edit');
    editBtn.setAttribute('id', 'edit_btn');
    _HTML.append(editBtn, 'cmd-buttons');
    const div = document.createElement('div');
    div.setAttribute('class', 'pedido');
    // Returns the table to append to the DOM just for one time
    const tableResumen = _HTML.crearTabla();
  	// cmdButtonsbuttom
    const divClearCalculeBtns = document.createElement('div');
    divClearCalculeBtns.setAttribute('id', 'clearCalcuCmd');
    const clearBtn = _HTML.createButton('a', 'button clear', 'Clear');
    clearBtn.setAttribute('id', 'clear_btn');
    const calcularBtn = _HTML.createButton('a', 'button calcular', 'Calcular');
    calcularBtn.setAttribute('id', 'calcularBtn');
    divClearCalculeBtns.appendChild(clearBtn);
    divClearCalculeBtns.appendChild(calcularBtn);
    div.appendChild(tableResumen);
    div.appendChild(divClearCalculeBtns);
    _HTML.append(div, 'resume');
    updateOrder(item, qty);	// Append a <tr> every the "Ingresar" btn is clicked.
  } else {
    updateOrder(item, qty);
  }
  handleButtonEvents(); // add functions to 'edit' and 'clear' buttons
}

const checkInventory = function checkInventory(item, qty) {
	// First check if item exist, if so then check the quantity,
	// both conditions must be true, otherwhise will be false.
  const itemExist = inventory.hasOwnProperty(item);
  const stock = itemExist ? inventory[item].cantidad > qty : false;
  return stock;
};

// This will be update with ingresarItem function
function ingresarItem(item, qty) {
  const itemAvailable = checkInventory(item, qty); // --> true or false

  if (item !== '' && qty > 0) {
    if (itemAvailable) {
      const inOrderAlready = ORDER.hasOwnProperty(item);
      if (inOrderAlready) {
        ORDER[item] += parseInt(qty);
      } else {
        ORDER[item] = parseInt(qty);
      }
      generarResumenPedido(item, qty);
      document.getElementById('referencia').value = '';
      document.getElementById('cantidad').value = '';
    } else {
      alert('El artículo no se encuentra disponible o la cantidad supera inventario');
    }
  } else {
    alert('Debe ingresar un item y su cantidad!');
  }
}

export { ORDER, generarResumenPedido, ingresarItem };