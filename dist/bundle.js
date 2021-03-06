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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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

class inventarioSubmodule {

  constructor(submoduleObj, id) {
    this.submoduleObj = submoduleObj;
    this.submodule = document.createElement('div');
    this.submodule.setAttribute('id', id);
    this.submodule.appendChild(submoduleObj.init());
  }

  init() {
    return this.submodule;
  }

  load() {
    this.submoduleObj.loadPage();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = inventarioSubmodule;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const DB = function DB() {

  const config = {
    apiKey: "AIzaSyBB-mhYGsm-1iF2Ksv2Y2wnAktGU0Fh-0I",
    authDomain: "qbco-8373d.firebaseapp.com",
    databaseURL: "https://qbco-8373d.firebaseio.com",
    projectId: "qbco-8373d",
    storageBucket: "qbco-8373d.appspot.com",
    messagingSenderId: "568598711654"
  };

  firebase.initializeApp(config);
  const database = firebase.database();
  const ref = database.ref('inventario');

  function createItem(item) {
    ref.push(item);
  }

  // Este método debe llamarse pero ingresando la función getData desde el submodule Editar con el método addRow
  function retrieveData(fnAddRow) {
    // Read the docs for Firebase.on method. It needs a callback to handle/display the changes
    // fnAddRow --> resumenArea.addRowItem.bind(resumenArea)
    ref.on('value', fnAddRow, errData);
  }

  function deleteData(itemsCodeArr) {
    // itemsCodeArr is an array with all the item's code the user selected to be deleted.
    // With the code info we will match the item save in the database
    ref.on('value', function (inventario) {
      if (inventario.val()) {
        const inventarioObj = inventario.val();
        // ref.on returns the whole 'inventario' object
        const itemKeyDB = Object.keys(inventarioObj); // Firebase asign a random unique key for each data object
        for (let i = 0; i < itemsCodeArr.length; i++) {
          // 'selectedItemCode' will refer to the product's code which input was checked by the user...
          // regarding to the item to be deleted
          const selectedItemCode = itemsCodeArr[i];
          for (let j = 0; j < itemKeyDB.length; j++) {
            const itemRefKey = itemKeyDB[j]; // This is the current child's key for the Firebase 'inventario' object
            const itemCodeDB = inventarioObj[itemKeyDB[j]]['cod']; // Get the 'code' for the item saved in DB
            if (selectedItemCode === itemCodeDB) {
              const itemRow = database.ref('inventario/' + itemRefKey);
              itemRow.remove();
              // .then(function() {
              //   console.log('Item was succesfully deleted');
              // })
              // .catch(function(error) {
              //   console.log('Failure: ' + error);
              // });
            }
          }
        }
      }
    });
  }

  function errData(err) {
    console.log('Error is: ' + err);
  }

  return {
    createItem: createItem,
    retrieveData: retrieveData,
    deleteData: deleteData
  };
}();
/* harmony export (immutable) */ __webpack_exports__["a"] = DB;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const inventarioForm = function ProductForm() {
  const inventarioFields = {
    'Cod': true,
    'Description': true,
    'Cantidad': true,
    'Precio U': true,
    'Empaque': true,
    'Moneda': false,
    'Unidades x Empaque': false,
    'Unidad de carga': true,
    'Campo 1': false
  };

  function getFields() {
    return inventarioFields;
  }

  function updateFields(columnName, value) {
    inventarioFields[columnName] = value;
  }

  return {
    getFields: getFields,
    updateFields: updateFields
  };
}();
/* harmony export (immutable) */ __webpack_exports__["a"] = inventarioForm;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ORDER; });
/* unused harmony export generarResumenPedido */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ingresarItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Inventario__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HTML__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Calcular__ = __webpack_require__(13);




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
/* 6 */
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

  function displayModule(modules, selectedModule) {
    const menutabs = Array.from(document.querySelectorAll('.upper-menu li'));
    menutabs.map(li => {
      const tab = li.dataset.module;
      tab === selectedModule.toLowerCase() ? li.classList.add('selected') : li.classList.remove('selected');
    });

    modules.forEach(function (moduleName) {
      const idModule = `${moduleName.toLowerCase()}-module`;
      const module = document.getElementById(idModule);
      moduleName === selectedModule ? module.style.display = 'flex' : module.style.display = 'none';
    });
  }

  function addTab(arr, name) {
    const li = document.createElement('li');
    li.setAttribute('data-module', name.toLocaleLowerCase());
    const desc = document.createTextNode(name);
    li.appendChild(desc);
    li.addEventListener('click', function () {
      displayModule(arr, name);
    });
    ul.appendChild(li);
  }

  return {
    insert() {
      return bar;
    },
    newTab(arr, moduleName) {
      addTab(arr, moduleName);
    },
    displayModule(arr, module) {
      displayModule(arr, module);
    }
  };
}

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = productModule;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_SubProductIngresar__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_SubProductEditar__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_SubProductEmpaques__ = __webpack_require__(11);




