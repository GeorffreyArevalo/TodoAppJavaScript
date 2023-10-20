import { loadStates } from "./state.storage"


export const storageInit = () => {
    loadStates();
    console.log('Ghost initialized: 👻');
}
