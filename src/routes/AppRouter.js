import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FindId from "../views/user/FindId";
import FindIdResult from "../views/user/FindIdResult";
import FindPwd from "../views/user/FindPwd";
import FindPwdResult from "../views/user/FindPwdResult";
import Join from "../views/user/Join";
import Login from "../views/user/Login";
import RegArtworkList from "../views/mypage/RegArtworkList";
import Gallery from "../views/gallery/Gallery";
import GalleryDetail from "../views/gallery/GalleryDetail";


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
import RecommendFrame from "../views/shop/RecommendFrame";
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


function AppRouter() {
    return (
        <Router>
            <Routes>

                <Route path="/findid" element={<FindId/>} />
                <Route path="/findidres" element={<FindIdResult/>} />
                <Route path="/findpwd" element={<FindPwd/>} />
                <Route path="/findpwdres" element={<FindPwdResult/>} />


                <Route path="/login" element={<Login/>} />
                <Route path="/join" element={<Join/>} />

                {/*메인*/}
                <Route path="/" element={<Main />} />

                {/*펀딩*/}
                <Route path="/fundings" element={<FundingList />} />
                <Route path="/fundings/:id" element={<FundingDetail />} />
                <Route path="/fundings/:id/contributions" element={<FundingContribute />} />


                <Route path="/galleryExam" element={<GalleryExam />} />

                <Route path="/funding/new" element={<FundingRegistration />} />
                <Route path="/funding/new/rewards" element={<RewardCreation />} />
                <Route path="/funding/new/artworks" element={<FundingArtCreation />} />
                <Route path="/funding/new/thankYou" element={<FundingRegistrationThankYou />} />
                {/* 판매 */}
                <Route path="/shop/ArtworkAdd" element={<ArtworkAdd />} />
                <Route path="/shop/RecommendFrame/:frameId" element={<RecommendFrame />} />
                <Route path="/shop/SaleAddResult/:artworkId" element={<SaleAddResult />} />
                <Route path="/shop/SaleDetail/:artworkId" element={<SaleDetail />} />
                <Route path="/shop/SaleList" element={<SaleList />} />
                <Route path="/shop/SaleOrder/:artworkId" element={<SaleOrder />} />
                <Route path="/shop/SaleOrderResult/:frameId" element={<SaleOrderResult />} />
                <Route path="/shop/ShoppingCart/:artworkId" element={<ShoppingCart />} />



                <Route path="/regartworklist" element={<RegArtworkList/>} />

                <Route path="/gallery" element={<Gallery/>} />
                <Route path="/gallerydetail" element={<GalleryDetail/>} />


                <Route path="message" element={<Message/>} />
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
                <Route path="/admin/QnA" element={<AdminQnA/>} />
                <Route path="/admin/artistLIst" element={<AdminArtist/>} />
                <Route path="/admin/blackArtwork" element={<AdminArtwork/>} />
                <Route path="/admin/funding" element={<AdminFunding/>} />
                <Route path="/admin/item" element={<AdminItem/>} />
                <Route path="/admin/frame" element={<AdminFrame/>} />

                {/* 공지사항 */}
                <Route path="/notice" element={<Notice/>}/>
                {/* 작가상세 */}
                <Route path="/artistDetail" element={<ArtistDetail/>}/>
            
            </Routes>
        </Router>
    );
}

export default AppRouter;
