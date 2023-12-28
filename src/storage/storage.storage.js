import { loadStates } from "./state.storage"
import { loadTodos } from "./todo.storage";


export const storageInit = () => {
    loadStates();
    loadTodos();
    console.log('Ghost initialized: 👻');
}
