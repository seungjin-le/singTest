import React from 'react';
import StampTabs from '../tabs/StampTabs';
import NavDragaForm from './NavDragaForm';
import NavDragItems from './NavDragItems';
import { useLocation } from 'react-router-dom';

const testData = [
  {
    type: 'admin',
    email: 'leeseungjin@naver.com',
    name: '이승진',
  },
  {
    type: 'user',
    email: 'bibibig@naver.com',
    name: '이순신',
  },
  {
    type: 'user',
    email: 'lebibi@naver.com',
    name: '홍길동',
  },
  {
    type: 'user',
    email: 'Parkbibi@naver.com',
    name: '최배달',
  },
];

const Nav = ({ setStamp }) => {
  const { state } = useLocation();
  return (
    <div
      id={'signNavLayout'}
      className="w-full h-full max-w-[400px] flex flex-col items-center justify-start p-8 bg-sky-100 overflow-auto overflow-x-hidden z-5">
      {state?.role !== 'admin' && state?.name && (
        <div className="w-full flex flex-col items-center justify-center">
          <div className={'text-3xl my-6 '}>도장</div>
          <StampTabs name={state?.name} setStamps={setStamp} />
        </div>
      )}
      {testData.map((item, index) => {
        return (
          state?.name &&
          (state.role === 'admin' || item?.name === state?.name) && (
            <NavDragaForm item={item} key={index} />
          )
        );
      })}
      <NavDragItems />
    </div>
  );
};

export default Nav;
