import { _HTML } from '_HTML';

export function Bar(id) {
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
    li.addEventListener('click', function() {
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


