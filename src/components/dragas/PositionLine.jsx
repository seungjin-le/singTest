import React, { Fragment } from 'react';

const PositionLine = ({ style, disable, size }) => {
  return (
    <Fragment>
      {disable ? (
        <Fragment>
          <span
            style={{ left: style?.left, top: style?.top }}
            className={
              'left-line absolute left-0 top-0  h-full w-[1px] translate-x-1 border-l-[2px] border-red-600 border-dotted z-5 translate-y-m50'
            }
          />
          <span
            style={{ left: style?.left + size?.x, top: style?.top }}
            className={
              'right-line absolute left-full top-0  h-full w-[1px] -translate-x-1 border-r-[2px] border-red-600 border-dotted z-5 translate-y-m50'
            }
          />
          <span
            style={{ top: style?.top }}
            className={
              'top-line absolute h-[1px] w-full left-0 translate-y-1 border-t-[2px] border-red-600 border-dotted z-5'
            }
          />
          <span
            style={{ top: style?.top + size?.y }}
            className={
              'bottom-line absolute h-[1px] w-full left-0 -translate-y-1 border-b-[2px] border-red-600 border-dotted z-5'
            }
          />
        </Fragment>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

export default PositionLine;
