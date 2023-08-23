import { useDragLayer } from 'react-dnd';

function DragLayer() {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      itemType: monitor.getItemType(),
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
    }));

  if (!isDragging || !currentOffset) {
    return null;
  }

  const top = currentOffset.y;
  const left = currentOffset.x;

  return (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
      }}>
      {itemType === 'TEXTAREA' && (
        <div style={{ top, left, position: 'absolute' }}>
          {/* TEXTAREA를 대표하는 드래그 표시 */}
          <textarea
            style={{
              width: item.offset.width,
              height: item.offset.height,
              opacity: 0.5,
              resize: 'none',
            }}
            readOnly
            value={item.value}
          />
        </div>
      )}
      {itemType === 'CHECKBOX' && (
        <div style={{ top, left, position: 'absolute' }}>
          {/* CHECKBOX를 대표하는 드래그 표시 */}
          <div
            style={{
              width: '20px',
              height: '20px',
              border: '1px solid black',
              opacity: 0.5,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DragLayer;
