import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './views/Header';
import Main from './views/user/Main';

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

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <Notice/>
      {/* <div>
        <Routes>
          <Route exect path='/' element={<Main/>}/>
        </Routes>
      </div> */}


        {/*npm install react-masonry-css*/}

        <FundingList/>
        <FundingDetail/>
        <FundingContribute/>

        <FundingRegistration/>
        <RewardCreation/>
        <FundingArtCreation/>


        <MyUploadedFunding/>
        <MyUploadedFundingDetail/>
        <MyContributedFunding/>



    </div>
  );
}

export default App;
