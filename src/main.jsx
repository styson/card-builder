import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import CaseCardContainer from './caseCardContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <CaseCardContainer />
      </DndProvider>
    </div>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
