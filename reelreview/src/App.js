
import './App.css';
import { Route,Routes } from "react-router-dom";
import Detail from './component/details/Detail';

function App() {
  return (
    <div className="App">
      <Detail></Detail>
      <Routes>
        <Route path='/details' Component={<Detail></Detail>}/>
      </Routes>
    </div>
  );
}

export default App;
