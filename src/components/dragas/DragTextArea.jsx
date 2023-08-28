import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Draggable from 'react-draggable';
import ToolTip from './ToolTip';
import PositionLine from './PositionLine';
import DragReSizing from './DragReSizing';

const DragTextArea = ({ item, setState, onChange, style, onDelete }) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const [inputValue, setInputValue] = useState(item.value);
  const [position, setPosition] = useState(item.offset.position);
  const [size, setSize] = useState({
    x: item.offset.width || 200,
    y: item.offset.height || 50,
  });

  const [Opacity, setOpacity] = useState(false);
  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleEnd = useCallback(() => {
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
  }, [item, position, setState]);

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
        changeSize = { x: Math.max(newX, 100), y: Math.max(newY, 25) };
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

  const handlerTextAreaOnBlur = useCallback(
    ({ target: { value } }) => {
      setState((prev) => {
        return prev.map((data) =>
          data.id === item.id
            ? {
                ...data,
                value: inputValue,
              }
            : data
        );
      });
    },
    [item, inputValue]
  );

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
          className="box box-border h-auto p-[1px] rounded-[5px] flex items-center justify-center"
          style={{
            opacity: Opacity ? '0.6' : '1',
            ...style,
            width: size.x,
            height: size.y,
          }}
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}>
          <textarea
            className={
              'resize-none p-2 rounded-[5px] w-60px h-full z-20 box-border whitespace-nowrap overflow-hidden'
            }
            onBlur={handlerTextAreaOnBlur}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              fontSize: item?.fontSet?.fontSize,
              textAlign: item?.fontSet?.textAlign,
              color: item?.fontSet?.color,
              fontWeight: item?.fontSet?.fontWeight,
              width: size.x - 2,
              height: size.y - 2,
            }}
          />
          {mouseOver && (
            <Fragment>
              <DragReSizing
                reSizing={handlerReSizing}
                onDelete={onDelete}
                item={item}
              />
              <ToolTip item={item} onChange={onChange} />
            </Fragment>
          )}
        </div>
      </Draggable>
      <PositionLine
        item={item}
        disable={mouseOver}
        size={size}
        position={position}
      />
    </Fragment>
  );
};

export default memo(DragTextArea);
