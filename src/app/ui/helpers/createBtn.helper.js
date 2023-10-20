

export const createBtn = ( text, classes = '', eventCallBack = () => {} ) => {
    const btn = document.createElement('button');
    btn.className = `btn ${classes}`;
    btn.textContent = text;
    btn.addEventListener('click', eventCallBack);
    return btn;
}

