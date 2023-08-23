import React, { Fragment } from 'react';

const PostionLine = ({ style, disable = false, size }) => {
  return (
    <Fragment>
      {disable ? (
        <Fragment>
          <span
            style={{ left: style?.left }}
            className={
              'left-line absolute left-0 top-0  h-full w-[1px] translate-x-1 border-l-[2px] border-red-600 border-dotted'
            }
          />
          <span
            style={{ left: style?.left + size.x }}
            className={
              'right-line absolute left-full top-0  h-full w-[1px] -translate-x-1 border-r-[2px] border-red-600 border-dotted'
            }
          />
          <span
            style={{ top: style?.top }}
            className={
              'top-line absolute left-full left-0  h-[1px] w-full translate-y-1 border-t-[2px] border-red-600 border-dotted'
            }
          />
          <span
            style={{ top: style?.top + size.y }}
            className={
              'bottom-line absolute left-full left-0  h-[1px] w-full -translate-y-1 border-b-[2px] border-red-600 border-dotted'
            }
          />
        </Fragment>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

export default PostionLine;
