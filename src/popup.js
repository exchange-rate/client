import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';
import './styles/main.sass';

const appEl = document.getElementById('app');

document.body.style.opacity = 0;
document.body.style.transition = 'opacity ease-out .4s';

// Work around https://bugs.chromium.org/p/chromium/issues/detail?id=428044
function onReady() {
	requestAnimationFrame(() => {
		document.body.style.opacity = 1;
		document.body.style.width = '100px';
		document.body.style.width = '';
	});
}

document.addEventListener('DOMContentLoaded', onReady);
window.onload = onReady;

ReactDOM.render(<Popup/>, appEl, onReady);
