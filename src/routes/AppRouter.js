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
                <Route path="/fundingList" element={<FundingList />} />
                <Route path="/fundingDetail" element={<FundingDetail />} />
                <Route path="/funding/contribute" element={<FundingContribute />} />
                <Route path="/galleryExam" element={<GalleryExam />} />

                <Route path="/funding/registration" element={<FundingRegistration />} />
                <Route path="/funding/rewardCreation" element={<RewardCreation />} />
                <Route path="/funding/artCreation" element={<FundingArtCreation />} />
                <Route path="/funding/fundingRegistrationThankYou" element={<FundingRegistrationThankYou />} />


                {/* 마이페이지*/}
                <Route path="/mypage/myUploadedFunding" element={<MyUploadedFunding />} />
                <Route path="/mypage/myUploadedFundingDetail" element={<MyUploadedFundingDetail />} />
                <Route path="/mypage/myContributedFunding" element={<MyContributedFunding />} />



            </Routes>
        </Router>
    );
}

export default AppRouter;
