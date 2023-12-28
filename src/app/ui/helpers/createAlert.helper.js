

export const createAlert = ( text, color ) => {

    const div = document.createElement('div');
    div.textContent = text;
    div.className = `alert alert--${color}`;
    document.querySelector('#app').append(div);
    setTimeout(() => {
        div.remove();
    }, 2000);
}
