
import { renderInitialHtml } from "../ui/helpers";
import header from "../ui/header/header.html?raw";
import panel from "../ui/panel/panel.html?raw";
import { drawStates } from "../ui/helpers/renderStates.helper";
import { getStates } from "../helpers/getStates.helper";

export class App{

    /**
     * 
     * @param {String} idInitial 
     */
    constructor(idInitial){
        this.idInitial = idInitial;
    }

    renderHtml(){
        renderInitialHtml(this.idInitial, header);
        renderInitialHtml(this.idInitial, panel);
        this.renderStates();
    }
    
    renderStates(){
        const states = getStates();
        drawStates('#panel', states);
    }
}
