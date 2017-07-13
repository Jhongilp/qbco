import { _HTML } from '_HTML';
import { Menu } from 'Menu';
import { Qbco } from 'Qbco';
import { Bar } from 'Bar';

const UpperBar = Bar('upperbar');

function loadContentSection(id) {
  const content = document.createElement('div');
  content.setAttribute('id', id);
  const moduleSection = document.createElement('div');
	moduleSection.setAttribute('id', 'module');
	content.appendChild( UpperBar.insert() );
	content.appendChild( moduleSection );
  _HTML.append( content, 'app' );
}

function loadModules() {
  loadContentSection('content');
  const tabsActivedModules = []; 
  
  const dashboard = {
    Qbco() {
      Qbco('module');
      
    },
    Productos() {
      const moduleDiv = document.createElement('div');
      moduleDiv.setAttribute('id', 'productos-module');
      moduleDiv.innerHTML = "<h1>Productos Module</h1>";
      _HTML.append(moduleDiv, 'module')
    },
    Domex() {
      const moduleDiv = document.createElement('div');
      moduleDiv.setAttribute('id', 'domex-module');
      moduleDiv.innerHTML = "<h1>Domex Module</h1>";
      _HTML.append(moduleDiv, 'module');
    }
  };
  
  function displayTab(nodeElement) {
    const moduleName = nodeElement.tabIndex === 0 ? nodeElement.textContent.trim() : nodeElement.dataset.modulename.trim();
    const moduleNoActiveAlready = tabsActivedModules.indexOf(moduleName) === -1 ? true : false;
    if (moduleNoActiveAlready && moduleName != 'ShowList') {
      UpperBar.newTab( moduleName );
      tabsActivedModules.push(moduleName);
      dashboard[moduleName]();
    }
    else if (!moduleNoActiveAlready) {
      UpperBar.showOrHideModule(moduleName);
    }
  }
  
  const modules = Array.from( document.querySelectorAll('.iconModule, .hide a') );
  modules.map( (element) => {
    element.addEventListener('click', function() {
      displayTab(element);
    }); 
  });
}

window.onload = function inicio() {
  // Set the location as parameter
  Menu('app');
  loadModules();
};



