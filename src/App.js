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
import SaleOrderResult from './views/shop/SaleOrderResult';
import SaleList from './views/shop/SaleList';
import SaleDetail from './views/shop/SaleDetail';
import SaleAddResult from './views/shop/SaleAddResult';
import ShoppingCart from './views/shop/ShoppingCart';
import SaleOrder from './views/shop/SaleOrder'

function App() {
  return (
    <div className="App">
    
      <Header/>
      <SaleList/>
      {/* <ShoppingCart/> */}

      {/* <SaleOrder/>
 
      <SaleAddResult/>
      <SaleOrderResult/>
    
      <Artwork/>
      <SaleList/>
      <SaleDetail/>



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



    </div>
  );
}

export default App;
