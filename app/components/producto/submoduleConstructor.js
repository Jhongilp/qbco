
export class inventarioSubmodule {
  
  constructor(submoduleObj, id) {
    this.submoduleObj = submoduleObj;
    this.submodule = document.createElement('div');
    this.submodule.setAttribute('id', id);
    this.submodule.appendChild( submoduleObj.init() );
  };
  
  init() {
    return this.submodule;
  }
  
  load() {
    this.submoduleObj.loadPage();
  }
}
