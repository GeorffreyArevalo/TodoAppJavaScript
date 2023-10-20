
/**
 * 
 * @param {HTMLElement} element 
 */
export const clearElementHtml = ( element ) => {
    while(element.firstElementChild){
        element.removeChild(element.firstElementChild);
    }
}
