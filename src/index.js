import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/tailwind.css';
import GlobalStyled from './styles/GlobalStyled';
import { BrowserRouter } from 'react-router-dom';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <DndProvider backend={HTML5Backend}>
      <GlobalStyled />
      <App />
    </DndProvider>
  </BrowserRouter>
);
