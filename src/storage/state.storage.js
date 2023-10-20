import { State } from "../app/models/State.model";

const data = {
    states: [
        new State('Por Hacer', 'warning'),
        new State('Finalizado', 'success'),
    ]
}

const updateLocalStorage = () => {
    localStorage.setItem('states', JSON.stringify(data));
}

export const loadStates = () => {
    if(!localStorage.getItem('states')) return;
    const { states = [] } = JSON.parse(localStorage.getItem('states'));
    data.states = [...states];
}

export const getStatesStorage = () => {
    return [...data.states];
}

/**
 * 
 * @param {State} state 
 */
export const addStateStorage = (state) => {
    data.states.splice(data.states.length - 1, 0, state);
    updateLocalStorage();
}


