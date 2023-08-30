import Content from './components/content/Content';
import Nav from './components/nav/Nav';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={'w-full h-full flex flex-row'}>
        <Nav />
        <Content />
      </div>
    </DndProvider>
  );
}

export default App;
