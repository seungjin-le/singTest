import React, { Fragment } from 'react';

const MakerLine = ({ item, disable, position, size }) => {
  return (
    <Fragment>
      {disable ? (
        <Fragment>
          <span
            style={{
              top:
                item?.offset?.defaultPosition?.y +
                position.y -
                0.5 +
                size.y / 2,
            }}
            className={`XLine absolute border-[1px] border-[red] w-full h-0 left-0 border-dotted z-5`}
          />

          <span
            style={{
              left:
                item?.offset?.defaultPosition?.x +
                position.x -
                0.5 +
                size.y / 2,
            }}
            className={`YLine absolute border-[1px] border-[red] w-0 h-full left-0 top-0 border-dotted z-5`}
          />
        </Fragment>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

export default MakerLine;
