import React, { Fragment, memo } from 'react';

const DragReSizing = ({ reSizing, onDelete, item }) => {
  return (
    <Fragment>
      {reSizing && (
        <span
          className={
            'absolute w-3 h-3 bg-[red] top-full left-full -translate-x-[50%] -translate-y-[50%] rounded-full cursor-pointer z-20'
          }
          onMouseDown={reSizing}
        />
      )}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item?.id);
          }}
          className={
            'absolute left-full top-0 px-2 bg-red-400 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 z-50'
          }>
          x
        </button>
      )}
    </Fragment>
  );
};

export default memo(DragReSizing);
