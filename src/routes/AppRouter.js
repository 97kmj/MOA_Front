import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
