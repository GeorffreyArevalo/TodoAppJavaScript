import { getLastState, setPanelDraggable, setTodoDraggable } from "../../../storage";
import { addNewTodo, changeStateTodo, deleteTodo, getStates } from "../../helpers";
import { createAlert, renderTodosHelper } from "../helpers";
import { Todo } from "../../models/Todo.model";

/**
 * 
 * @param {Todo} todo 
 * @returns {HTMLDivElement}
 */
export const createTodoElement = (todo) => {

    if(!todo) throw new Error('The todo is required');

    const{ id, title, expirationDate, idState } = todo;
    const heading = document.createElement('h4');
    heading.textContent = title;
    heading.className = 'todo__title';
    const spanElement = document.createElement('span');
    spanElement.innerHTML = `<ion-icon name="close-outline"></ion-icon>`;
    spanElement.className = 'todo__delete';
    spanElement.onclick = onClickDeleteTodo;
    const content = document.createElement('div');
    content.className = 'todo__content';
    const paragraph = document.createElement('p');
    paragraph.className = 'todo__limit';
    paragraph.textContent = new Date(expirationDate).toLocaleDateString('es-ES');
    const divSelect = document.createElement('div');
    divSelect.className = 'states-select';
    const spanSelect = document.createElement('span');
    spanSelect.id =`todo-task-${id}`;
    spanSelect.textContent = 'Haciendo';
    const ulOptions = document.createElement('ul');
    ulOptions.className = 'states-select__options';
    const states = getStates();
    let stateSelected;
    states.forEach( state => {
        const liOption = document.createElement('li');
        liOption.className = 'states-select__options__option';
        liOption.dataset.id = state.id;
        liOption.textContent = state.title;
        liOption.onclick = onClickStateOnTodo;
        if(state.id === idState){
            stateSelected = state;
        }
        ulOptions.append(liOption);
    });
    spanSelect.textContent = stateSelected.title;
    spanSelect.dataset.id = stateSelected.id;
    divSelect.append(spanSelect);
    divSelect.append(ulOptions);
    const spanCheck = document.createElement('span');
    spanCheck.className = 'todo__check';
    spanCheck.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>';
    spanCheck.onclick = onClickCheckTodo;
    content.append(paragraph);
    content.append(divSelect);
    content.append(spanCheck);
    const todoElement = document.createElement('div');
    todoElement.append(heading);
    todoElement.append(spanElement);
    todoElement.append(content);
    todoElement.className = 'todo';
    todoElement.draggable = true;
    todoElement.ondragstart = eventDragStart;
    todoElement.ondragend = eventDragEnd;
    todoElement.dataset.id = id;
    return todoElement;

}


/**
 * 
 * @param {DragEvent} e 
 */
const eventDragStart = (e) => {    
    setPanelDraggable(e.target.parentElement.dataset.id);
    setTodoDraggable(e.target.dataset.id);

    e.target.style.opacity = '0.4';

    const stateContents = document.querySelectorAll('.state__content');
    stateContents.forEach( state => {
        if( state.dataset.id !== e.target.parentElement.dataset.id  ){
            state.classList.add('state__content--draggable');
        }
    });
    
}

/**
 * 
 * @param {DragEvent} e 
*/
const eventDragEnd = (e) => {
    e.target.style.opacity = '1';
    const stateContents = document.querySelectorAll('.state__content');
    stateContents.forEach( state => {
        state.classList.remove('state__content--draggable');
        renderTodosHelper();
    });
}

/**
 * 
 * @param {SubmitEvent} e 
 */
export const submitFormTodo = (e) => {
    e.preventDefault();
    const form = e.target;
    const spanState = form.querySelector('.selected-form');
    const titleInput = form.querySelector('input[name="task"]');
    const dateInput = form.querySelector('input[name="date-exp"]');
    if( !spanState.dataset.id  || titleInput.value.trim() === '' || dateInput.value.trim() === '' ){
        createAlert('Debe introducir un valor en todos los campos.', 'danger');
        return;
    }
    addNewTodo( titleInput.value, dateInput.value, Number(spanState.dataset.id) );
    renderTodosHelper();
    dateInput.value = '';
    titleInput.value = '';
    spanState.dataset.id = '';
    spanState.textContent = 'Estado';
}

/**
 * 
 * @param {Event} e 
 */
export const onClickOptionsSelect = (e) => {
    const elementSelected = e.target;
    const spanElement = elementSelected.parentElement.parentElement.firstElementChild;
    spanElement.textContent = elementSelected.textContent;
    spanElement.dataset.id = elementSelected.dataset.id;
}

/**
 * 
 * @param {Event} e 
 */
const onClickStateOnTodo = (e) => {
    const idTodo = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
    const idState = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.id;
    setPanelDraggable(idState);
    setTodoDraggable(idTodo)
    changeStateTodo(e.target.dataset.id);
    renderTodosHelper();
}

/**
 * 
 * @param {Event} e 
 */
const onClickDeleteTodo = (e) => {

    const idTodo = e.target.parentElement.parentElement.dataset.id;
    const idState = e.target.parentElement.parentElement.parentElement.dataset.id;
    deleteTodo( Number(idTodo), Number(idState) );
    renderTodosHelper();
}

/**
 * 
 * @param {Event} e 
 */
const onClickCheckTodo = (e) => {

    let idTodo;
    let idState;
    if( e.target.name === 'span' ){
        idTodo = e.target.parentElement.parentElement.dataset.id;
        idState = e.target.parentElement.parentElement.parentElement.dataset.id;
    }else{
        idTodo = e.target.parentElement.parentElement.parentElement.dataset.id;
        idState = e.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
    }
    if( Number(idState) === getLastState().id ) return;
    setPanelDraggable(idState);
    setTodoDraggable(idTodo);
    changeStateTodo(getLastState().id);
    renderTodosHelper();
}
