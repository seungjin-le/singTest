import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import html2canvas from 'html2canvas';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
};

function getItemStyles(currentOffset) {
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

const NavDragaInputText = ({ setState }) => {
  const ref = useRef(null);
  const [imageSrc, setImageSrc] = useState('');

  const getImage = useCallback(async () => {
    const input = document.getElementById(`navTextArea`);
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    setState((state) => ({
      ...state,
      textArea: imgData,
    }));
    setImageSrc(imgData);
  }, [imageSrc]);

  const [collected, drag, preview] = useDrag({
    type: 'TEXTAREA',
    collect: (monitor) => ({ monitor }),
    item: (monitor, item) => {
      const rect = ref.current.getBoundingClientRect();

      return {
        id: `textArea-`,
        type: 'textArea',
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
          width: 200,
          height: 50,
          fontSet: {
            fontSize: '14px',
            textAlign: 'left',
            color: '#000000',
            fontWeight: '400',
          },
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
    <Fragment>
      <div
        className={
          ' flex items-center justify-center box-border focus:bg-red-400 p-1 z-10 w-full relative'
        }>
        <DragPreviewImage
          connect={preview}
          src={
            imageSrc ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmg6e5Sl03m4GcuRV9uTqrW6sMDPwqWfabIg&usqp=CAU'
          }
        />

        <textarea
          ref={combinedRef}
          id={'navTextArea'}
          className={
            'resize-none p-2 rounded-[5px] w-[200px] h-[50px] disabled:bg-[#fff] top-0 absolute translate-x-m100'
          }
          style={{ opacity: collected.isDragging ? 0.5 : 1 }}
          disabled
        />
      </div>
    </Fragment>
  );
};

export default memo(NavDragaInputText);
