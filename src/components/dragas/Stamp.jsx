import React, { Fragment, useState } from 'react';

const Stamp = ({ stamp, setStamp }) => {
  const [size, setSize] = useState({ x: 200, y: 200 });
  const [boxPos, setBoxPos] = useState({ x: 100, y: 100 });
  const [active, setActive] = useState(false);
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
    <Fragment>
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
          onMouseOver={() => setActive(true)}
          onMouseOut={() => setActive(false)}
          className={
            'absolute min-w-[100px] min-h-[100px] cursor-pointer hover:border-amber-800 hover:border-2 z-5'
          }>
          {active && (
            <Fragment>
              <button
                id="draghandle"
                type="button"
                onMouseDown={handler}
                className={
                  'absolute bottom-0 right-0 translate-x-p50 translate-y-p50 w-[12px] h-[12px] bg-red-600 rounded-full'
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
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Stamp;
