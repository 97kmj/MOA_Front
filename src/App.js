import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './views/Header';
import Main from './views/user/Main';

import Artwork from './views/shop/ArtworkAdd';
import Notice from './views/user/Notice';

import FundingList from "./views/funding/FundingList";
import FundingDetail from "./views/funding/FundingDetail";
import FundingContribute from "./views/funding/FundingContribute";
import FundingRegistration from "./views/funding/FundingRegistration";
import RewardCreation from "./views/funding/RewardCreation";
import FundingArtCreation from "./views/funding/FundingArtCreation";
import MyUploadedFunding from "./views/mypage/funding/MyUploadedFunding";
import MyUploadedFundingDetail from "./views/mypage/funding/MyUploadedFundingDetail";
import MyContributedFunding from "./views/mypage/funding/MyContributedFunding";
import RegArtworkList from './views/mypage/regArtworkList';
import Gallery from './views/gallery/gallery';
import GalleryDetail from './views/gallery/gallerydetail';


function App() {
  return (
    <div className="App">
      <Header/>
{/* 
      <Artwork/>

      <Main/>
      <Notice/> */}

      {/* <div>
        <Routes>
          <Route exect path='/' element={<Main/>}/>
        </Routes>
      </div> */}


        {/*npm install react-masonry-css*/}

        {/* <FundingList/>
        <FundingDetail/>
        <FundingContribute/>

        <FundingRegistration/>
        <RewardCreation/>
        <FundingArtCreation/>


        <MyUploadedFunding/>
        <MyUploadedFundingDetail/>
        <MyContributedFunding/> */}

          <RegArtworkList/>
          <Gallery/>
          <GalleryDetail/>
      

    </div>
  );
}

export default App;
