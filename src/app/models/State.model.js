

export class State{
    
    /**
     * 
     * @param {String} title 
     * @param {String} color 
     */
    constructor(title, color){
        this.id = Date.now() + Math.floor(Math.random() * 1000);
        this.title = title;
        this.color = color;
    }
}
