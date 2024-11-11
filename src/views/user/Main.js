import '../../css/main.css';

const Main = () => {
    return(
        <>
        <div className='container'>
            <div className="banner">
                <div className='bannerleft' style={{fontSize:"60px",fontWeight:"bold"}}>
                    <span className='white'>우리 모두의 예술</span><br/>
                    <span className='gold italic'>MOA</span>
                </div>
                <div className='bannerright white' style={{fontSize:"20px",fontWeight:"semibold"}}>
                    <span>모아에서 다양한 작품을 감상하고 소장하세요.</span><br/>
                    <span>펀딩으로 신진작가의 성장을 함께 지원하세요.</span>
                </div>
            </div>

            <div className='header-text' >
                <h2>Artwork</h2>
            </div><br/>
            <div className = 'mainartwork'>
                <img src="/img/sample1.webp"/>
            </div><br/>

            <div className='artworkbox'>
                <div className='artwork'>
                    <img className='art-img' src="/img/sample1.webp" alt=''/>
                    {/* <div>
                    <img src='/img/heart.svg'/>&nbsp;<span className='gold'>1032</span>
                    </div> */}
                </div>
                <div className='artwork'>
                    <img className='art-img' src="/img/sample1.webp" alt=''/>
                </div>
                <div className='artwork'>
                    <img className='art-img' src="/img/sample1.webp" alt=''/>
                </div>
                <div className='artwork'>
                    <img className='art-img' src="/img/sample1.webp" alt=''/>
                </div>
                <div className='artwork'>
                    <img className='art-img' src="/img/sample1.webp" alt=''/>
                </div>
            </div>
            <div className='button-div'>
                <button className='goldbutton'>Gallery</button>
                <button className='goldbutton'>Shop</button>
            </div><br/>

            <div className='header-text' >
                <h2>진행중인 펀딩</h2>
            </div><br/>
            <div className='funding-box'>
                <article>
                    <div className='funding-img'>
                        <img src='/img/fundingsample.png' alt=''/>
                    </div>
                    <div className='funding-info'>        
                        <div className='funding-username'>서울대학교 전시기획동아리</div>
                        <div className='funding-title'>암실 기획전</div>
                        <div className='funding-amount'><span className='gold'>47% 달성</span>&nbsp;&nbsp;&nbsp;236,000원<span style={{float:"right"}}>17일 남음</span></div>
                        <div className='progressbar'>
                            <span style={{width:"47%"}}></span>
                        </div>
                    </div>
                </article><article>
                    <div className='funding-img'>
                        <img src='/img/fundingsample.png' alt=''/>
                    </div>
                    <div className='funding-info'>        
                        <div className='funding-username'>서울대학교 전시기획동아리</div>
                        <div className='funding-title'>암실 기획전</div>
                        <div className='funding-amount'><span className='gold'>47% 달성</span>&nbsp;&nbsp;&nbsp;236,000원<span style={{float:"right"}}>17일 남음</span></div>
                        <div className='progressbar'>
                            <span style={{width:"47%"}}></span>
                        </div>
                    </div>
                </article><article>
                    <div className='funding-img'>
                        <img src='/img/fundingsample.png' alt=''/>
                    </div>
                    <div className='funding-info'>        
                        <div className='funding-username'>서울대학교 전시기획동아리</div>
                        <div className='funding-title'>암실 기획전</div>
                        <div className='funding-amount'><span className='gold'>47% 달성</span>&nbsp;&nbsp;&nbsp;236,000원<span style={{float:"right"}}>17일 남음</span></div>
                        <div className='progressbar'>
                            <span style={{width:"47%"}}></span>
                        </div>
                    </div>
                </article><article>
                    <div className='funding-img'>
                        <img src='/img/fundingsample.png' alt=''/>
                    </div>
                    <div className='funding-info'>        
                        <div className='funding-username'>서울대학교 전시기획동아리</div>
                        <div className='funding-title'>암실 기획전</div>
                        <div className='funding-amount'><span className='gold'>47% 달성</span>&nbsp;&nbsp;&nbsp;236,000원<span style={{float:"right"}}>17일 남음</span></div>
                        <div className='progressbar'>
                            <span style={{width:"47%"}}></span>
                        </div>
                    </div>
                </article>
            </div>
            <div className='button-div'>
                <button className='goldbutton'>See More</button>
            </div><br/>
                
        </div>
                        
        </>            

        
    );
}

export default Main;