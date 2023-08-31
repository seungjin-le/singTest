import React, { Fragment } from 'react';

const DefaultPositionLine = ({ item, disable, size, position }) => {
  return (
    <Fragment>
      {disable ? (
        <Fragment>
          <span
            style={{
              top: item?.offset?.defaultPosition?.y + position.y - 0.5,
            }}
            className={`topLine absolute border-[1px] border-[red] w-full h-0 left-0 border-dotted z-5`}
          />
          <span
            style={{
              top: item?.offset?.defaultPosition?.y + position.y + size?.y - 1,
            }}
            className={`bottomLine absolute border-[1px] border-[red] w-full h-0 left-0 border-dotted z-5`}
          />
          <span
            style={{
              left: item?.offset?.defaultPosition?.x + position.x - 0.5,
            }}
            className={`leftLine absolute border-[1px] border-[red] w-0 h-full left-0 top-0 border-dotted z-5`}
          />
          <span
            style={{
              left: item?.offset?.defaultPosition?.x + position.x + size?.x - 1,
            }}
            className={`rightLine absolute border-[1px] border-[red] w-0 h-full left-0 top-0 border-dotted z-5`}
          />
        </Fragment>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

export default DefaultPositionLine;
