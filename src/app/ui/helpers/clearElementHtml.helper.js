
/**
 * 
 * @param {HTMLElement} element 
 */
export const clearElementHtml = ( element ) => {
    while(element && element.firstElementChild){
        element.removeChild(element.firstElementChild);
    }
}
