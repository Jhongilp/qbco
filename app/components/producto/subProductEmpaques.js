import { inventarioSubmodule } from 'SubmoduleConstructor';

const view = {
    
    init: function init() {
        const container = document.createElement('div');
        container.setAttribute('id', 'empaqueInventarioContainer');
        container.setAttribute('class', 'submodule-container');
        container.innerHTML = "Submodule empaques";
        return container;
    }
}

const controller = {
    init: function init() {
        return view.init();
    },
    loadPage: function loadPage() {
        
    }
}

export const empaqueSubmodule = new inventarioSubmodule(controller, 'empaqueInventarioSubmodule');