import { addState } from "../../helpers/addState.helper";
import { State } from "../../models/State.model";

import { getStates } from "../../helpers/getStates.helper";
import { drawStates } from "../helpers/renderStates.helper";

/**
 * 
 * @param {State} state 
 * @param {Boolean} last 
 * @returns {HTMLElement}
 */
export const createStateView = ( state, last = false ) => {
    if(!state) throw new Error('The state is required.');
    const { title, color, id } = state;
    const divState = document.createElement('div');
    const heading = document.createElement('h3');
    const stateContent = document.createElement('div');
    divState.classList.add('state');
    heading.className = `state__title state__title--${color}`;
    if(title !== 'Por Hacer' && title !== 'Finalizado'){
        heading.classList.add('cursor-move');
    }
    heading.textContent = title;
    stateContent.classList.add('state__content');
    if(last){
        stateContent.classList.add('state__content--last');
    }
    divState.append(heading);
    divState.append(stateContent);
    return divState;
}

/**
 * 
 * @param {Event} event 
 */
export const eventAddState = (event) => {
    const panel = document.querySelector('#panel');
    let inputText = panel.querySelector('#inputState');
    event.target.classList.toggle('rotate-45-deg');
    if(inputText){
        inputText.remove();
        return;
    }
    inputText = document.createElement('input');
    inputText.type = 'text';
    inputText.name = 'state';
    inputText.id = 'inputState'
    inputText.className = 'input-text';
    inputText.addEventListener('keyup', onAddState);
    panel.insertBefore(inputText, event.target);
}

/**
 * 
 * @param {Event} event 
 */
const onAddState = (event) => {
    if(event.keyCode !== 13) return;
    const titleState = event.target.value;
    if(titleState.trim().length < 3) return;
    addState(titleState, 'purple');
    event.target.remove();
    renderStates();
}

const renderStates = () => {
    const states = getStates();
    drawStates('#panel', states);
}
