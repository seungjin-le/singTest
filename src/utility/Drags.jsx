import { useDrag } from 'react-dnd';

export const textAreaDrag = (item, position, size, ref) => {
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
  return { collected, drag, preview };
};
