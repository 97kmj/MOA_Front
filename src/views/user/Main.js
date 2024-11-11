import styles from '../../css/user/main.module.css';

const Main = () => {
    return(
        <>
        <div className={styles.container}>
            <div className={styles.banner}>
                <div className={styles.bannerleft} style={{fontSize:"60px",fontWeight:"bold"}}>
                    <span className={styles.white}>우리 모두의 예술</span><br/>
                    <span className={`${styles.gold} ${styles.italic}`}>MOA</span>
                </div>
                <div className={`${styles.bannerright} ${styles.white}`} style={{fontSize:"20px",fontWeight:"semibold"}}>
                    <span>모아에서 다양한 작품을 감상하고 소장하세요.</span><br/>
                    <span>펀딩으로 신진작가의 성장을 함께 지원하세요.</span>
                </div>
            </div>

            <div className={styles.headerText} >
                <h2>Artwork</h2>
            </div><br/>
            <div className = {styles.mainartwork}>
                <img src="/img/sample1.webp"/>
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
                <div className={styles.artwork}>
                    <img className={styles.artImg} src="/img/sample1.webp" alt=''/>
                </div>
            </div>
            <div className={styles.buttonDiv}>
                <button className={styles.goldbutton}>Gallery</button>
                <button className={styles.goldbutton}>Shop</button>
            </div><br/>

            <div className={styles.headerText} >
                <h2>진행중인 펀딩</h2>
            </div><br/>
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
                <button className={styles.goldbutton}>See More</button>
            </div><br/>
                
        </div>
                        
        </>            

        
    );
}

export default Main;