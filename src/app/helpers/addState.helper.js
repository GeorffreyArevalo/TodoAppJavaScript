import { State } from "../models/State.model";
import { addStateStorage } from "../../storage/state.storage";

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

