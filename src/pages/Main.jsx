import React, { useEffect, useState } from 'react';
import Nav from '../components/nav/Nav';
import Content from '../components/content/Content';
import { useParams } from 'react-router-dom';

const Main = () => {
  const params = useParams();
  const [stamp, setStamp] = useState('');

  const handleSetStamp = (stamp) => {
    console.log(stamp);
    setStamp(stamp);
  };
  return (
    <div className={'w-full h-full flex flex-row'}>
      <Nav params={params} setStamp={handleSetStamp} />
      <Content params={params} stamp={stamp} />
    </div>
  );
};

export default Main;
