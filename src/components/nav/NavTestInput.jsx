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

const NavTestInput = () => {
  const { itemType, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  const renderItem = () => {
    switch (itemType) {
      case 'TEXTAREA':
        return <TextArea />;
      case 'DIV':
        return (
          <RadioButtonCheckedIcon
            sx={{ color: 'gray', fontSize: 50, marginRight: 0 }}
          />
        );
      case 'CHECKBOX':
        return <CheckBox type={'checkbox'} />;
      default:
        return null;
    }
  };

  if (!isDragging) return null;

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(currentOffset)}>{renderItem()}</div>
    </div>
  );
};

export default NavTestInput;

const TextArea = styled.textarea`
  resize: none;
  white-space: pre-wrap;
  overflow: hidden;
  overflow-wrap: break-word;
  display: block;
  z-index: 10;
  box-sizing: content-box;
  padding: 0;
  border: none;
  background: rgba(255, 255, 255, 0.7);
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
