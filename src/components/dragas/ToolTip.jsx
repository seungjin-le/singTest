import React from 'react';
import TextAreaWeight from '../toolTips/TextAreaWeight';
import ColorPicker from '../toolTips/ColorPicker';

const ToolTip = ({ item, options, onChange }) => {
  return (
    <div
      className={
        'bg-[gray] w-[250px] absolute top-0 left-1/2 translate-x-m50 translate-y-m100 z-5 bg-[red]'
      }>
      <div className={'flex flex-row justify-start items-center'}>
        <div className={'w-auto p-3 whitespace-nowrap'}>폰트 크기</div>
        <div className={'w-full flex flex-row justify-center items-center '}>
          <select
            onChange={(e) => onChange(e, item?.id, 'fontSize')}
            value={item?.fontSet?.fontSize || '14px'}>
            {options.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={'flex flex-row justify-start items-center'}>
        <div className={'w-auto p-3 whitespace-nowrap'}>정렬</div>
        <div
          className={'w-full flex flex-row justify-between items-center px-4'}>
          <button
            value={'left'}
            onClick={(e) => onChange(e, item?.id, 'textSort')}>
            왼쪽
          </button>
          <button
            value={'center'}
            onClick={(e) => onChange(e, item?.id, 'textSort')}>
            중앙
          </button>
          <button
            value={'right'}
            onClick={(e) => onChange(e, item?.id, 'textSort')}>
            오른쪽
          </button>
        </div>
      </div>
      <div className={'flex flex-row justify-start items-center'}>
        <div className={'w-auto p-3 whitespace-nowrap'}>폰트 색상</div>
        <div className={'w-full flex flex-row justify-center items-center '}>
          <ColorPicker onChange={onChange} item={item} />
        </div>
      </div>
      <div className={'flex flex-row justify-start items-center'}>
        <div className={'w-auto p-3 whitespace-nowrap'}>폰트 굵기</div>
        <div className={'w-full flex flex-row justify-center items-center'}>
          <TextAreaWeight onChange={onChange} item={item} />
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
