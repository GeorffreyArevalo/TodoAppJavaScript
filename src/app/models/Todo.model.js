
export class Todo {

    /**
     * 
     * @param {String} title 
     * @param {Number} expirationDate 
     * @param {Number} idState 
     */
    constructor(title, expirationDate, idState){
        this.id = Date.now();
        this.title = title;
        this.expirationDate = expirationDate;
        this.idState = idState;
    }
}

