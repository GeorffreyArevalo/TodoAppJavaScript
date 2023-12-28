import { Todo } from "../app/models/Todo.model";

const data = {

    todos: {},
    panelDraggable: 0,
    todoDraggable: 0,
}

/**
 * 
 * @param {Todo} todo 
 */
export const addNewTodoStorage = ( todo ) => {
    data.todos[todo.idState] = data.todos[todo.idState] ? [...data.todos[todo.idState], todo] : [todo];
    updateLocalStorage();
}

/**
 * 
 * @param {String} idTodo 
 */
export const deleteTodoStorage = ( idTodo, idState ) => {
    data.todos[idState] = data.todos[idState].filter( todo => todo.id !== idTodo );
    updateLocalStorage();
}


const updateLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(data));
}

export const loadTodos = () => {
    if(!localStorage.getItem('todos')){
        updateLocalStorage();
        return;
    }
    const { todos = {} } = JSON.parse(localStorage.getItem('todos'));
    data.todos = {...todos};
}

/**
 * 
 * @returns {Todo[]}
 */
export const getTodosStorage = () => {
    return {...data.todos};
}

/**
 * 
 * @param {String} idPanel 
 */
export const setPanelDraggable = (idPanel) => {
    data.panelDraggable = idPanel;
}

/**
 * 
 * @returns {Number}
 */
export const getPanelDraggable = () => {
    return data.panelDraggable;
}

/**
 * 
 * @returns {Number}
 */
export const getTodoDraggable = () => {
    return data.todoDraggable;
}

/**
 * 
 * @param {String} idTodo 
 */
export const setTodoDraggable = (idTodo) => {
    data.todoDraggable = idTodo;
}

/**
 * 
 * @param {String} newIdState 
 */
export const changeStateTodoStorage = ( newIdState ) => {    
    const changedTodo = data.todos[data.panelDraggable].find( todo => todo.id === Number(data.todoDraggable) );
    data.todos[data.panelDraggable] = data.todos[data.panelDraggable].filter( todo => todo.id !== Number(data.todoDraggable) );
    changedTodo.idState = Number(newIdState);
    data.todos[newIdState] = data.todos[newIdState] ? [...data.todos[newIdState], changedTodo] : [changedTodo];
    updateLocalStorage();
}
