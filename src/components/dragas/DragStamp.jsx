import React, { Fragment, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import DragReSizing from './DragReSizing';
import PositionLine from './PositionLine';

const DragStamp = ({ style, onDelete, item, setState }) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const [Opacity, setOpacity] = useState(false);
  const [inputValue, setInputValue] = useState(item.offset.value || []);
  const [position, setPosition] = useState(item.offset.position);
  const [size, setSize] = useState({
    x: item.offset.width || 80,
    y: item.offset.height || 80,
  });

  const stampShape = (type) => {
    return type === 0
      ? 'rounded-[40px/100px] flex-col p-1'
      : type === 1
      ? 'rounded-full flex-row flex-wrap items-center justify-center flex-1 max-w-[80px] min-h-[80px] p-2 pb-3 pt-1'
      : 'rounded-[0] flex-row flex-wrap items-center justify-center  flex-1 max-w-[70px] min-h-[70px] p-1 pb-2 pt-0';
  };

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleEnd = () => {
    setOpacity(false);
    setState((prev) => {
      return prev.map((data) =>
        data.id === item.id
          ? {
              ...data,
              offset: { ...data.offset, position: position },
            }
          : data
      );
    });
  };
  const handlerReSizing = (mouseDownEvent) => {
    mouseDownEvent.stopPropagation(); // 추가: 상위 요소로의 이벤트 전파를 중지합니다.
    let changeSize = {};
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
    const onMouseMove = (mouseMoveEvent) => {
      mouseMoveEvent.preventDefault();

      const deltaX = mouseMoveEvent.pageX - startPosition.x;
      const deltaY = mouseMoveEvent.pageY - startPosition.y;

      const maxDelta = Math.max(Math.abs(deltaX), Math.abs(deltaY));
      const directionX = deltaX >= 0 ? 1 : -1;
      const newSize = startSize.x + directionX * maxDelta;
      changeSize = { x: Math.max(newSize, 80), y: Math.max(newSize, 80) };

      setSize(changeSize);
    };
    const onMouseUp = () => {
      setState((prev) => {
        return prev.map((data) =>
          data.id === item.id
            ? {
                ...data,
                offset: {
                  ...data.offset,
                  width: changeSize.x,
                  height: changeSize.y,
                },
              }
            : data
        );
      });
      document.body.removeEventListener('mousemove', onMouseMove);
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp, { once: true });
  };

  return (
    <Fragment>
      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos(data)}
        onStart={() => setOpacity(true)}
        onStop={handleEnd}
        position={position}
        defaultClassName={'z-10'}>
        <div
          ref={nodeRef}
          style={{
            opacity: Opacity ? '0.6' : '1',
            ...style,
            width: size.x,
            height: size.y,
          }}
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}
          className={`flex flex-col items-center justify-center  mb-2 mr-2 cursor-pointer`}>
          <span
            className={`${style} border-4 font-bold border-red-600 flex text-center p-0  z-10 text-[red] text-3xl flex-1 ${stampShape(
              item?.offset.type
            )}`}>
            {inputValue?.map((name) => (
              <span
                className={`${
                  item?.offset.type !== 0 && 'block w-[25px] h-[25px]'
                }`}>
                {name}
              </span>
            ))}
            {item?.offset.type !== 0 && (
              <span className={`block w-[25px] h-[25px]`}>인</span>
            )}
          </span>
        </div>
      </Draggable>
      {mouseOver && (
        <Fragment>
          <DragReSizing
            reSizing={handlerReSizing}
            onDelete={onDelete}
            item={item}
          />
          <PositionLine
            item={item}
            disable={mouseOver}
            size={size}
            position={position}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default DragStamp;

//  // className={
//           //   'absolute min-w-[50px] min-h-[50px] cursor-pointer hover:border-amber-800 hover:border-2 z-5'
//           // }>
//           // {inputValue?.map((name) => (
//           //   <span
//           //     className={`${style} border-4 font-bold border-red-600 flex text-center p-0  z-10 text-[red] text-3xl flex-1`}>
//           //     {name}
//           //   </span>
//           // ))}
