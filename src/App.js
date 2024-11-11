import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './views/Header';
import Main from './views/user/Main';
import Artwork from './views/shop/ArtworkAdd';
function App() {
  return (
    <div className="App">
      <Header/>
      <Artwork/>
      {/* <div>
        <Routes>
          <Route exect path='/' element={<Main/>}/>
        </Routes>
      </div> */}
    </div>
  );
}

export default App;
