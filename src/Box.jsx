import { memo } from 'react';
import { useDrag } from 'react-dnd';

const style = {
  backgroundColor: 'white',
  border: '1px dashed gray',
  cursor: 'move',
  marginBottom: '20px',
  padding: '0.4rem .25rem 0.6rem .5rem ',
};

const tagStyle = {
  backgroundColor: '#eef',
  border: '1px solid #88f',
  borderRadius: '.25rem',
  color: '#55f',
  float: 'right',
  fontSize: 'small',
  marginTop: '-1rem',
  marginRight: '-1rem',
  padding: '0.05rem 0.2rem .1rem 0.25rem',
  textAlign: 'right',
  width: 'auto',
};

export const Box = memo(function Box({ name, display, example, label, type, isDropped }) {
  const [{ opacity }, drag] = useDrag(() => ({
    type,
    item: { name, display, example, label },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }), [name, display, example, label, type]);

  return (
    <li>
      <div ref={drag} role='Box' style={{ ...style, opacity }}>
        {isDropped ? <s>{display}</s> : display} 
        <span style={{ ...tagStyle }}>{type}</span>
      </div>
    </li>
  );
});