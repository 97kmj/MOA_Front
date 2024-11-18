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

            </Routes>
        </Router>
    );
}

export default AppRouter;