// Editar y empaques tendrán un módulo para ser llamados.
const submodule = {

  ingresar: {
    render: () => __WEBPACK_IMPORTED_MODULE_0_SubProductIngresar__["a" /* additionSubmodule */],
    activedAlready: false
  },

  editar: {
    render: () => __WEBPACK_IMPORTED_MODULE_1_SubProductEditar__["a" /* editionSubmodule */],
    activedAlready: false
  },

  empaques: {
    render: () => __WEBPACK_IMPORTED_MODULE_2_SubProductEmpaques__["a" /* empaqueSubmodule */],
    activedAlready: false
  }
};

const innerNavBar = function innerNavBar() {
  const menuList = ['Ingresar', 'Editar', 'Empaques'];

  return {

    render: function render() {
      return `<ul class="product-upper-submenu">
            ${menuList.map(li => `<li><a href='#'> ${li} </a></li>`).join('')}
          </ul>`;
    },

    addClickEvent: function addClickEvent() {
      const nodeListMenu = Array.from(document.querySelectorAll('.product-upper-submenu a'));
      nodeListMenu.map(li => {
        li.addEventListener('click', function () {
          const subModuleName = li.innerText.toLowerCase();
          controller.displaySubModule(subModuleName);
        });
      });
    }
  };
}();

const view = {
  init: function init(id) {
    const module = document.getElementById(id);
    const productModule = document.createElement('div');
    productModule.setAttribute('id', 'productos-module');
    productModule.innerHTML = `<div class="product-wrapper">
        <div> 
          ${innerNavBar.render()}
        </div>
        <div id="product-lower-section">
          <div id="product-content">
          </div>
        </div>
      </div>`;
    module.appendChild(productModule);
    innerNavBar.addClickEvent();
  },
  displaySubmodule: function displaySubmodule(submoduleObj) {
    const div = document.getElementById('product-content');
    div.appendChild(submoduleObj.init());
    submoduleObj.load();
    // view.toggleView();
  },
  toggleView: function toggleView(moduleSelected) {
    const moduleNodes = Array.from(document.querySelectorAll('#product-content > div'));
    moduleNodes.map(module => {
      module.id === moduleSelected ? module.style.display = 'flex' : module.style.display = 'none';
    });
  }
};

const controller = {

  init: function init(id) {
    view.init(id);
  },

  displaySubModule: function displaySubModule(name) {
    const submoduleObj = submodule[name].render();
    if (!submodule[name].activedAlready) {
      view.displaySubmodule(submoduleObj);
      view.toggleView(submoduleObj.init().id);
      submodule[name].activedAlready = true;
    } else {
      view.toggleView(submoduleObj.init().id);
    }
  }

};

