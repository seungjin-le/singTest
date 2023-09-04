import React, { Fragment } from 'react';

const DragReSizing = ({ reSizing, onDelete, item }) => {
  return (
    <Fragment>
      <span
        className={
          'absolute w-3 h-3 bg-[red] top-full left-full -translate-x-[90%] -translate-y-[90%] rounded-full cursor-pointer z-20'
        }
        onMouseDown={reSizing}
      />
      <button
        onClick={(e) => {
          e.stopPropagation();

          onDelete(item?.id);
        }}
        className={
          'absolute left-full top-0 px-2 bg-red-400 rounded-full flex items-center justify-center translate-x-m50 translate-y-m50 z-20'
        }>
        x
      </button>
    </Fragment>
  );
};

export default DragReSizing;
