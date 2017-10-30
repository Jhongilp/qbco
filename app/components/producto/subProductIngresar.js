import { DB } from 'Database';
import { inventarioSubmodule } from 'SubmoduleConstructor';
import { inventarioForm } from 'InventarioForm';

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
          inputSectionArea.appendChild( this.inputSection( inventarioForm.getFields() ) );
    container.appendChild( inputSectionArea );
    container.appendChild( this.hiddenColumnBox( inventarioForm.getFields() ) );  
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
    return headerContent;
  },
  
  hiddenColumnBox: function hiddenColumnBox(fieldColumns) {
    const hiddenCheckboxes = document.createElement('div');
      hiddenCheckboxes.setAttribute('id', 'box-product-columns');
      hiddenCheckboxes.setAttribute('class', 'column-box hidden-box');

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
    const doneBtn = document.createElement('div');
    doneBtn.innerHTML = `<div><a href="#" class="button submit"> Hecho </a></div>`;
    doneBtn.addEventListener('click', function() {
      hiddenCheckboxes.classList.toggle('hidden-box');
    });
    hiddenCheckboxes.innerHTML = `${fieldSet(fieldColumns)}`;
    hiddenCheckboxes.appendChild(doneBtn);
    return hiddenCheckboxes;
  },
  
  showColumnOptions: function showColumnOptions() {
    const liColumns = document.getElementById('open-hidden-box');
    liColumns.addEventListener('click', function() {
      const boxWithFieldList = document.getElementById('box-product-columns');
      boxWithFieldList.classList.toggle('hidden-box');
    });
  },
  
  update: function update(form) {
    const checkBoxState = Array.from( document.querySelectorAll('#box-product-columns input[type="checkbox"]') );
    checkBoxState.forEach(function(col) {
      col.addEventListener('click', function() {
        const columnTitle = col.nextElementSibling.textContent;
        form.updateFields( columnTitle, col.checked);
        const inputSectionArea = document.getElementById('inputSectionArea');
        inputSectionArea.innerHTML = '';
        inputSectionArea.appendChild( view.inputSection( form.getFields() ) );
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
    view.update( inventarioForm );
    this.ingresar();
  },
  
  ingresar: function ingresar() {
    const createBtn = document.getElementById('create-product');
    createBtn.addEventListener('click', function() {
      const creationDate = new Date();
      const data = Array.from( document.querySelectorAll('#productInputSection input'));
      const item = {};
      data.map( col => {
        const prop = col.dataset.prop;
        const value = col.value;
        item[prop] = value;
      });
      item["creationDate1"] = Date.parse(creationDate);
      DB.createItem(item);
      console.log(creationDate);
      console.log(item);
    });
    
  }
  // End of controller
};

export const additionSubmodule = new inventarioSubmodule(controller, 'ingresoInventarioSubmodule');
