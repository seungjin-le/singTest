import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Draggable from 'react-draggable';
import ToolTip from '../toolTips/ToolTip';
import DefaultPositionLine from '../dragPositionLine/DefaultPositionLine';
import DragReSizing from './DragReSizing';
import styled from 'styled-components';

const DragTextArea = ({ item, setState, onChange, style, onDelete, mode }) => {
  const nodeRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);
  const [showPosLine, setShowPosLine] = useState(false);
  const [inputValue, setInputValue] = useState(item.value);
  const [inputFocus, setInputFocus] = useState(false);
  const inputRef = useRef(null);
  const [position, setPosition] = useState(item.offset.position);
  const [size, setSize] = useState({
    x: item.offset.width || 200,
    y: item.offset.height || 50,
  });
  const [Opacity, setOpacity] = useState(false);

  // Component 사이즈 업데이트
  const updateSize = useCallback(
    (newWidth, newHeight) => {
      setState((prev) => {
        return prev.map((data) =>
          data.id === item.id
            ? {
                ...data,
                offset: {
                  ...data.offset,
                  width: newWidth,
                  height: newHeight,
                },
              }
            : data
        );
      });
      setSize({
        x: newWidth,
        y: newHeight,
      });
    },
    [size]
  );

  // Component Dragging
  const handleInputDrag = useCallback(
    (data) => {
      setPosition({ x: data.x, y: data.y });
      const { x, y } = position;
      if (data.x === x && data.y === y) return;
      setOpacity(true);
      setInputFocus(false);
      setShowPosLine(true);
      setMouseOver(true);
    },
    [position]
  );

  // Component Dragging End
  const handleEnd = useCallback(() => {
    const { x, y } = item.offset.position;
    setMouseOver(false);
    if (x === position.x && y === position.y) return;
    inputRef.current.blur();
    setShowPosLine(false);
    setOpacity(false);
    setState((prev) => {
      return prev.map((data) =>
        data.id === item.id
          ? {
              ...data,
              offset: { ...data.offset, position: position },
            }
          : data
      );
    });
  }, [item, position, setState]);

  // textarea의 내용 높이를 반환하는 함수.
  const getContentHeight = useCallback(
    (textArea) => {
      // textarea 엘리먼트의 클론 div룰 생성
      const clone = document.createElement('div');
      // 클론의 너비, 패딩, 폰트, whiteSpace, wordWrap 등 textArea와 같도록 설정.
      clone.style.width = textArea.offsetWidth + 'px';
      clone.style.padding = getComputedStyle(textArea).padding;
      clone.style.font = getComputedStyle(textArea).font;
      clone.style.whiteSpace = 'pre';
      clone.style.wordWrap = 'break-word';
      clone.style.visibility = 'hidden';
      // 클론을 문서의 body에 추가.
      document.body.appendChild(clone);
      // 클론의 텍스트 콘텐츠를 textarea의 값으로 설정.
      clone.textContent = textArea.value;
      // 클론의 오프셋 높이를 저장. 이것이 콘텐츠의 높이
      const contentHeight = clone.offsetHeight;
      // 클론을 문서의 body에서 제거.
      document.body.removeChild(clone);
      // 콘텐츠의 높이를 반환.
      return contentHeight;
    },
    [item.offset, item.fontSet, inputValue]
  );

  // textarea의 내용 너비를 반환하는 함수.
  const getContentWidth = useCallback(
    (textArea) => {
      // textarea 엘리먼트의 클론을 생성합니다.
      const clone = document.createElement('span');
      // 클론의 폰트, whiteSpace 등 textArea와 같도록 설정.
      clone.style.font = getComputedStyle(textArea).font;
      clone.style.whiteSpace = 'pre';
      clone.style.visibility = 'hidden';
      // 클론을 문서의 body에 추가합니다.
      document.body.appendChild(clone);
      // 클론의 텍스트 콘텐츠를 textarea의 값으로 설정.
      clone.textContent = textArea.value;
      // 클론의 오프셋 너비를 저장. 이것이 콘텐츠의 너비.
      const contentWidth = clone.offsetWidth + 4; // 4를 더하는 이유는 텍스트의 padding를 고려.
      // 클론을 문서의 body에서 제거.
      document.body.removeChild(clone);
      // 콘텐츠의 너비를 반환.
      return contentWidth;
    },
    [item.offset, item.fontSet, inputValue]
  );

  // textarea의 크기를 조정하는 함수.
  const handleReSizing = useCallback(
    (mouseDownEvent) => {
      // Component의 사이즈 조절중 드레그 막기
      mouseDownEvent.stopPropagation();
      // 사이즈 조정중 표시할 X축 Y축 선 보이기
      setShowPosLine(true);
      // textarea 내용의 높이와 너비를 저장
      const getTextAreaHeight = getContentHeight(inputRef?.current);
      const getTextAreaWidth = getContentWidth(inputRef?.current);
      let changeSize = {};

      // 드래그 시작 위치 저장
      const startPosition = {
        x: mouseDownEvent.pageX,
        y: mouseDownEvent.pageY,
      };

      // 드래그 중 마우스 움직임에 따라 사이즈 조정
      const onMouseMove = ({ pageX, pageY }) => {
        const newX = size.x - startPosition.x + pageX;
        const newY = size.y - startPosition.y + pageY;
        if (!inputRef?.current) return;
        changeSize = {
          x: Math.max(newX <= getTextAreaWidth ? getTextAreaWidth : newX, 10),
          y: Math.max(newY <= getTextAreaHeight ? getTextAreaHeight : newY, 15),
        };
        setSize(changeSize);
      };

      // 드래그 종료 시 사이즈 저장
      const onMouseUp = () => {
        setShowPosLine(false);
        updateSize(changeSize.x, changeSize.y);

        document.body.removeEventListener('mousemove', onMouseMove);
      };

      document.body.addEventListener('mousemove', onMouseMove);
      document.body.addEventListener('mouseup', onMouseUp, { once: true });
      setInputFocus(false);
    },
    [size]
  );

  // TextArea Value OnChange
  const handleTextAreaOnChange = ({ target }) => {
    const scrollHeight = target.scrollHeight;
    const { value } = target;
    // textarea가 꽉 찼을 때 더 이상 입력하지 못하게 막기.
    if (scrollHeight > size.y || showPosLine) return;
    setInputFocus(true);
    setInputValue(value);
  };

  // TextArea의 Focus가 해제될 때
  const handlerTextAreaOnBlur = useCallback(
    ({ target: { value } }) => {
      setInputFocus(false);
      setState((prev) => {
        return prev.map((data) =>
          data.id === item.id
            ? {
                ...data,
                value: inputValue,
              }
            : data
        );
      });
    },
    [item, inputValue, inputFocus]
  );

  // textarea의 fontSize가 변경될 때 내용의 크기가 textArea보다 클시 크기를 조정하는 함수.
  useEffect(() => {
    if (inputRef?.current) {
      const getWidth = getContentWidth(inputRef?.current);
      const getHeight = getContentHeight(inputRef?.current);
      if (getWidth > size.x && getHeight > size.y) {
        updateSize(getWidth, getHeight);
      } else if (getWidth > size.x) {
        updateSize(getWidth, size.y);
      } else if (getHeight > size.y) {
        updateSize(size.x, getHeight);
      }
    }
  }, [item.fontSet]);

  return (
    <Fragment>
      <Draggable
        nodeRef={nodeRef}
        onDrag={(e, data) => handleInputDrag(data)}
        onStop={handleEnd}
        bounds={'parent'}
        disabled={inputFocus}
        position={position}
        defaultClassName={'z-10'}>
        <div
          ref={nodeRef}
          className="box box-border p-[1px] rounded-[5px] flex items-center justify-center textAreaInput"
          style={{
            opacity: Opacity ? '0.6' : '1',
            ...style,
            width: size.x,
            height: size.y,
            minWidth: size.x,
            maxHeight: size.y,
          }}
          onBlur={(e) => {
            if (e.relatedTarget && e.relatedTarget.closest('body')) return;
            handlerTextAreaOnBlur(e);
          }}
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}>
          <TextArea
            ref={inputRef}
            disabled={mode}
            value={inputValue}
            onChange={handleTextAreaOnChange}
            onFocus={() => {
              setMouseOver(true);
              setInputFocus(true);
            }}
            style={{
              fontSize: item?.fontSet?.fontSize,
              textAlign: item?.fontSet?.textAlign,
              color: item?.fontSet?.color,
              fontWeight: item?.fontSet?.fontWeight,
              width: size.x,
              height: size.y,
              maxWidth: size.x,
              maxHeight: size.y,
            }}
          />
          {(mouseOver || inputFocus) && (
            <Fragment>
              <DragReSizing
                reSizing={handleReSizing}
                onDelete={onDelete}
                item={item}
              />
              {inputFocus && <ToolTip item={item} onChange={onChange} />}
            </Fragment>
          )}
        </div>
      </Draggable>

      {showPosLine && (
        <DefaultPositionLine
          item={item}
          disable={mouseOver}
          size={size}
          position={position}
        />
      )}
    </Fragment>
  );
};
export default memo(DragTextArea);

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
