import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Draggable from 'react-draggable';
import DragReSizing from './DragReSizing';
import DefaultPositionLine from '../dragPositionLine/DefaultPositionLine';

const DragStamp = ({ style, onDelete, item, setState, mode }) => {
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
  const handlerReSizing = useCallback(
    (mouseDownEvent) => {
      mouseDownEvent.stopPropagation();
      let changeSize = {};
      const startPosition = {
        x: mouseDownEvent.pageX,
        y: mouseDownEvent.pageY,
      };

      const onMouseMove = (mouseMoveEvent) => {
        const newX = size.x - startPosition.x + mouseMoveEvent.pageX;
        const newY = size.y - startPosition.y + mouseMoveEvent.pageY;
        changeSize = {
          x: Math.min(Math.max(newX, 50), 150),
          y: Math.min(Math.max(newY, 50), 150),
        };
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
    },
    [item, setState]
  );
  useEffect(() => {
    setInputValue(item.offset.value || []);
  }, [item]);

  return (
    <Fragment>
      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos(data)}
        onStart={() => setOpacity(true)}
        onStop={handleEnd}
        bounds={'parent'}
        position={position}
        disabled={mode}
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
          className={`flex flex-col items-center justify-center   cursor-pointer`}>
          {item.offset.shapeType !== 3 ? (
            <span
              className={`${style} border-4 font-bold border-red-600 flex text-center p-0  z-10 text-[red] text-3xl flex-1 ${stampShape(
                item?.offset.shapeType
              )}`}>
              {inputValue?.map((name) => (
                <span
                  className={`${
                    item?.offset.shapeType !== 0 && 'block w-[25px] h-[25px]'
                  }`}>
                  {name}
                </span>
              ))}
              {item?.offset.shapeType !== 0 && (
                <span className={`block w-[25px] h-[25px]`}>인</span>
              )}
            </span>
          ) : (
            <img src={inputValue} alt={'sign'} className={'w-full'} />
          )}
          {mouseOver && !mode && (
            <DragReSizing
              reSizing={handlerReSizing}
              onDelete={onDelete}
              item={item}
            />
          )}
        </div>
      </Draggable>
      {mouseOver && !mode && (
        <Fragment>
          <DefaultPositionLine
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

export default memo(DragStamp);
