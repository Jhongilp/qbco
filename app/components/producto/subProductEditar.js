import { inventarioSubmodule } from 'SubmoduleConstructor';
import { inventarioForm } from 'InventarioForm';
import { DB } from 'Database';


class MainHandleForm {
    constructor(id) {
        this.upper_control = document.createElement('div');
        this.upper_control.setAttribute('id', id);
        this.upper_control.setAttribute('class', 'inventarioMainHandleForm')
    }

    render() {
        const searchDiv = document.createElement('div');
        const innerContent = `<div> <input type='search'></input>
                              <a href="#"><i class="fa fa-search fa-lg" aria-hidden="true"></i> </a> </div>`;
        searchDiv.innerHTML = innerContent;
        this.upper_control.appendChild(searchDiv);
        this.upper_control.appendChild( this.deleteBtn() );
        return this.upper_control;
    }
    deleteBtn() {
        const deleteBtn = document.createElement('div');
        deleteBtn.setAttribute('id', 'delete-icon');
        deleteBtn.style.display = "none";
        deleteBtn.innerHTML = `<a href="#"> <i class="fa fa-trash-o fa-lg" aria-hidden="true"> </i> </a>`;
        deleteBtn.addEventListener('click', function() {
            const rowItemList = Array.from( document.querySelectorAll('.input-space > input[type="checkbox"]') );
            let itemsCode = rowItemList.reduce(function(arr, rowItem) {
                if  (rowItem.checked) {
                    arr.push(rowItem.parentElement.nextSibling.innerText);
                }
                return arr;
            }, []);
            console.log(itemsCode);
            console.log(rowItemList);
            DB.deleteData(itemsCode);
            const itemRows = Array.from(document.querySelectorAll('div.input-space > input'));
            const itemSelected = itemRows.some( item => item.checked );
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
        this.append( this.setHeader() );
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
        for ( const columnName in this.headerColumns ) {
            const headerCell = document.createElement('div');
            headerCell.setAttribute('class', 'cell-pr-sub-ed');
            headerCell.setAttribute('dataset', `headerCell${columnName}`);
            headerCell.innerHTML = columnName;
            headerRow.appendChild( headerCell );
        }
        return headerRow;
    }
    // Maybe this method should be called showItemsData instead
    addRowItem(itemsData) {
        this.resumenArea.innerHTML = "";
        this.append( this.setHeader() );
        // itemsData is the whole object returned from Firebase Database, it has several methods
        // To retrieve the specific reference use: .val() method. 
        const items = itemsData.val(); // inventario reference in Firebase database, it's an object
        for (const item in items) {
            const rowItem = this.createRow();
            for ( const columnName in this.headerColumns ) {
                const prop = columnName.split(' ').join('').toLowerCase();
                const headerCell = document.createElement('div');
                headerCell.setAttribute('class', 'cell-pr-sub-ed');
                headerCell.setAttribute('dataset', `headerCell${columnName}`);
                const propItemValue = items[item][prop] === undefined ? '-' : items[item][prop];
                headerCell.innerHTML = propItemValue;
                rowItem.appendChild( headerCell );
            }
            this.resumenArea.appendChild(rowItem);
        }
    }
    
    showDeleteBtn() {
        const itemRows = Array.from(document.querySelectorAll('div.input-space > input'));
        const itemSelected = itemRows.some( item => item.checked );
        const deleteIcon = document.getElementById('delete-icon');
        itemSelected ? deleteIcon.style.display = "flex" : deleteIcon.style.display = "none";
    }
}
 
// Instanciar la clase con el nombre del 'id' para el Node y como segundo parámetro 'inventarioForm.getFields()'
const upperControl = new MainHandleForm('upperControlManejoInventario');
const resumenArea = new ResumenArea( 'editarSubmodule-resume-container', inventarioForm.getFields() );

const view = {
    
    init: function init() {
        const container = document.createElement('div');
        container.setAttribute('id', 'manejoInventarioContainer');
        container.setAttribute('class', 'submodule-container');
        container.appendChild( upperControl.render() );
        container.appendChild( resumenArea.render() );
        // Firebase method ref.on needs a function to call when a change is detected
        // ResumenArea object needs to be binded so Firebase knows what 'this' is.
            // Firebase ref.on method handle the changes. This method in inside a DB.retrieveData built function...
            // See ref.on('value', fnAddRow, errData).
            // fnAddRow --> is a callback represent here by resumenArea.addRowItem.bind(resumenArea)
        DB.retrieveData( resumenArea.addRowItem.bind(resumenArea) );
        return container;
    }
}

const dataModel = {
    
}


const controller = {
    init: function init() {
        return view.init();
    },
    loadPage: function loadPage() {
        
    }
}

export const editionSubmodule = new inventarioSubmodule(controller, 'manejoInventarioSubmodule');