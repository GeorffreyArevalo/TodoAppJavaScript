import { State } from "../../models/State.model";

import { createStateView, eventAddState } from "../panel/panel";
import { clearElementHtml } from "./clearElementHtml.helper";
import { createBtn } from "./createBtn.helper";

/**
 * 
 * @param {String} id 
 * @param {State[]} states 
 */
export const drawStates = ( id, states ) => {
    const elementHTML = document.querySelector(id);
    clearElementHtml(elementHTML);
    states.forEach( (state, index) => {
        const last = index === states.length - 1;
        const stateElement = createStateView(state, last);
        elementHTML.append(stateElement);
    });
    const btn = createBtn('+', 'btn-purple btn-fab', eventAddState);
    elementHTML.append(btn);
}
