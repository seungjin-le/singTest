import React, { useEffect, useState } from 'react';

const ImageTest = ({ children, stamp, setStamp }) => {
  const [size, setSize] = useState({ x: 200, y: 200 });
  const [boxPos, setBoxPos] = useState({ x: 100, y: 100 });

  const handler = (mouseDownEvent) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    const onMouseMove = (mouseMoveEvent) => {
      setSize((currentSize) => ({
        x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
        y: startSize.y - startPosition.y + mouseMoveEvent.pageY,
      }));
    };
    const onMouseUp = () => {
      document.body.removeEventListener('mousemove', onMouseMove);
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };

  const handler2 = (mouseDownEvent) => {
    const startPos = boxPos;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    const onBoxMove = (mouseMoveEvent) => {
      setBoxPos((currentSize) => ({
        x: startPos.x - startPosition.x + mouseMoveEvent.pageX,
        y: startPos.y - startPosition.y + mouseMoveEvent.pageY,
      }));
    };
    const onMouseUp = () =>
      document.body.removeEventListener('mousemove', onBoxMove);
    document.body.addEventListener('mousemove', onBoxMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };
  const deleteHandler = (mouseDownEvent) => {
    setStamp('');
  };
  return (
    <div className={'w-[600px] h-[600px] bg-sky-100 mt-4'}>
      <div className={'text-center mt-1'}>계약서</div>
      {stamp && (
        <div
          id="container"
          style={{
            width: size.x,
            height: size.y,
            left: boxPos.x,
            top: boxPos.y,
            backgroundImage: `url(${stamp})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
          className={
            'relative border-2 border-amber-800 min-w-[100px] min-h-[100px]'
          }>
          <button
            id="draghandle"
            type="button"
            onMouseDown={handler}
            className={
              'absolute bottom-0 right-0 translate-x-p50 translate-y-p50 w-[12px] h-[12px] bg-red-600 rounded-full z-10'
            }
          />

          <button
            id="pos"
            type="button"
            onMouseDown={handler2}
            className={
              'absolute bottom-1/2 right-1/2 translate-x-p50 translate-y-p50 border-2 border-red-600 p-2 w-full h-full'
            }
          />
          <button
            id="delete"
            type="button"
            onClick={deleteHandler}
            className={
              'absolute p-2 px-4 top-0 left-full translate-x-m50 translate-y-m50 bg-red-400 rounded-full'
            }>
            x
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageTest;
