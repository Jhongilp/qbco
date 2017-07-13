/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _HTML; });
const _HTML = {
  inner(content, dom_location) {
    document.getElementById(dom_location).innerHTML = content;
  },
  append(content, dom_location) {
    document.getElementById(dom_location).appendChild(content);
  },
  crearTabla() {
    const table = document.createElement('table');
    // Create and append the head of the table
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Items</th><th>Quantity</th></tr>';
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'tabla_pedido');
    table.appendChild(tbody);
    return table;
  },
  createButton(tag, attribute, text) {
    const element = document.createElement(tag);
    attribute.split(' ').map(e => element.classList.add(e));
    element.setAttribute('href', '#');
    element.appendChild(document.createTextNode(text));
    return element;
  }
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const inventory = {
	cuñete: {
		cantidad: 1500,
		color: ['yellow', 'blue', 'green', 'white'],
		weight: 27.1,
		measure: {
			l: 26,
			w: 26,
			h: 36
		}
	},
	medio_cuñete: {
		cantidad: 2000,
		color: ['yellow', 'blue', 'green', 'white'],
		weight: 14,
		measure: {
			l: 24,
			w: 24,
			h: 25
		}
	},
	galon: {
		cantidad: 5000,
		color: ['yellow', 'blue', 'green', 'white'],
		weight: 5.5,
		measure: {
			l: 18.3,
			w: 18.3,
			h: 20
		}
	},
	bulto: {
		cantidad: 1000,
		color: ['yellow', 'blue', 'green', 'white'],
		weight: 26,
		measure: {
			l: 60,
			w: 40,
			h: 9
		}
	}
};
/* harmony export (immutable) */ __webpack_exports__["a"] = inventory;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ORDER; });
/* unused harmony export generarResumenPedido */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ingresarItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Inventario__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HTML__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Calcular__ = __webpack_require__(6);




const ORDER = {
  i_item: 0 };

