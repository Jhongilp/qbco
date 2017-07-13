import { _HTML } from '_HTML';

const navList = [
  ['ShowList', '<i class="fa fa-bars" aria-hidden="true"></i>'],
  ['Productos', '<i class="fa fa-folder-open" aria-hidden="true"></i>'],
  ['Domex', '<i class="fa fa-sitemap" aria-hidden="true"></i>'],
  ['Qbco', '<i class="fa fa-cubes" aria-hidden="true"></i>']
];

function activeMenu() {
  function extendMenu() {
    const descMenu = Array.from(document.querySelectorAll('#display-menu li'));
    descMenu.map( (li) => {
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
  `${navList.map( (li, i) => {
    ul.innerHTML += `<li ${i === 0 ? `id="show-ls"` : `id=${li[0]}`}>
                        <div class="iconModule" data-moduleName=${li[0]}> <a href="#"> ${li[1]} </a> </div> 
                        <div class="hide"><a href="#"> ${i !== 0 ? li[0] : ''}</a></div>
                    </li>`;
  })}`;
  return ul;
};

export function Menu(location) {
  _HTML.append( loadMenuDescription(navList), location );
  activeMenu();
}


