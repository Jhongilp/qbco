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
    attribute.split(' ').map( e => element.classList.add(e) );
    element.setAttribute('href', '#');
    element.appendChild(document.createTextNode(text));
    return element;
  }
};

export {_HTML};