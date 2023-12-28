import { getStates } from "../../helpers";
import { State } from "../../models/State.model";

import { createStateView, eventAddState } from "../panel/panel";
import { onClickOptionsSelect } from "../todo/todo";
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
        const first = index === 0;
        const stateElement = createStateView(state, last, first);
        elementHTML.append(stateElement);
    });
    const btn = createBtn('+', 'btn-purple btn-fab', eventAddState);
    elementHTML.append(btn);
}

export const renderStatesHelper = () => {
    const states = getStates();
    drawStates('#panel', states);
}


/**
 * 
 * @param {State[]} states 
 * @returns {HTMLDivElement}
 */
const renderSelectState = ( states = [] ) => {

    const elementSelect = document.createElement('div');
    elementSelect.className = 'states-select states-select--font-hight';
    const spanElement = document.createElement('span');
    spanElement.className = 'selected-form';
    spanElement.textContent = 'Estado';
    const ulElements = document.createElement('ul');
    ulElements.className = 'states-select__options';

    states.forEach(  state => {
        const option = document.createElement('li');
        option.className = 'states-select__options__option';
        option.dataset.id = state.id;
        option.textContent = state.title;
        option.onclick = onClickOptionsSelect;
        ulElements.append(option);
    });
    
    elementSelect.append(spanElement);
    elementSelect.append(ulElements);
    return elementSelect;
}

export const renderSelectFormTodo = () => {
    const elementContaintSelect = document.querySelector('#select-form-todo');
    clearElementHtml(elementContaintSelect);
    elementContaintSelect.append(renderSelectState(getStates()));
}
