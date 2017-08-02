import { _HTML } from '_HTML';

export function Bar(id) {
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

    modules.forEach(function(moduleName) {
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
    li.addEventListener('click', function() {
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


