import { addStateStorage, deleteStateStorage, getStatesStorage } from "../../storage";
import { State } from "../models/State.model";
import { createAlert } from "../ui/helpers";
import { getTodos } from "./todos.helper";

export const getStates = () => {
    return getStatesStorage();
}


/**
 * 
 * @param {String} title 
 * @param {String} color 
 */
export const addState = ( title, color ) => {
    if(!title) throw new Error('Title is required to created a state.');
    const state = new State(title, color);
    addStateStorage(state);
}

/**
 * 
 * @param {String} idState 
 */
export const deleteState = ( idState ) => {
    const todos = getTodos();
    if(todos[idState] && todos[idState].length !== 0) {
        createAlert('No puede eliminar el estado porque contiene tareas.', 'danger');
        return;
    }
    deleteStateStorage(Number(idState));
}
