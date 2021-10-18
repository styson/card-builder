import { Box } from './Box';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Bucket } from './Bucket';
import { ItemTypes } from './ItemTypes';
import { useState, useCallback, memo } from 'react';
import update from 'immutability-helper';

const layout = {
  maxColumns: 2,
  rows: [
    { cols: [1, 2] },
    { cols: [1] },
    { cols: [1] },
    { cols: [1] },
    { cols: [1] },
    { cols: [1] },
  ]
};

export const CaseCard = memo(function CaseCard() {
  const [dustbins, setDustbins] = useState([
    { name: '1', accepts: [ItemTypes.TEXT, ItemTypes.LINK], lastDroppedItem: null }, { name: '2', accepts: [ItemTypes.BADGE], lastDroppedItem: null },
    { name: '3', accepts: [ItemTypes.TEXT], lastDroppedItem: null },
    { name: '4', accepts: [ItemTypes.TEXT], lastDroppedItem: null },
    { name: '5', accepts: [ItemTypes.TEXT], lastDroppedItem: null },
    { name: '6', accepts: [ItemTypes.TEXT], lastDroppedItem: null, },
    { name: '7', accepts: [ItemTypes.TEXT, ItemTypes.LINK], lastDroppedItem: null },
  ]);

  const [elements] = useState([
    { name: 'identifier', display: 'Case Id', type: ItemTypes.LINK, example: 'Case 1001', label: '' },
    { name: 'title', display: 'Title', type: ItemTypes.TEXT, example: 'What day of the week is it?', label: '' },
    { name: 'caseType', display: 'Case Type', type: ItemTypes.TEXT, example: 'Question', label: 'Type' },
    { name: 'employee', display: 'Employee', type: ItemTypes.TEXT, example: 'Karen Jones', label: 'For' },
    { name: 'concerningEmployee', display: 'Concerning Employee', type: ItemTypes.TEXT, example: 'Mark Jones', label: 'Concerning' },
    { name: 'lastModified', display: 'Last Modified', type: ItemTypes.TEXT, example: '2 days ago', label: 'Last Modified' },
    { name: 'status', display: 'Status', type: ItemTypes.BADGE, example: 'Open', label: '' },
    { name: 'condition', display: 'Condition', type: ItemTypes.BADGE, example: 'Closed', label: '' },
  ]);

  const [droppedBoxNames, setDroppedBoxNames] = useState([]);

  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1;
  }

  const handleDrop = useCallback((index, item) => {
    const { name } = item;
    setDroppedBoxNames(update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }));
    setDustbins(update(dustbins, {
      [index]: {
        lastDroppedItem: {
          $set: item,
        },
      },
    }));
  }, [droppedBoxNames, dustbins]);

  const cardStyle = {
    backgroundColor: 'white',
    border: '1px solid #aaa',
    borderRadius: '.5rem',
    marginLeft: '1rem',
    padding: '1rem 1rem 0',
  }

  const labelStyle = {
    fontWeight: 'bold',
  }

  let xx = 0;
  let dbx = 0;
  let ebx = 0;

  const Cell = ({ idx, max, dbx }) => {
    const db = dustbins[dbx];
    return (
      <td colSpan={ idx === 0 && max < layout.maxColumns ? 2 : 1 } >
        <Bucket accept={db.accepts} lastDroppedItem={db.lastDroppedItem} onDrop={(item) => handleDrop(dbx, item)} key={idx} />
      </td>
    )
  }

  const Example = ({ idx, max, ebx }) => {
    const db = dustbins[ebx];

    const example = db.lastDroppedItem ? db.lastDroppedItem.example : '...';
    const label = db.lastDroppedItem ? `${db.lastDroppedItem.label}${db.lastDroppedItem.label > '' ? ':' : ''} ` : '';

    const colSpan = idx === 0 && max < layout.maxColumns ? 2 : 1;
    return (
      <td colSpan={colSpan} width={colSpan == 1 ? '70%' : '100%'}>
        <div>
          <span style={{ ...labelStyle }}>{ label }</span>{ example }
        </div>
      </td>
    )
  }

  return (
    <Container fluid className='mt-3'>
      <Row>
        <h3>Card Layout Designer</h3>
      </Row>
      <Row className='mt-3'>
        <Col md={3} sm={4}>
          <h4 className='text-primary'>Case Elements</h4>
          <ul className='list-unstyled'>
            { elements.map(({ name, display, example, label, type }, i) => (
              <Box name={name} display={display} example={example} type={type} label={label} isDropped={isDropped(name)} key={i}/>
            ))}        
          </ul>
        </Col>
        <Col md={9} sm={8}>
          <h4 className='text-primary'>Card Layout</h4>
          <div style={{ ...cardStyle }}>
            <Table responsive bordered>
              <tbody>
              { layout.rows.map((row, i) => (
                <tr key={i}>
                  { row.cols.map((col, idx) => (
                    <Cell key={xx++} idx={idx} dbx={dbx++} max={row.cols.length} />
                  ))}
                </tr>
              ))}        
              </tbody>
            </Table>
          </div>

          <h4 className='text-primary mt-4'>Card Example</h4>
          <div style={{ ...cardStyle }}>
            <Table responsive borderless>
              <tbody>
              { layout.rows.map((row, i) => (
                <tr key={i*2}>
                  { row.cols.map((col, idx) => (
                    <Example key={xx++} idx={idx} ebx={ebx++} max={row.cols.length} />
                  ))}
                </tr>
              ))}        
              </tbody>
            </Table>
          </div>

        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={{ span: 2, offset: 10 }}>
          <Button>Save Layout</Button>
        </Col>
      </Row>
 </Container>
  );
});