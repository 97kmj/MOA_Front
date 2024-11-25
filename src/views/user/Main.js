import styles from '../../css/user/Main.module.css';
import Header from '../Header';
import { useNavigate } from 'react-router';

import { useAtomValue } from 'jotai'; // jotai에서 상태 읽기
import { tokenAtom, userAtom } from '../../atoms'; // 토큰과 사용자 정보 가져오기
import { useEffect } from 'react';

const Main = () => {
    const navigate = useNavigate();
    const token = useAtomValue(tokenAtom); // 토큰 읽기
    const user = useAtomValue(userAtom); // 사용자 정보 읽기
    useEffect(() => {
        // 토큰이 없는 경우 "/" 페이지로 리디렉션
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);
    return(
        <>
        {/* 사용자 정보 표시 */}
        <div className={styles.userInfo}>
                    <h3>안녕하세요, {user.username || "회원"}님!</h3>
                    <p>이름: {user.name}</p>
                    <p>이메일: {user.email}</p>
                    <p>주소: {user.address}</p>
                    <p>ROLE: {user.role}</p>
                </div>
        <Header/>
        <div className={styles.container}>
            <div className={styles.banner}>
                <div className={styles.bannerleft} style={{fontSize:"50px",fontWeight:"bold"}}>
                    <span className={styles.white}>우리 모두의 예술</span><br/>
                    <span className={`${styles.gold} ${styles.italic}`}>MOA</span>
                </div>
                <div className={`${styles.bannerright} ${styles.white}`} style={{fontSize:"16px",fontWeight:"semibold"}}>
                    <span>모아에서 다양한 작품을 감상하고 소장하세요.</span><br/>
                    <span>펀딩으로 신진작가의 성장을 함께 지원하세요.</span>
                </div>
            </div>
            <h3>작품</h3>          
            <hr className={styles.bar}></hr>
            <br/>
            <div className = {styles.mainartwork}>
                
                    <img className={styles.mainArtImg} src="/img/sample1.webp"/>
                
            </div><br/>

            <div className={styles.artworkbox}>
                <div className={styles.artwork}>
                    
                    <img className={styles.artImg} src="/img/sample1.webp" alt=''/>
                    {/* <div>
                    <img src='/img/heart.svg'/>&nbsp;<span className='gold'>1032</span>
                    </div> */}
                </div>
                <div className={styles.artwork}>
                    <img className={styles.artImg} src="/img/sample1.webp" alt=''/>
                </div>
                <div className={styles.artwork}>
                    <img className={styles.artImg} src="/img/sample1.webp" alt=''/>
                </div>
                <div className={styles.artwork}>
                    <img className={styles.artImg} src="/img/sample1.webp" alt=''/>
                </div>
            </div>
            <div className={styles.buttonDiv}>
                <button className={styles.goldbutton} onClick={()=>navigate("/gallery/gallery")}>Gallery</button>
                <button className={styles.goldbutton} onClick={()=>navigate("/shop/saleList")}>Shop</button>
            </div><br/>

            <h3>진행중인 펀딩</h3>
            <hr className={styles.bar}></hr>

            <br/>
            <div className={styles.fundingBox}>
                <article>
                    <div className={styles.fundingImg}>
                        <img src='/img/fundingsample.png' alt=''/>
                    </div>
                    <div className={styles.fundingInfo}>        
                        <div className={styles.fundingUsername}>서울대학교 전시기획동아리</div>
                        <div className={styles.fundingTitle}>암실 기획전</div>
                        <div className={styles.fundingAmount}><span className={styles.gold}>47% 달성</span>&nbsp;&nbsp;&nbsp;236,000원<span style={{float:"right"}}>17일 남음</span></div>
                        <div className={styles.progressbar}>
                            <span style={{width:"47%"}}></span>
                        </div>
                    </div>
                </article>
                <article>
                    <div className={styles.fundingImg}>
                        <img src='/img/fundingsample.png' alt=''/>
                    </div>
                    <div className={styles.fundingInfo}>        
                        <div className={styles.fundingUsername}>서울대학교 전시기획동아리</div>
                        <div className={styles.fundingTitle}>암실 기획전</div>
                        <div className={styles.fundingAmount}><span className={styles.gold}>47% 달성</span>&nbsp;&nbsp;&nbsp;236,000원<span style={{float:"right"}}>17일 남음</span></div>
                        <div className={styles.progressbar}>
                            <span style={{width:"47%"}}></span>
                        </div>
                    </div>
                </article>
                <article>
                    <div className={styles.fundingImg}>
                        <img src='/img/fundingsample.png' alt=''/>
                    </div>
                    <div className={styles.fundingInfo}>        
                        <div className={styles.fundingUsername}>서울대학교 전시기획동아리</div>
                        <div className={styles.fundingTitle}>암실 기획전</div>
                        <div className={styles.fundingAmount}><span className={styles.gold}>47% 달성</span>&nbsp;&nbsp;&nbsp;236,000원<span style={{float:"right"}}>17일 남음</span></div>
                        <div className={styles.progressbar}>
                            <span style={{width:"47%"}}></span>
                        </div>
                    </div>
                </article>
                <article>
                    <div className={styles.fundingImg}>
                        <img src='/img/fundingsample.png' alt=''/>
                    </div>
                    <div className={styles.fundingInfo}>        
                        <div className={styles.fundingUsername}>서울대학교 전시기획동아리</div>
                        <div className={styles.fundingTitle}>암실 기획전</div>
                        <div className={styles.fundingAmount}><span className={styles.gold}>47% 달성</span>&nbsp;&nbsp;&nbsp;236,000원<span style={{float:"right"}}>17일 남음</span></div>
                        <div className={styles.progressbar}>
                            <span style={{width:"47%"}}></span>
                        </div>
                    </div>
                </article>
                
            </div>
            <div className={styles.buttonDiv}>
                <button className={styles.goldbutton} onClick={()=>navigate("/fundings")}>전체보기</button>
            </div><br/>
                
        </div>
                        
        </>            

        
    );
}

export default Main;