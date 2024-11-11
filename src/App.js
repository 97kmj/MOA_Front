import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './views/Header';
import Main from './views/user/Main';
function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      {/* <div>
        <Routes>
          <Route exect path='/' element={<Main/>}/>
        </Routes>
      </div> */}
    </div>
  );
}

export default App;
