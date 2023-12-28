import { getTodos } from "../../helpers";
import { Todo } from "../../models/Todo.model";
import { createTodoElement } from "../todo/todo";
import { clearElementHtml } from "./clearElementHtml.helper";

/**
 * 
 * @param {String} id 
 * @param {Todo[]} todos 
 */
export const drawTodos = (id, todos = []) => {
    const container = document.querySelector(id);
    clearElementHtml(container);
    todos.forEach(todo => {
        const elementTodo = createTodoElement(todo);
        container.append(elementTodo)
    });
}

export const renderTodosHelper = () => {
    const todos = getTodos();
    Object.keys(todos).forEach( key => {
        drawTodos(`#state_${key}`, todos[key]);
    });
}