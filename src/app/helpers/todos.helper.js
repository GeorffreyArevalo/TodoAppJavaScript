import { addNewTodoStorage, changeStateTodoStorage, deleteTodoStorage, getTodosStorage } from "../../storage";
import { Todo } from "../models/Todo.model";

export const getTodos = () => {
    return getTodosStorage();
}

/**
 * 
 * @param {Number} newIdState 
 */
export const changeStateTodo = (newIdState) => {
    changeStateTodoStorage(newIdState);
}

/**
 * 
 * @param {String} title 
 * @param {Number} dateExpiration 
 * @param {Number} idState 
 */
export const addNewTodo = (title, dateExpiration, idState) => {
    const todo = new Todo(title, new Date(dateExpiration).getTime(), idState);
    addNewTodoStorage(todo);
}

/**
 * 
 * @param {String} idTodo 
 * @param {String} idState 
 */
export const deleteTodo = ( idTodo, idState ) => {
    deleteTodoStorage( idTodo, idState );
}