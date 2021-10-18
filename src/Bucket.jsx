import { Button } from 'react-bootstrap';
import { memo } from 'react';
import { useDrop } from 'react-dnd';

const bucketStyle = {
  height: '2.3rem',
  width: '100%',
  marginBottom: '0',
  color: 'black',
  padding: '.35rem',
  textAlign: 'left',
  fontSize: '1rem',
};

const clearButtonStyle = {
  padding: '0 4px',
  margin: '-3px 6px 0 3px',
};

export const Bucket = memo(function Bucket({ id, accept, lastDroppedItem, onDrop, }) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  let backgroundColor = '#eee';
  if (isActive) {
    backgroundColor = '#abc9ca';
  } else if (canDrop) {
    backgroundColor = '#bacaab';
  }

  let displayText = isActive
            ? 'Release to drop the element'
            : `This location accepts: ${accept.join(', ')}`;

  if (lastDroppedItem) {
    displayText = `${lastDroppedItem.display}`;
  } 

  return (<div id={id} ref={drop} role='Bucket' style={{ ...bucketStyle, backgroundColor }}>
      { lastDroppedItem ? <ClearButton target={id} lastDroppedItem={lastDroppedItem} /> : null }
      { displayText }
    </div>);
});

function clearBucket(e) {
  console.log(e.target)
  // console.log('button click')
  // return false;
}

const ClearButton = ({ lastDroppedItem }) => {
  return (
    <Button 
      onClick={clearBucket}
      size='sm'
      style={{ ...clearButtonStyle }}
      title={`Clear ${lastDroppedItem.display}`}
      variant='outline-secondary' 
    >X</Button>
  )
}
