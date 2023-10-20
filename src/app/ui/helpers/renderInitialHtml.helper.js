
/**
 * 
 * @param {String} element 
 * @param {any} html 
 */
export const renderInitialHtml = (element, html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    document.querySelector(element).append(div);
}
