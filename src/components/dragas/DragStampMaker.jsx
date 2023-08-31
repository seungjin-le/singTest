import React, { Fragment, useCallback, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import DragReSizing from './DragReSizing';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import MakerLine from '../dragPositionLine/MakerLine';
import { Tooltip } from '@mui/material';

const DragStampMaker = ({ item, setState, style, onDelete, mode }) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
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
        changeSize = { x: Math.max(newX, 40), y: Math.max(newY, 40) };
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

  return (
    <Fragment>
      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos(data)}
        onStart={() => setOpacity(true)}
        onStop={handleEnd}
        bounds={'parent'}
        disabled={mode}
        position={position}
        defaultClassName={'z-10'}>
        <div
          ref={nodeRef}
          className="box box-border h-auto flex items-center justify-center"
          style={{
            opacity: Opacity ? '0.6' : '1',
            ...style,
            width: size.x,
            height: size.x,
          }}
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}>
          {item.value ? (
            <img
              src={item?.value}
              alt=""
              style={{
                width: size.x,
                height: size.y,
                userSelect: 'none',
              }}
              draggable={false}
            />
          ) : (
            <Fragment>
              <span className={'absolute left-1/2 bottom-full z-[0]'}>
                <Tooltip
                  title={`${item?.info?.name}님의 사인/도장`}
                  arrow
                  open={true}
                  placement={'top'}
                  sx={{ zIndex: 0 }}
                />
              </span>
              <RadioButtonCheckedIcon
                sx={{ color: 'gray', fontSize: size.x, marginRight: 0 }}
              />
            </Fragment>
          )}
          {mouseOver && !mode && (
            <Fragment>
              <DragReSizing
                reSizing={handlerReSizing}
                onDelete={onDelete}
                item={item}
              />
            </Fragment>
          )}
        </div>
      </Draggable>

      {!mode && (
        <MakerLine
          item={item}
          disable={mouseOver}
          size={{
            x: size.x,
            y: size.x,
          }}
          position={position}
        />
      )}
    </Fragment>
  );
};

export default DragStampMaker;
