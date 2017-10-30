import { additionSubmodule } from 'SubProductIngresar';
import { editionSubmodule } from 'SubProductEditar';
import { empaqueSubmodule } from 'SubProductEmpaques';

// Editar y empaques tendrán un módulo para ser llamados.
const submodule = {
  
  ingresar: {
    render: () => additionSubmodule,
    activedAlready: false
  },
  
  editar: {
    render: () => editionSubmodule,
    activedAlready: false
  },
  
  empaques: {
    render: () => empaqueSubmodule,
    activedAlready: false
  }
}

const innerNavBar = (function innerNavBar() {
  const menuList = ['Ingresar', 'Editar', 'Empaques'];
  
  return {
    
    render: function render() {
      return (
          `<ul class="product-upper-submenu">
            ${menuList.map( li => `<li><a href='#'> ${li} </a></li>`).join('')}
          </ul>`
          );
    },
    
    addClickEvent: function addClickEvent() {
      const nodeListMenu = Array.from( document.querySelectorAll('.product-upper-submenu a') );
      nodeListMenu.map( li => {
        li.addEventListener('click', function() {
          const subModuleName = li.innerText.toLowerCase();
          controller.displaySubModule(subModuleName);
        })
      })
    }
  }
})();

const view = {
  init: function init(id) {
    const module = document.getElementById(id);
    const productModule = document.createElement('div');
    productModule.setAttribute('id', 'productos-module');
    productModule.innerHTML = 
      `<div class="product-wrapper">
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
    div.appendChild( submoduleObj.init() );
    submoduleObj.load();
    // view.toggleView();
  },
  toggleView: function toggleView(moduleSelected) {
    const moduleNodes = Array.from( document.querySelectorAll('#product-content > div') );
    moduleNodes.map( module => {
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
    if ( !submodule[name].activedAlready ) {
      view.displaySubmodule( submoduleObj );
      view.toggleView(submoduleObj.init().id);
      submodule[name].activedAlready = true;
    }
    else {
      view.toggleView(submoduleObj.init().id);
    }
  }
  
};

export function productModule(indexLocation) {
  controller.init(indexLocation);
}
