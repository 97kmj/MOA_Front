import './App.css';
// import {Routes, Route} from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './views/Header';
import Main from './views/user/Main';

import Login from './views/user/login';
import Join from './views/user/join';


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

import SaleOrderResult from './views/shop/SaleOrderResult';
import SaleList from './views/shop/SaleList';
import SaleDetail from './views/shop/SaleDetail';
import SaleAddResult from './views/shop/SaleAddResult';
import ShoppingCart from './views/shop/ShoppingCart';
import SaleOrder from './views/shop/SaleOrder'

import AdminSidebar from './views/admin/AdminSidebar';
import AdminNotice from './views/admin/AdminNotice';
import AdminQnA from './views/admin/AdminQnA';
import AdminArtist from './views/admin/AdminArtist';
import AdminFunding from './views/admin/AdminFunding';
import AdminArtwork from './views/admin/AdminArtwork';
import AdminItem from './views/admin/AdminItem';
import AdminFrame from './views/admin/AdminFrame';
import ArtistRegist from './views/mypage/artist/ArtistRegist';
import ArtistEdit from './views/mypage/artist/ArtistEdit';
import Message from './views/mypage/Message';
import SideNav from './views/mypage/side';

import ArtistDetail from './views/user/ArtistDetail';

import AppRouter from "./routes/AppRouter";



function App() {
    return <AppRouter/>;

}

export default App;
