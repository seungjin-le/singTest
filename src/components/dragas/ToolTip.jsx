import React from 'react';
import TextAreaWeight from '../toolTips/TextAreaWeight';
import ColorPicker from '../toolTips/ColorPicker';

const fontSizes = [
  {
    label: '10px',
    value: '10px',
  },
  { label: '11px', value: '11px' },
  { label: '12px', value: '12px' },
  { label: '13px', value: '13px' },
  { label: '14px', value: '14px' },
  { label: '15px', value: '15px' },
  { label: '16px', value: '16px' },
  { label: '17px', value: '17px' },
  { label: '18px', value: '18px' },
  { label: '19px', value: '19px' },
  { label: '20px', value: '20px' },
  { label: '21px', value: '21px' },
  { label: '22px', value: '22px' },
  { label: '23px', value: '23px' },
  { label: '24px', value: '24px' },
  { label: '25px', value: '25px' },
];

const ToolTip = ({ item, onChange }) => {
  return (
    <div
      className={
        'bg-[gray] w-[250px] absolute top-0 left-1/2 translate-x-m50 -translate-y-[110%] z-5 border-2 border-red-600 rounded-md'
      }>
      <div className={'flex flex-row justify-start items-center'}>
        <div className={'w-auto p-3 whitespace-nowrap'}>폰트 크기</div>
        <div className={'w-full flex flex-row justify-center items-center '}>
          <select
            onChange={(e) => onChange(e, item?.id, 'fontSize')}
            value={item?.fontSet?.fontSize || '14px'}>
            {fontSizes.map((item) => (
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
