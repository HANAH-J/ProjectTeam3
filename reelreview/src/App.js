import MainPage from "./pages/main/MainPage";
import "./App.css";
import { Route,Routes } from "react-router-dom";
import Details from "./pages/details/Details";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={MainPage}/>
        <Route path='/details/:movieCd' Component={Details}/>
      </Routes>
    </div>
  );
}

export default App;
