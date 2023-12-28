import { State } from "../app/models/State.model";

const data = {
    states: [
        new State('Por Hacer', 'warning'),
        new State('Finalizado', 'success'),
    ],
    lastState: {}
}

const updateLocalStorage = () => {
    localStorage.setItem('states', JSON.stringify(data));
}

export const loadStates = () => {
    if(!localStorage.getItem('states')){
        data.lastState = data.states[data.states.length - 1];
        updateLocalStorage();
        return;
    }
    const { states = [], lastState } = JSON.parse(localStorage.getItem('states'));
    data.lastState = lastState;
    data.states = [...states];
}

/**
 * 
 * @returns {State[]}
 */
export const getStatesStorage = () => {
    return [...data.states];
}

/**
 * 
 * @returns {State}
 */
export const getLastState = () => {
    return data.lastState;    
}

/**
 * 
 * @param {State} state 
 */
export const addStateStorage = (state) => {
    data.states.splice(data.states.length - 1, 0, state);
    updateLocalStorage();
}

/**
 * 
 * @param {String} idState 
 */
export const deleteStateStorage = (idState) => {
    data.states = data.states.filter( state => state.id !== idState );
    updateLocalStorage();
}


