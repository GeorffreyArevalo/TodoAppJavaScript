import { App } from './src/app/models/App.model'
import { storageInit } from './src/storage/storage.storage';
import './style.scss'

const app = new App('#app');
storageInit();
app.renderHtml();
