
import { State } from "../../models/State.model";
import { getPanelDraggable } from "../../../storage";
import { renderSelectFormTodo, renderStatesHelper, renderTodosHelper } from "../helpers";
import { addState, changeStateTodo, deleteState } from "../../helpers";


/**
 * 
 * @param {State} state 
 * @param {Boolean} last 
 * @returns {HTMLElement}
 */
export const createStateView = ( state, last = false, first = false ) => {
    if(!state) throw new Error('The state is required.');
    const { title, color, id } = state;
    const divState = document.createElement('div');
    const heading = document.createElement('h3');
    const stateContent = document.createElement('div');
    divState.classList.add('state');
    heading.className = `state__title state__title--${color}`;
    heading.textContent = title;

    if(!last && !first){
        const spanDelete = document.createElement('span');
        spanDelete.className = 'state__title--delete';
        spanDelete.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
        spanDelete.onclick = onClickDeleteState;
        heading.appendChild(spanDelete);
    }


    stateContent.classList.add('state__content');
    stateContent.id = `state_${id}`;
    stateContent.dataset.id = id;

    stateContent.ondragenter = eventDragEnter;
    stateContent.ondragover = eventDragOver;
    stateContent.ondragleave = eventDragLeave;
    stateContent.ondrop = eventDrop;

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
    renderStatesHelper();
    renderTodosHelper();
    renderSelectFormTodo();
}

/**
 * 
 * @param {DragEvent} e 
 */
const eventDragOver = (e) => {
    e.preventDefault();
}

/**
 * 
 * @param {DragEvent} e 
 */
const eventDragLeave = (e) => {
    e.target.classList.remove('state__content--drag-enter');
}

/**
 * 
 * @param {DragEvent} e 
 */
const eventDrop = (e) => {
    e.preventDefault();
    if(!e.target.dataset.id) return;
    if(e.target.classList.contains('state__content') && e.target.dataset.id !== getPanelDraggable()){
        e.target.classList.remove('state__content--drag-enter');
        changeStateTodo(e.target.dataset.id);
    }
}

/**
 * 
 * @param {DragEvent} e 
 */
const eventDragEnter = (e) => {
    if(e.target.classList.contains('state__content') && e.target.dataset.id !== getPanelDraggable()){
        e.target.classList.add('state__content--drag-enter');
    }
}

/**
 * 
 * @param {Event} e 
 */
const onClickDeleteState = (e) => {
    let content;
    if(e.target.name === 'span'){
        content = e.target.parentElement.parentElement;
    }else {
        content = e.target.parentElement.parentElement.parentElement;
    }
    const divContent = content.querySelector('div');
    deleteState(divContent.dataset.id);
    renderStatesHelper();
    renderTodosHelper();
    renderSelectFormTodo();
}
