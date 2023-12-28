import { submitFormTodo } from "../todo/todo";

export const addSubmittedFormTodo = () => {
    const form = document.querySelector('#form-add-todo');
    form.addEventListener('submit', submitFormTodo);
}

