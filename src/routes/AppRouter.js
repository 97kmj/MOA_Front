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
import Message from "../views/mypage/Message";

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

            <Route path="/regartworklist" element={<RegArtworkList/>} />

            <Route path="/gallery" element={<Gallery/>} />
            <Route path="/gallerydetail" element={<GalleryDetail/>} />

            <Route path="message" element={<Message/>} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
