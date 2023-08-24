import Content from './components/content/Content';
import Nav from './components/nav/Nav';
import React, { useState } from 'react';
import domtoimage from 'dom-to-image';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GlobalStyled from './styles/GlobalStyled';

function App() {
  const [stamp, setStamp] = useState('');
  const onDownloadBtn = ({ target }) => {
    domtoimage.toBlob(target).then((blob) => {
      // saveAs(blob, 'card.png');
      setStamp(window.URL.createObjectURL(blob));
      const canvas = document.getElementById('signCanvas');
      const ctx = canvas.getContext('2d');

      // 픽셀 정리
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 컨텍스트 리셋
      ctx.beginPath();
    });
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalStyled />
      <div className={'w-full h-full flex flex-row'}>
        <Nav onClick={onDownloadBtn} />

        <Content stamp={stamp} setStamp={setStamp} onClick={onDownloadBtn} />
      </div>
    </DndProvider>
  );
}

export default App;
