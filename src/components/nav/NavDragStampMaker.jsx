import React, { useCallback, useEffect, useRef, useState } from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import html2canvas from 'html2canvas';
import { DragPreviewImage, useDrag } from 'react-dnd';

const NavDragStampMaker = ({ setState }) => {
  const ref = useRef(null);
  const [imageSrc, setImageSrc] = useState('');

  const getImage = useCallback(async () => {
    const input = document.getElementById(`navAddStamp`);
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    setState((state) => ({
      ...state,
      stamp: imgData,
    }));
    setImageSrc(imgData);
  }, [imageSrc]);

  const [, drag, preview] = useDrag({
    type: 'STAMP',
    collect: (monitor) => ({ monitor }),
    item: (monitor) => {
      const rect = ref.current.getBoundingClientRect();
      return {
        id: `addStamp-`,
        type: 'addStamp',
        user: {},
        offset: {
          defaultPosition: {
            x: monitor.getClientOffset().x - rect.left,
            y: monitor.getClientOffset().y - rect.top,
          },
          position: {
            x: 0,
            y: 0,
          },
          value: '',
          width: 50,
          height: 50,
        },
        value: '',
      };
    },
  });
  const combinedRef = (node) => {
    drag(node);
    ref.current = node;
  };
  useEffect(() => {
    getImage();
  }, []);
  return (
    <div
      ref={combinedRef}
      id={'navAddStamp'}
      className={'w-[50px] h-[50px] flex items-center justify-center'}>
      <DragPreviewImage
        connect={preview}
        src={
          imageSrc ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmg6e5Sl03m4GcuRV9uTqrW6sMDPwqWfabIg&usqp=CAU'
        }
      />
      <RadioButtonCheckedIcon sx={{ color: 'red', fontSize: 40 }} />
    </div>
  );
};

export default NavDragStampMaker;
