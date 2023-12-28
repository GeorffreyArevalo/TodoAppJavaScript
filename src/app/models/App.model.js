
import { addSubmittedFormTodo, renderInitialHtml, renderSelectFormTodo, renderStatesHelper, renderTodosHelper } from "../ui/helpers";
import header from "../ui/header/header.html?raw";
import panel from "../ui/panel/panel.html?raw";
import formTodo from "../ui/todo/todo.html?raw";

export class App{

    /**
     * 
     * @param {String} idInitial 
     */
    constructor(idInitial){
        this.idInitial = idInitial;
    }

    renderHtml(){
        renderInitialHtml(this.idInitial, header);
        renderInitialHtml(this.idInitial, formTodo);
        renderInitialHtml(this.idInitial, panel);
        this.renderSelect();
        this.renderStates();
        this.renderTodos();
    }
    
    renderStates(){
        renderStatesHelper();
    }

    renderTodos(){
        renderTodosHelper();
    }

    renderSelect(){
        renderSelectFormTodo();
        addSubmittedFormTodo();
    }

}
