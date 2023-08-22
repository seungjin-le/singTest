import React from 'react';

const Nav = ({ onClick }) => {
  const test = ['홍', '길', '동'];
  const test2 = ['홍', '길', '동', '인'];

  return (
    <div
      className={
        'w-full h-full max-w-[400px]  flex flex-col items-center justify-start p-8  bg-sky-100'
      }>
      <div className={'w-full flex flex-col items-center'} onClick={onClick}>
        <div className={'text-2xl mb-4'}>모양</div>
        <div
          className={
            'w-full flex flex-row items-start justify-between text-2xlt font-bold text-red-600 '
          }>
          <div className={'flex flex-col '}>
            <span className={'text-black'}>타원</span>
            <span
              onClick={onClick}
              className={
                'border-4 border-red-600 rounded-[40px/100px] text-center p-3 flex flex-col'
              }>
              {test.map((item) => (
                <span>{item}</span>
              ))}
            </span>
          </div>
          <div className={'flex flex-col '}>
            <span className={'text-black'}>원</span>
            <span
              onClick={onClick}
              className={
                'border-4 border-red-600 w-[90px] h-[90px] text-center p-3 rounded-full flex flex-row flex-wrap items-center justify-center'
              }>
              {test2.map((item) => (
                <span className={'m-1'}>{item}</span>
              ))}
            </span>
          </div>
          <div className={'flex flex-col '}>
            <span className={'text-black'}>사각형</span>

            <span
              onClick={onClick}
              className={
                'border-4 border-red-600 w-[90px] h-[90px] text-center p-3 flex flex-row flex-wrap items-center justify-center'
              }>
              {test2.map((item) => (
                <span className={'m-1'}>{item}</span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
