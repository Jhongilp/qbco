import { _HTML } from '_HTML';

function lunchFirebase() {
  var config = {
    apiKey: "AIzaSyBB-mhYGsm-1iF2Ksv2Y2wnAktGU0Fh-0I",
    authDomain: "qbco-8373d.firebaseapp.com",
    databaseURL: "https://qbco-8373d.firebaseio.com",
    projectId: "qbco-8373d",
    storageBucket: "qbco-8373d.appspot.com",
    messagingSenderId: "568598711654"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var ref = database.ref('inventario');
  return {
    createItem(item) {
      ref.push(item);
    }
  };
}

// Initialize Firebase
const inventarioDB = lunchFirebase();


function ProductForm() {
  const inventarioFields = {
      'Cod':                true
    , 'Description':        true
    , 'Cantidad':           true
    , 'Precio U':           true
    , 'Empaque':            false
    , 'Moneda':             false
    , 'Unidades x Empaque': true
    , 'Unidad de carga':    false
    , 'Campo 1':            false
  };
  
  return {
    getFields() {
      return inventarioFields;
    },
    updateFields(columnName, value) {
      inventarioFields[columnName] = value;
    }
  };
}

const view = {
  init: function init(id) {
    const module = document.getElementById(id);
    const productModule = document.createElement('div');
    productModule.innerHTML = 
      `<div id="productos-module">
        <div> 
          <ul class="product-upper-submenu">
            <li>Ingresar</li>
            <li>Editar</li>
            <li>Empaques</li>
          </ul>
        </div>
        <div id="product-lower-section">
          <div id="product-content">
            <div id="open-hidden-box">
              <ul><li> Columns </li></ul>
            </div>
            <div id="productInputSection"> </div>
            <div id="box-product-columns" class="column-box hidden-box">
            </div>
          </div>
        </div>
      </div>`;
      module.appendChild(productModule);
  },
  
  inputSection: function inputSection(fields) {
    const headerContent = document.getElementById('productInputSection');
    for (var i = 0; i < 2; i++) {
      let row = document.createElement('div');
      row.setAttribute('class', 'row-product');
      let cells = "";
      for (const header in fields) {
        if (fields[header]) {
          // First the header (0), then (1) the input fields
          const prop = header.split(' ').join('').toLowerCase();
          if ( i === 0 )
            cells += `<div class="cell-product">${header}</div>`;
          else
            cells += `<input data-prop=${prop} class='cell-product'>`;
        }
      }
      row.innerHTML = cells;
      const button = document.createElement('button');
      button.setAttribute('id', 'create-product');
      i === 1 ? row.appendChild(button): null;
      headerContent.appendChild(row);
    }
  },
  
  hiddenColumnBox: function hiddenColumnBox(fieldColumns) {
    const divColumnBox = document.getElementById('box-product-columns');
    function fieldSet(objList) {
      const listArray = Object.keys(objList);
      return (
        `<fieldset class='box-checklist'>
        <legend>Escoger campos:</legend>
          ${listArray.map( columnName => {
            return `<div>
                      <input 
                        type="checkbox" 
                        name="column-option" 
                        value=${columnName} 
                        ${objList[columnName] ? 'checked' : null}>
                      <label>${columnName}</label>
                    </div>`;
          }).join('')}
        </fieldset>`
      );
    }
    
    const innerDiv = `${fieldSet(fieldColumns)}
                      <div>
                        <div> Hecho </div> 
                        <div> Restablecer </div>
                      </div>`;
    
    divColumnBox.innerHTML = innerDiv;
  },
  
  showColumnOptions: function() {
    const liColumns = document.getElementById('open-hidden-box');
    liColumns.addEventListener('click', function() {
      const boxWithFieldList = document.getElementById('box-product-columns');
      boxWithFieldList.classList.toggle('hidden-box');
    });
  },
  
  update: function(form) {
    const checkBoxState = Array.from( document.querySelectorAll('input[type="checkbox"]') );
    checkBoxState.forEach(function(col) {
      col.addEventListener('click', function() {
        const columnTitle = col.nextElementSibling.textContent;
        form.updateFields( columnTitle, col.checked);
        const menu = document.getElementById('productInputSection');
        menu.innerHTML = '';
        view.inputSection( form.getFields() );
        controller.onClickCreateBtn();
      });
    });
  }
  // End of view
};

const controller = {
  
  init: function init(id) {
    view.init(id);
    controller.loadPage();
  },
  
  loadPage: function loadPage() {
    const form = ProductForm();
    view.inputSection( form.getFields() );
    view.hiddenColumnBox( form.getFields() );
    view.showColumnOptions();
    view.update(form);
  },
  
  onClickCreateBtn: function() {
    const createBtn = document.getElementById('create-product');
    createBtn.addEventListener('click', function() {
      const data = Array.from( document.querySelectorAll('#productInputSection input'));
      const item = {};
      data.map( col => {
        const prop = col.dataset.prop;
        const value = col.value;
        item[prop] = value;
      });
      inventarioDB.createItem(item);
    });
    
  }
  // End of controller
};

export function productModule(indexLocation) {
  controller.init(indexLocation);
}