function generateRow(...args) {
  // --> append input for each 'td' tag in order to edit if user click 'edit' buttton
  // --> inputs appended should have a class that hide the element, only visible when 'edit'
  const rowItem = document.createElement('tr');
  args.forEach(td => {
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
  __WEBPACK_IMPORTED_MODULE_1__HTML__["a" /* _HTML */].append(generateRow(itemOrder, qtyOrder), 'tabla_pedido');
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

  const inputData = editableInput.map(td => {
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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_Calcular__["a" /* calcularPallets */])();
      notClickedAlready = false;
    }
  };
}

function generarResumenPedido(item, qty) {
  if (ORDER.i_item === 0) {
    // Add 'edit' button:
    const editBtn = __WEBPACK_IMPORTED_MODULE_1__HTML__["a" /* _HTML */].createButton('a', 'button edit', 'Edit');
    editBtn.setAttribute('id', 'edit_btn');
    __WEBPACK_IMPORTED_MODULE_1__HTML__["a" /* _HTML */].append(editBtn, 'cmd-buttons');
    const div = document.createElement('div');
    div.setAttribute('class', 'pedido');
    // Returns the table to append to the DOM just for one time
    const tableResumen = __WEBPACK_IMPORTED_MODULE_1__HTML__["a" /* _HTML */].crearTabla();
    // cmdButtonsbuttom
    const divClearCalculeBtns = document.createElement('div');
    divClearCalculeBtns.setAttribute('id', 'clearCalcuCmd');
    const clearBtn = __WEBPACK_IMPORTED_MODULE_1__HTML__["a" /* _HTML */].createButton('a', 'button clear', 'Clear');
    clearBtn.setAttribute('id', 'clear_btn');
    const calcularBtn = __WEBPACK_IMPORTED_MODULE_1__HTML__["a" /* _HTML */].createButton('a', 'button calcular', 'Calcular');
    calcularBtn.setAttribute('id', 'calcularBtn');
    divClearCalculeBtns.appendChild(clearBtn);
    divClearCalculeBtns.appendChild(calcularBtn);
    div.appendChild(tableResumen);
    div.appendChild(divClearCalculeBtns);
    __WEBPACK_IMPORTED_MODULE_1__HTML__["a" /* _HTML */].append(div, 'resume');
    updateOrder(item, qty); // Append a <tr> every the "Ingresar" btn is clicked.
  } else {
    updateOrder(item, qty);
  }
  handleButtonEvents(); // add functions to 'edit' and 'clear' buttons
}

const checkInventory = function checkInventory(item, qty) {
  // First check if item exist, if so then check the quantity,
  // both conditions must be true, otherwhise will be false.
  const itemExist = __WEBPACK_IMPORTED_MODULE_0_Inventario__["a" /* inventory */].hasOwnProperty(item);
  const stock = itemExist ? __WEBPACK_IMPORTED_MODULE_0_Inventario__["a" /* inventory */][item].cantidad > qty : false;
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



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Bar;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HTML__ = __webpack_require__(0);


function Bar(id) {
  const bar = document.createElement('div');
  bar.setAttribute('id', id);
  const ul = document.createElement('ul');
  ul.setAttribute('class', 'upper-menu');
  bar.appendChild(ul);

  function showOrHideModule(moduleName) {
    const idModule = `${moduleName.toLowerCase()}-module`;
    const module = document.getElementById(idModule);
    const displayMode = window.getComputedStyle(module, null).getPropertyValue("display");
    displayMode === 'none' ? module.style.display = 'flex' : module.style.display = 'none';
  }

  function addTab(name) {
    const li = document.createElement('li');
    const desc = document.createTextNode(name);
    li.appendChild(desc);
    li.addEventListener('click', function () {
      showOrHideModule(name);
    });
    ul.appendChild(li);
  }

  return {
    insert() {
      return bar;
    },
    newTab(desc) {
      addTab(desc);
    },
    showOrHideModule(name) {
      showOrHideModule(name);
    }
  };
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Menu;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HTML__ = __webpack_require__(0);


const navList = [['ShowList', '<i class="fa fa-bars" aria-hidden="true"></i>'], ['Productos', '<i class="fa fa-folder-open" aria-hidden="true"></i>'], ['Domex', '<i class="fa fa-sitemap" aria-hidden="true"></i>'], ['Qbco', '<i class="fa fa-cubes" aria-hidden="true"></i>']];

function activeMenu() {
  function extendMenu() {
    const descMenu = Array.from(document.querySelectorAll('#display-menu li'));
    descMenu.map(li => {
      li.children[1].classList.toggle('showName');
    });
  };
  function ampliarDiv() {
    const div = document.getElementById('display-menu');
    div.classList.toggle('longMenu');
    extendMenu();
  };
  const li = document.getElementById('show-ls');
  li.addEventListener('click', ampliarDiv);
}

function loadMenuDescription(navList) {
  const ul = document.createElement('ul');
  ul.setAttribute('id', 'display-menu');
  ul.setAttribute('class', 'lat-menu shortMenu');
  `${navList.map((li, i) => {
    ul.innerHTML += `<li ${i === 0 ? `id="show-ls"` : `id=${li[0]}`}>
                        <div class="iconModule" data-moduleName=${li[0]}> <a href="#"> ${li[1]} </a> </div> 
                        <div class="hide"><a href="#"> ${i !== 0 ? li[0] : ''}</a></div>
                    </li>`;
  })}`;
  return ul;
};

function Menu(location) {
  __WEBPACK_IMPORTED_MODULE_0__HTML__["a" /* _HTML */].append(loadMenuDescription(navList), location);
  activeMenu();
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Qbco;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HTML__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ResumenPedido__ = __webpack_require__(2);



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

function Qbco(location) {
	__WEBPACK_IMPORTED_MODULE_0__HTML__["a" /* _HTML */].append(moduleQbco(), location);
	const li = document.getElementById('btnIngresar');
	li.onclick = function () {
		const item = document.getElementById('referencia').value.toLowerCase();
		const qty = parseInt(document.getElementById('cantidad').value);
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ResumenPedido__["a" /* ingresarItem */])(item, qty);
	};
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calcularPallets; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Inventario__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_HandleOrder__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HTML__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ResumenPedido__ = __webpack_require__(2);





function crearEncabezado(headerTitles) {
  const div = document.createElement("div");
  div.setAttribute("class", "row");
  const encabezado = `${headerTitles.map(header => `<div> ${header} </div>`).join("")}`;
  div.innerHTML = encabezado;
  return div;
}

function getRowByProduct(cells) {
  const row = document.createElement('div');
  row.setAttribute('class', 'row');
  const rowData = cells.map(cell => `<div>${cell}</div>`).join("");
  row.innerHTML = rowData;
  return row;
}

function createBodyTable(table) {
  for (const prop in __WEBPACK_IMPORTED_MODULE_3_ResumenPedido__["b" /* ORDER */]) {
    if (__WEBPACK_IMPORTED_MODULE_0_Inventario__["a" /* inventory */][prop]) {
      const item = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_HandleOrder__["a" /* createItem */])(prop);
      const name = prop;
      const cantidad = __WEBPACK_IMPORTED_MODULE_3_ResumenPedido__["b" /* ORDER */][prop];
      const palletsCompletos = item.completePallet(__WEBPACK_IMPORTED_MODULE_3_ResumenPedido__["b" /* ORDER */][prop]);
      const unidadesPorPallet = item.unitsByPallets(cantidad);
      const unidadesPendientesCubicar = item.unidadesPendienteCubicar(cantidad, palletsCompletos, unidadesPorPallet);
      const unidsPalletCompleto = cantidad - unidadesPendientesCubicar;
      const metrosCubicosCompletos = item.metrosCubicosCompletos(cantidad, unidsPalletCompleto, palletsCompletos);
      const itemInfo = [name, cantidad, palletsCompletos, unidadesPendientesCubicar, metrosCubicosCompletos];
      table.appendChild(getRowByProduct(itemInfo));
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
  __WEBPACK_IMPORTED_MODULE_2__HTML__["a" /* _HTML */].inner('', 'pallet');
  __WEBPACK_IMPORTED_MODULE_2__HTML__["a" /* _HTML */].append(crearRelacionPallets(), 'pallet');
}



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createItem;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Inventario__ = __webpack_require__(1);


function createItem(presentation) {
  const container = {
    large: 589,
    width: 235,
    height: 210
  };
  const pallet = {
    large: 120,
    width: 100,
    height: 20,
    M3: function palletM3() {
      return pallet.large / 100 * (pallet.width / 100) * (pallet.height / 100);
    }
  };
  // measures in cm for the presentation of the item[galon, cuñete, etc]
  const product = __WEBPACK_IMPORTED_MODULE_0_Inventario__["a" /* inventory */][presentation];
  const largeItem = product.measure.l;
  const widthItem = product.measure.w;
  const heightItem = product.measure.h;
  // get how many units for pallet
  const unitsLong = Math.floor(pallet.large / largeItem);
  const unitsWidth = Math.floor(pallet.width / widthItem);
  const levelsOfPallet = Math.floor((container.height - pallet.height) / heightItem); // Can't be higher than container
  const itemIsRounded = largeItem === widthItem;
  function getUnitsByFloorOfPallet(item) {
    if (itemIsRounded) {
      return unitsLong * unitsWidth;
    } else {
      const min = Math.min(__WEBPACK_IMPORTED_MODULE_0_Inventario__["a" /* inventory */][item].measure.l, __WEBPACK_IMPORTED_MODULE_0_Inventario__["a" /* inventory */][item].measure.w);
      const max = Math.max(__WEBPACK_IMPORTED_MODULE_0_Inventario__["a" /* inventory */][item].measure.l, __WEBPACK_IMPORTED_MODULE_0_Inventario__["a" /* inventory */][item].measure.w);
      if (min + max <= pallet.width) {
        const h = Math.floor(pallet.large / max);
        const w = Math.floor(pallet.large / min);
        return h + w;
      }
    }
  };
  function unidadM3() {
    return product.measure.l / 100 * (product.measure.w / 100) * (product.measure.h / 100);
  };

  // Methods of cubi
  return {
    unitsByPallets() {
      return getUnitsByFloorOfPallet(presentation) * levelsOfPallet;
    },
    completePallet(qty) {
      return Math.floor(qty / (getUnitsByFloorOfPallet(presentation) * levelsOfPallet));
    },
    unidadesPendienteCubicar(qty, completePallet, unitsByPallets) {
      return qty - completePallet * unitsByPallets;
    },
    metrosCubicosCompletos(qty, undsxCubicar, palletsCompletos) {
      const metroCubicoPallets = palletsCompletos * pallet.M3();
      return (unidadM3() * undsxCubicar + metroCubicoPallets).toFixed(2);
    }
  };
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HTML__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Menu__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Qbco__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Bar__ = __webpack_require__(3);





const UpperBar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_Bar__["a" /* Bar */])('upperbar');

function loadContentSection(id) {
  const content = document.createElement('div');
  content.setAttribute('id', id);
  const moduleSection = document.createElement('div');
  moduleSection.setAttribute('id', 'module');
  content.appendChild(UpperBar.insert());
  content.appendChild(moduleSection);
  __WEBPACK_IMPORTED_MODULE_0__HTML__["a" /* _HTML */].append(content, 'app');
}

function loadModules() {
  loadContentSection('content');
  const tabsActivedModules = [];

  const dashboard = {
    Qbco() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_Qbco__["a" /* Qbco */])('module');
    },
    Productos() {
      const moduleDiv = document.createElement('div');
      moduleDiv.setAttribute('id', 'productos-module');
      moduleDiv.innerHTML = "<h1>Productos Module</h1>";
      __WEBPACK_IMPORTED_MODULE_0__HTML__["a" /* _HTML */].append(moduleDiv, 'module');
    },
    Domex() {
      const moduleDiv = document.createElement('div');
      moduleDiv.setAttribute('id', 'domex-module');
      moduleDiv.innerHTML = "<h1>Domex Module</h1>";
      __WEBPACK_IMPORTED_MODULE_0__HTML__["a" /* _HTML */].append(moduleDiv, 'module');
    }
  };

  function displayTab(nodeElement) {
    const moduleName = nodeElement.tabIndex === 0 ? nodeElement.textContent.trim() : nodeElement.dataset.modulename.trim();
    const moduleNoActiveAlready = tabsActivedModules.indexOf(moduleName) === -1 ? true : false;
    if (moduleNoActiveAlready && moduleName != 'ShowList') {
      UpperBar.newTab(moduleName);
      tabsActivedModules.push(moduleName);
      dashboard[moduleName]();
    } else if (!moduleNoActiveAlready) {
      UpperBar.showOrHideModule(moduleName);
    }
  }

  const modules = Array.from(document.querySelectorAll('.iconModule, .hide a'));
  modules.map(element => {
    element.addEventListener('click', function () {
      displayTab(element);
    });
  });
}

window.onload = function inicio() {
  // Set the location as parameter
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_Menu__["a" /* Menu */])('app');
  loadModules();
};

/***/ })
/******/ ]);