function productModule(indexLocation) {
  controller.init(indexLocation);
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Qbco;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HTML__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ResumenPedido__ = __webpack_require__(5);



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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_SubmoduleConstructor__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_InventarioForm__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Database__ = __webpack_require__(3);




class MainHandleForm {
    constructor(id) {
        this.upper_control = document.createElement('div');
        this.upper_control.setAttribute('id', id);
        this.upper_control.setAttribute('class', 'inventarioMainHandleForm');
    }

    render() {
        const searchDiv = document.createElement('div');
        const innerContent = `<div> <input type='search'></input>
                              <a href="#"><i class="fa fa-search fa-lg" aria-hidden="true"></i> </a> </div>`;
        searchDiv.innerHTML = innerContent;
        this.upper_control.appendChild(searchDiv);
        this.upper_control.appendChild(this.deleteBtn());
        return this.upper_control;
    }
    deleteBtn() {
        const deleteBtn = document.createElement('div');
        deleteBtn.setAttribute('id', 'delete-icon');
        deleteBtn.style.display = "none";
        deleteBtn.innerHTML = `<a href="#"> <i class="fa fa-trash-o fa-lg" aria-hidden="true"> </i> </a>`;
        deleteBtn.addEventListener('click', function () {
            const rowItemList = Array.from(document.querySelectorAll('.input-space > input[type="checkbox"]'));
            let itemsCode = rowItemList.reduce(function (arr, rowItem) {
                if (rowItem.checked) {
                    arr.push(rowItem.parentElement.nextSibling.innerText);
                }
                return arr;
            }, []);
            console.log(itemsCode);
            console.log(rowItemList);
            __WEBPACK_IMPORTED_MODULE_2_Database__["a" /* DB */].deleteData(itemsCode);
            const itemRows = Array.from(document.querySelectorAll('div.input-space > input'));
            const itemSelected = itemRows.some(item => item.checked);
            itemSelected ? deleteBtn.style.display = "flex" : deleteBtn.style.display = "none";
        });
        return deleteBtn;
    }
}

class ResumenArea {
    constructor(id, headerColumns) {
        this.headerColumns = headerColumns;
        this.resumenArea = document.createElement('div');
        this.resumenArea.setAttribute('id', id);
    }

    render() {
        this.append(this.setHeader());
        return this.resumenArea;
    }
    append(node) {
        this.resumenArea.appendChild(node);
    }
    // En parametro debe ir el object del item no de inventario.getFields() pues éste debe er permanente cuando se...
    // instancia la clase
    createRow() {
        const showDeleteBtn = this.showDeleteBtn.bind(this); // bind ResumenArea object with the method showDeleteBtn
        const row = document.createElement('div');
        row.setAttribute('class', 'row-pr-sub-ed');
        const divInput = document.createElement('div');
        divInput.setAttribute('class', 'input-space');
        const input = document.createElement('input');
        input.addEventListener('change', showDeleteBtn); // showDeleteBtn refers to add 'delete' and 'edit' icons
        input.setAttribute('type', 'checkbox');
        divInput.appendChild(input);
        row.appendChild(divInput);
        return row;
    }

    setHeader() {
        const headerRow = document.createElement('div');
        headerRow.setAttribute('class', 'row-pr-sub-ed');
        const divInput = document.createElement('div');
        divInput.setAttribute('class', 'input-space');
        divInput.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
        headerRow.appendChild(divInput);
        // const headerRow = this.createRow();
        for (const columnName in this.headerColumns) {
            const headerCell = document.createElement('div');
            headerCell.setAttribute('class', 'cell-pr-sub-ed');
            headerCell.setAttribute('dataset', `headerCell${columnName}`);
            headerCell.innerHTML = columnName;
            headerRow.appendChild(headerCell);
        }
        return headerRow;
    }
    // Maybe this method should be called showItemsData instead
    addRowItem(itemsData) {
        this.resumenArea.innerHTML = "";
        this.append(this.setHeader());
        // itemsData is the whole object returned from Firebase Database, it has several methods
        // To retrieve the specific reference use: .val() method. 
        const items = itemsData.val(); // inventario reference in Firebase database, it's an object
        for (const item in items) {
            const rowItem = this.createRow();
            for (const columnName in this.headerColumns) {
                const prop = columnName.split(' ').join('').toLowerCase();
                const headerCell = document.createElement('div');
                headerCell.setAttribute('class', 'cell-pr-sub-ed');
                headerCell.setAttribute('dataset', `headerCell${columnName}`);
                const propItemValue = items[item][prop] === undefined ? '-' : items[item][prop];
                headerCell.innerHTML = propItemValue;
                rowItem.appendChild(headerCell);
            }
            this.resumenArea.appendChild(rowItem);
        }
    }

    showDeleteBtn() {
        const itemRows = Array.from(document.querySelectorAll('div.input-space > input'));
        const itemSelected = itemRows.some(item => item.checked);
        const deleteIcon = document.getElementById('delete-icon');
        itemSelected ? deleteIcon.style.display = "flex" : deleteIcon.style.display = "none";
    }
}

// Instanciar la clase con el nombre del 'id' para el Node y como segundo parámetro 'inventarioForm.getFields()'
const upperControl = new MainHandleForm('upperControlManejoInventario');
const resumenArea = new ResumenArea('editarSubmodule-resume-container', __WEBPACK_IMPORTED_MODULE_1_InventarioForm__["a" /* inventarioForm */].getFields());

const view = {

    init: function init() {
        const container = document.createElement('div');
        container.setAttribute('id', 'manejoInventarioContainer');
        container.setAttribute('class', 'submodule-container');
        container.appendChild(upperControl.render());
        container.appendChild(resumenArea.render());
        // Firebase method ref.on needs a function to call when a change is detected
        // ResumenArea object needs to be binded so Firebase knows what 'this' is.
        // Firebase ref.on method handle the changes. This method in inside a DB.retrieveData built function...
        // See ref.on('value', fnAddRow, errData).
        // fnAddRow --> is a callback represent here by resumenArea.addRowItem.bind(resumenArea)
        __WEBPACK_IMPORTED_MODULE_2_Database__["a" /* DB */].retrieveData(resumenArea.addRowItem.bind(resumenArea));
        return container;
    }
};

const dataModel = {};

const controller = {
    init: function init() {
        return view.init();
    },
    loadPage: function loadPage() {}
};

const editionSubmodule = new __WEBPACK_IMPORTED_MODULE_0_SubmoduleConstructor__["a" /* inventarioSubmodule */](controller, 'manejoInventarioSubmodule');
/* harmony export (immutable) */ __webpack_exports__["a"] = editionSubmodule;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_SubmoduleConstructor__ = __webpack_require__(2);


const view = {

    init: function init() {
        const container = document.createElement('div');
        container.setAttribute('id', 'empaqueInventarioContainer');
        container.setAttribute('class', 'submodule-container');
        container.innerHTML = "Submodule empaques";
        return container;
    }
};

const controller = {
    init: function init() {
        return view.init();
    },
    loadPage: function loadPage() {}
};

const empaqueSubmodule = new __WEBPACK_IMPORTED_MODULE_0_SubmoduleConstructor__["a" /* inventarioSubmodule */](controller, 'empaqueInventarioSubmodule');
/* harmony export (immutable) */ __webpack_exports__["a"] = empaqueSubmodule;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Database__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_SubmoduleConstructor__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_InventarioForm__ = __webpack_require__(4);




const view = {
  init: function init() {
    const container = document.createElement('div');
    container.setAttribute('id', 'ingresar-content');
    const divColumn = document.createElement('div');
    divColumn.setAttribute('id', 'open-hidden-box');
    divColumn.innerHTML = `<ul><li> <a href="#"><i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></a> </li></ul>`;
    container.appendChild(divColumn);
    // Area for inputSection:
    const inputSectionArea = document.createElement('div');
    inputSectionArea.setAttribute('id', 'inputSectionArea');
    inputSectionArea.appendChild(this.inputSection(__WEBPACK_IMPORTED_MODULE_2_InventarioForm__["a" /* inventarioForm */].getFields()));
    container.appendChild(inputSectionArea);
    container.appendChild(this.hiddenColumnBox(__WEBPACK_IMPORTED_MODULE_2_InventarioForm__["a" /* inventarioForm */].getFields()));
    return container;
  },

  inputSection: function inputSection(fields) {
    const headerContent = document.createElement('div');
    headerContent.setAttribute('id', 'productInputSection');
    // const headerContent = document.getElementById('productInputSection');
    for (var i = 0; i < 2; i++) {
      let row = document.createElement('div');
      row.setAttribute('class', 'row-product');
      let cells = "";
      for (const header in fields) {
        if (fields[header]) {
          // First the header (0), then (1) the input fields
          const prop = header.split(' ').join('').toLowerCase();
          if (i === 0) cells += `<div class="cell-product">${header}</div>`;else cells += `<input data-prop=${prop} class='cell-product'>`;
        }
      }
      row.innerHTML = cells;
      const button = document.createElement('button');
      button.setAttribute('id', 'create-product');
      i === 1 ? row.appendChild(button) : null;
      headerContent.appendChild(row);
    }
    return headerContent;
  },

  hiddenColumnBox: function hiddenColumnBox(fieldColumns) {
    const hiddenCheckboxes = document.createElement('div');
    hiddenCheckboxes.setAttribute('id', 'box-product-columns');
    hiddenCheckboxes.setAttribute('class', 'column-box hidden-box');

    function fieldSet(objList) {
      const listArray = Object.keys(objList);
      return `<fieldset class='box-checklist'>
        <legend>Escoger campos:</legend>
          ${listArray.map(columnName => {
        return `<div>
                      <input 
                        type="checkbox" 
                        name="column-option" 
                        value=${columnName} 
                        ${objList[columnName] ? 'checked' : null}>
                      <label>${columnName}</label>
                    </div>`;
      }).join('')}
        </fieldset>`;
    }
    const doneBtn = document.createElement('div');
    doneBtn.innerHTML = `<div><a href="#" class="button submit"> Hecho </a></div>`;
    doneBtn.addEventListener('click', function () {
      hiddenCheckboxes.classList.toggle('hidden-box');
    });
    hiddenCheckboxes.innerHTML = `${fieldSet(fieldColumns)}`;
    hiddenCheckboxes.appendChild(doneBtn);
    return hiddenCheckboxes;
  },

  showColumnOptions: function showColumnOptions() {
    const liColumns = document.getElementById('open-hidden-box');
    liColumns.addEventListener('click', function () {
      const boxWithFieldList = document.getElementById('box-product-columns');
      boxWithFieldList.classList.toggle('hidden-box');
    });
  },

  update: function update(form) {
    const checkBoxState = Array.from(document.querySelectorAll('#box-product-columns input[type="checkbox"]'));
    checkBoxState.forEach(function (col) {
      col.addEventListener('click', function () {
        const columnTitle = col.nextElementSibling.textContent;
        form.updateFields(columnTitle, col.checked);
        const inputSectionArea = document.getElementById('inputSectionArea');
        inputSectionArea.innerHTML = '';
        inputSectionArea.appendChild(view.inputSection(form.getFields()));
        controller.ingresar();
      });
    });
  }
  // End of view
};

const controller = {

  init: function init() {
    return view.init();
  },

  loadPage: function loadPage() {
    view.showColumnOptions();
    view.update(__WEBPACK_IMPORTED_MODULE_2_InventarioForm__["a" /* inventarioForm */]);
    this.ingresar();
  },

  ingresar: function ingresar() {
    const createBtn = document.getElementById('create-product');
    createBtn.addEventListener('click', function () {
      const creationDate = new Date();
      const data = Array.from(document.querySelectorAll('#productInputSection input'));
      const item = {};
      data.map(col => {
        const prop = col.dataset.prop;
        const value = col.value;
        item[prop] = value;
      });
      item["creationDate1"] = Date.parse(creationDate);
      __WEBPACK_IMPORTED_MODULE_0_Database__["a" /* DB */].createItem(item);
      console.log(creationDate);
      console.log(item);
    });
  }
  // End of controller
};

const additionSubmodule = new __WEBPACK_IMPORTED_MODULE_1_SubmoduleConstructor__["a" /* inventarioSubmodule */](controller, 'ingresoInventarioSubmodule');
/* harmony export (immutable) */ __webpack_exports__["a"] = additionSubmodule;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calcularPallets; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Inventario__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_HandleOrder__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__HTML__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ResumenPedido__ = __webpack_require__(5);





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
/* 14 */
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
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__HTML__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Menu__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Qbco__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Product__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_Bar__ = __webpack_require__(6);






const UpperBar = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_Bar__["a" /* Bar */])('upperbar');

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
  const tabsActivedModules = [];

  const dashboard = {
    Qbco() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_Qbco__["a" /* Qbco */])('module');
    },
    Productos() {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_Product__["a" /* productModule */])('module');
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
      tabsActivedModules.push(moduleName);
      UpperBar.newTab(tabsActivedModules, moduleName);
      dashboard[moduleName]();
      UpperBar.displayModule(tabsActivedModules, moduleName);
    } else if (!moduleNoActiveAlready) {
      UpperBar.displayModule(tabsActivedModules, moduleName);
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
  loadContentSection('content');
  loadModules();
};

/***/ })
/******/ ]);