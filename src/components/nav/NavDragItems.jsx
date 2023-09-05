import React from 'react';
import { useDragLayer } from 'react-dnd';
import styled from 'styled-components';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 1000,
  left: 0,
  top: 0,
};

function getItemStyles(initialOffset, currentOffset, item) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  let { x, y } = currentOffset;
  if (item.type === 'stampMaker') {
    x -= 25;
    y -= 25;
  }
  const transform = `translate(${x + item.offset.defaultPosition.x}px, ${
    y + item.offset.defaultPosition.y
  }px)`;

  return {
    transform,
    WebkitTransform: transform,
  };
}

const NavDragItems = () => {
  const { itemType, isDragging, currentOffset, initialOffset, item } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      isDragging: monitor.isDragging(),
      currentOffset: monitor.getSourceClientOffset(),
    }));

  const renderItem = () => {
    switch (itemType) {
      case 'TEXTAREA':
        return <TextArea $infoType={item?.info?.type === 'user'} />;
      case 'DIV':
        return (
          <RadioButtonCheckedIcon
            sx={{ color: 'black', fontSize: 50, marginRight: 0 }}
          />
        );
      case 'CHECKBOX':
        return <CheckBox type={'checkbox'} />;
      case 'INPUTIMAGE':
        return (
          <InputImage>
            <label className="picture" htmlFor="picture__input" tabIndex="0">
              <span className="picture__image" />
            </label>
            <input type="file" name="picture__input" id="picture__input" />
          </InputImage>
        );
      default:
        return null;
    }
  };

  if (!isDragging) return null;
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset, item)}>
        {renderItem()}
      </div>
    </div>
  );
};

export default NavDragItems;

const TextArea = styled.textarea`
  resize: none;
  width: 200px;
  height: 18px;
  white-space: pre-wrap;
  overflow: hidden;
  overflow-wrap: break-word;
  display: block;
  z-index: 10;
  box-sizing: content-box;
  padding: 0;
  border: none;
  background: ${({ $infoType }) =>
    $infoType ? 'rgba(255, 252, 127, 0.7)' : 'rgba(255, 255, 255, 0.7)'};
  letter-spacing: 0;
  word-break: break-all;
  outline: 1px dashed black;
  &:focus {
    outline: none;
  }
`;

const CheckBox = styled.input`
  width: 25px;
  height: 25px;
`;

const InputImage = styled.span`
  width: 200px;
  height: 100px;
  #picture__input {
    display: none;
  }

  .picture {
    width: 200px;
    aspect-ratio: 16/9;
    background: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aaa;
    border: 2px dashed currentcolor;
    cursor: pointer;
    font-family: sans-serif;
    transition:
      color 300ms ease-in-out,
      background 300ms ease-in-out;
    outline: none;
    overflow: hidden;
  }

  .picture:hover {
    color: #777;
    background: #ccc;
  }

  .picture:active {
    border-color: turquoise;
    color: turquoise;
    background: #eee;
  }

  .picture:focus {
    color: #777;
    background: #ccc;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .picture__img {
    max-width: 100%;
  }
`;
