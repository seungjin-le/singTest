import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import html2canvas from 'html2canvas';

const NavDragaCheckBox = ({ style, index, onDelete, item, setState }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({ x: 25, y: 25 });
  const [mouseOver, setMouseOver] = useState(false);

  const getImage = useCallback(async () => {
    const input = document.getElementById(`navCheckBox`);
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    setState((state) => ({
      ...state,
      checkBox: imgData,
    }));
  }, [setState]);
  const [{ isDragging }, drag] = useDrag({
    type: 'CHECKBOX',
    item: (monitor, item) => {
      const rect = ref.current.getBoundingClientRect();
      return {
        id: `checkBox-`,
        type: 'checkBox',
        offset: {
          defaultPosition: {
            x: monitor.getClientOffset().x - rect.left,
            y: monitor.getClientOffset().y - rect.top,
          },
          position: {
            x: 0,
            y: 0,
          },
          width: size.x,
          height: size.y,
        },
        value: '',
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
        style={{
          ...style,
        }}
        className={
          'flex items-center justify-center m-0 p-0 min-w-[25px] min-h-[25px] z-5 '
        }>
        <CustomCheckbox
          ref={combinedRef}
          id={'navCheckBox'}
          type="checkbox"
          className={
            'min-h-[25px] min-w-[25px]  cursor-pointer overflow-hidden'
          }
          checked={false}
          style={{
            width: size.x,
            height: size.y,
          }}
        />
      </div>
    </Fragment>
  );
};

export default memo(NavDragaCheckBox);

const CustomCheckbox = styled.input`
  margin: 0;
  border: 0;
  box-sizing: border-box;
  &:hover {
    box-shadow: none;
  }
  &:focus {
    box-shadow: none;
  }
  &:active {
    box-shadow: none;
  }
`;
