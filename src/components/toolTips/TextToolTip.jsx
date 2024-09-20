const TextToolTip = ({ item = '', description = '' }) => {
  return (
    <div
      className={
        'absolute left-1/2 -translate-x-1/2  bottom-full -translate-y-[15px] z-0 bg-[gray] text-[black] w-auto text-nowrap  rounded-md'
      }>
      <div className={'text-center w-full h-full px-[10px] py-[5px] relative'}>
        {`${item?.info?.name}님의 ${description}`}
        <div
          className={
            'absolute left-1/2 -translate-x-1/2  rotate-45 top-full -translate-y-1/2 w-[10px] h-[10px] bg-[gray]'
          }
        />
      </div>
    </div>
  );
};

export default TextToolTip;
