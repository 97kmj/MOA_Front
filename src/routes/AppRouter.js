import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TokenHandler from '../views/user/TokenHandler'; // 새로운 토큰 처리 컴포넌트
import FindId from "../views/user/FindId";
import FindIdResult from "../views/user/FindIdResult";
import FindPwd from "../views/user/FindPwd";
import FindPwdResult from "../views/user/FindPwdResult";
import Join from "../views/user/Join";
import Login from "../views/user/Login";
import RegArtworkList from "../views/mypage/RegArtworkList";
import Gallery from "../views/gallery/Gallery";
import MyGallery from "../views/gallery/MyGallery";
import GalleryDetail from "../views/gallery/GalleryDetail";
import InfoEdit from "../views/mypage/InfoEdit";

import FundingList from "../views/funding/FundingList";
import FundingDetail from "../views/funding/FundingDetail";
import FundingContribute from "../views/funding/FundingContribute";
import FundingRegistration from "../views/funding/FundingRegistration";
import RewardCreation from "../views/funding/RewardCreation";
import FundingArtCreation from "../views/funding/FundingArtCreation";
import MyUploadedFunding from "../views/mypage/funding/MyUploadedFunding";
import MyUploadedFundingDetail from "../views/mypage/funding/MyUploadedFundingDetail";
import MyContributedFunding from "../views/mypage/funding/MyContributedFunding";
import Main from "../views/user/Main";
import GalleryExam from "../views/funding/GalleryExam";
import FundingRegistrationThankYou from "../views/funding/FundingRegistrationThankYou";


import AdminNotice from "../views/admin/AdminNotice";

import ArtworkAdd from "../views/shop/ArtworkAdd";
import SaleAddResult from "../views/shop/SaleAddResult";
import SaleDetail from "../views/shop/SaleDetail";

import SaleList from "../views/shop/SaleList";
import SaleOrder from "../views/shop/SaleOrder";
import SaleOrderResult from "../views/shop/SaleOrderResult";
import ShoppingCart from "../views/shop/ShoppingCart";


import Notice from "../views/user/Notice";
import ArtistDetail from "../views/user/ArtistDetail";
import AdminQnA from "../views/admin/AdminQnA";
import AdminArtist from "../views/admin/AdminArtist";
import AdminArtwork from "../views/admin/AdminArtwork";
import AdminFunding from "../views/admin/AdminFunding";
import AdminItem from "../views/admin/AdminItem";
import AdminFrame from "../views/admin/AdminFrame";
import ArtistRegist from "../views/mypage/artist/ArtistRegist";
import ArtistEdit from "../views/mypage/artist/ArtistEdit";
import Message from "../views/mypage/Message";
import MyQnA from "../views/mypage/MyQnA";
import ShoppingCartOrder from "../views/shop/ShoppingCartOrder";


function AppRouter() {
    return (
        <Router>
            <Routes>


                <Route path="/user/findId" element={<FindId/>} />
                <Route path="/user/findIdResult" element={<FindIdResult/>} />
                <Route path="/user/findPwd" element={<FindPwd/>} />
                <Route path="/user/findPwdResult" element={<FindPwdResult/>} />
                
                <Route path="/login" element={<TokenHandler />} /> {/* 토큰 처리 */}

                <Route path="/user/login" element={<Login/>} />
                <Route path="/user/join" element={<Join/>} />

            <Route path="/mypage/regArtworkList" element={<RegArtworkList/>} />
            <Route path="/mypage/message" element={<Message/>} />
            <Route path="/mypage/infoEdit" element={<InfoEdit/>} />


            <Route path="/gallery/mygallery" element={<MyGallery/>} />
            <Route path="/gallery/gallery" element={<Gallery/>} />
            <Route path="/gallery/galleryDetail/:id" element={<GalleryDetail/>} />


            {/*메인*/}
            <Route path="/" element={<Main />} />

            {/*펀딩*/}
            <Route path="/fundings" element={<FundingList />} />
            <Route path="/fundings/:fundingId" element={<FundingDetail />} />
            <Route path="/fundings/contributions" element={<FundingContribute />} />


            <Route path="/galleryExam" element={<GalleryExam />} />

            <Route path="/funding/new" element={<FundingRegistration />} />
            <Route path="/funding/new/rewards" element={<RewardCreation />} />
            <Route path="/funding/new/artworks" element={<FundingArtCreation />} />
            <Route path="/funding/new/thankYou" element={<FundingRegistrationThankYou />} />
            {/* 판매 */}
            <Route path="/shop/artworkAdd" element={<ArtworkAdd />} />
            <Route path="/shop/saleAddResult/:artworkId" element={<SaleAddResult />} />
            <Route path="/shop/saleDetail/:artworkId" element={<SaleDetail />} />
            <Route path="/shop/saleList" element={<SaleList />} />
            <Route path="/shop/saleOrder/:artworkId" element={<SaleOrder />} />
            <Route path="/shop/saleOrderResult/:frameId" element={<SaleOrderResult />} />
            <Route path="/shop/shoppingCart/:artworkId" element={<ShoppingCart />} />
            <Route path="/shop/shoppingCartOrder/:artworkIds" element={<ShoppingCartOrder />} />

            <Route path="/mypage/regartworklist" element={<RegArtworkList/>} />

            <Route path="/gallery" element={<Gallery/>} />
            <Route path="/gallerydetail" element={<GalleryDetail/>} />
            
            {/* 마이페이지*/}
            <Route path="/mypage/fundings/uploaded" element={<MyUploadedFunding />} />
            <Route path="/mypage/fundings/uploaded/:id" element={<MyUploadedFundingDetail />} />
            <Route path="/mypage/fundings/contributed" element={<MyContributedFunding />} />
            <Route path="/mypage/artistRegist" element={<ArtistRegist/>}/>
            <Route path="/mypage/artistEdit" element={<ArtistEdit/>}/>
            <Route path="/mypage/message" element={<Message/>}/>
            <Route path="/mypage/qna" element={<MyQnA/>}/>
            {/* 관리자 */}
            <Route path="/admin/notice" element={<AdminNotice/>} />
            <Route path="/admin/qna" element={<AdminQnA/>} />
            <Route path="/admin/artistLIst" element={<AdminArtist/>} />
            <Route path="/admin/blackArtwork" element={<AdminArtwork/>} />
            <Route path="/admin/funding" element={<AdminFunding/>} />
            <Route path="/admin/item" element={<AdminItem/>} />
            <Route path="/admin/frame" element={<AdminFrame/>} />

            {/* 공지사항 */}
            <Route path="/notice" element={<Notice/>}/>
            {/* 작가상세 */}
            <Route path="/artistDetail/:artiestId" element={<ArtistDetail/>}/>
            
            </Routes>
        </Router>
    );
}

export default AppRouter;
