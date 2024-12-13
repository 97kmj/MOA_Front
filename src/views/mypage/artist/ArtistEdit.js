import Header from "../../Header";
import styles from "../../../css/mypage/artist/ArtistEdit.module.css"
import SideNav from "../SideNav";
import { userAtom,tokenAtom } from "../../../atoms";
import { useAtomValue } from "jotai";
import axios from "axios";
import { url } from "../../../config";
import { useState,useEffect } from "react";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const ArtistEdit = () => {
    const user = useAtomValue(userAtom);
    const token = useAtomValue(tokenAtom);
    const [artistInfo,setArtistInfo] = useState({})
    const [profileImage,setProfileImg] = useState(null);
    useEffect(()=> {
        if (!user || !user.username) {
            console.warn("User data not ready. Skipping request.");
            return;
        }
        axios.get(`${url}/artistInfo`,{ 
            params: { username: user.username }, // 쿼리 파라미터로 전달
            headers: {
                Authorization: token
            }
        })
            .then(res=>{
                setArtistInfo(res.data);
            })
            .catch(err=> {
                console.log(err);
            })
    },[user,token])

    // const edit = (e) => {
    //     setArtistInfo({...artistInfo,[e.target.name]:e.target.value})
    // }

    const edit = (value, name) => {
        setArtistInfo((prev) => ({
            ...prev,
            [name]: value, // name을 키로, value를 값으로 설정
        }));
    };



    const profileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProfileImg(reader.result);
            };
        }
    }

    const editArtist =() => {
        if (!artistInfo.username) {
            alert("사용자 이름이 설정되지 않았습니다.");
            return;
        }
        const formData = new FormData();

        // 프로필 이미지 파일 추가
        formData.append("profileImage", document.querySelector("#profileImage").files[0]);

        // JSON 문자열로 변환 후 추가
        formData.append("editArtistDto", JSON.stringify(artistInfo));
        axios.post(`${url}/editArtist`, formData, {
                headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data", // 반드시 명시
                },
            })
            .then((res) => {
                if (res.data === true) {
                    alert("수정 완료");
                } else {
                    alert("등록실패");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return(
        <>
        <Header/>
        <div className={styles.container}>
            <SideNav/>
            <div className={styles.body}>
                <h3>작가 정보 수정</h3>
                <div className={styles.registform}>
                    <h4 style={{textAlign:"left"}}>프로필 사진</h4>
                    <div className={styles.imgBox}>
                        <img src={!profileImage ? artistInfo?.profileImage : profileImage}/>
                    </div>
                    <div className={styles.imgUploadbox}>
                    <label for="profileImage">프로필 사진 변경</label><input type="file" id="profileImage" onChange={profileChange}/>
                    </div>


                    {/*<h4 style={{textAlign:"left"}}>작가 이력</h4>*/}
                    {/*<textarea name="artistCareer" value={artistInfo.artistCareer} onChange={edit}></textarea>*/}
                    {/*<h4 style={{textAlign:"left"}}>작가 노트</h4>*/}
                    {/*<textarea name="artistNote" value={artistInfo.artistNote} onChange={edit}></textarea>*/}

                    <div>
                        <h4 style={{textAlign: "left"}}>작가 이력</h4>
                        <ReactQuill
                            value={artistInfo.artistCareer || ""}
                            onChange={(value) => edit(value, "artistCareer")}
                            placeholder="작가 이력을 입력하세요"
                            theme="snow"
                            style={{height: "200px"}}
                        />

                    </div>

                    <div className={styles.artistInfoArtistNoteOut}>
                        <h4 style={{ textAlign: "left" }}>작가 노트</h4>
                    <ReactQuill
                        value={artistInfo.artistNote || ""}
                        onChange={(value) => edit(value, "artistNote")}
                        placeholder="작가 노트를 입력하세요"
                        theme="snow"
                        style={{ height: "200px" }}
                    />

                    </div>


                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton} onClick={editArtist}>수정하기</button>
                </div>
                </div>
            </div>
            <div>
            </div>
        </div>

        </>
    )
}

export default ArtistEdit;