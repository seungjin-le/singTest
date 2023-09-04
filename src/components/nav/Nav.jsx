import React, { useState } from 'react';
import StampTabs from '../tabs/StampTabs';
import NavDragaForm from './NavDragaForm';
import NavDragItems from './NavDragItems';

const testData = [
  {
    type: 'admin',
    email: 'leeseungjin@naver.com',
    name: '이승진',
  },
  {
    type: 'user',
    email: 'bibibig@naver.com',
    name: '김빅빅',
  },
  {
    type: 'user',
    email: 'lebibi@naver.com',
    name: '이빅빅',
  },
  {
    type: 'user',
    email: 'Parkbibi@naver.com',
    name: '박빅빅',
  },
];

const Nav = ({ params, setStamp }) => {
  return (
    <div
      id={'signNavLayout'}
      className="w-full h-full max-w-[400px] flex flex-col items-center justify-start p-8 bg-sky-100 overflow-scroll overflow-x-hidden z-5">
      {params?.name && (
        <div className="w-full flex flex-col items-center justify-center">
          <div className={'text-3xl my-6 '}>도장</div>
          <StampTabs name={params?.name} setStamps={setStamp} />
        </div>
      )}
      {testData.map((item, index) => {
        return (
          (!params?.name || item?.name === params?.name) && (
            <NavDragaForm item={item} key={index} />
          )
        );
      })}
      <NavDragItems />
    </div>
  );
};

export default Nav;
