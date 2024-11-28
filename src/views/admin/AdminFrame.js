import AdminSidebar from "./AdminSidebar";
import styles from "../../css/admin/AdminFrame.module.css";
import { url } from "../../config";
import axios from "axios";
import { useState,useEffect } from "react";
import { tokenAtom } from "../../atoms";
import { useAtomValue } from "jotai";
const AdminFrame = () => {

    const token = useAtomValue(tokenAtom);
    const [frameList,setFrameList] = useState([]);
    const [registFrame,setRegistFrame] = useState({frameType:'',framePrice:'',stock:'',canvasType:'',canvasId:''})
    const [canvas, setCanvas] = useState([]);
    
    
    const handleChangePrice = (e) => {
      const inputValue = e.target.value;
      // 숫자만 허용 (정규식)
      if (/^\d*$/.test(inputValue)) {        
        setRegistFrame({...registFrame, framePrice:inputValue})
      }
    };
    const handleChangeStock = (e) => {
        const inputValue = e.target.value;
      // 숫자만 허용 (정규식)
      if (/^\d*$/.test(inputValue)) {        
        setRegistFrame({...registFrame, stock:inputValue})
      }
    }
    useEffect(()=> {
        axios.get(`${url}/adminFrame`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
            .then(res=>{
                setFrameList(res.data);
            })
            .catch(err=> {
                console.log(err)
            })
    },[])    
    
    const selectCanvasType = (e) => {
        setRegistFrame({...registFrame,canvasType:e.target.value, canvasId:''})
        console.log(e.target.value)
    }
    
    useEffect(() => {
        if(registFrame.canvasType){
            axios.get(`${url}/getCanvas/${registFrame.canvasType}`)
            .then(res =>{
                setCanvas(res.data);
            })
            .catch(error=>{
                console.error("캔버스 불러오기 오류", error);
                setCanvas([]);
            });
        }
    }, [registFrame.canvasType]);

    const handleCanvasChange = (e) => {
        console.log(e.target.value)
        const selectCanvas = canvas.find(item => item.canvasId === Number(e.target.value));
        if(selectCanvas) {
            setRegistFrame({...registFrame, canvasId:selectCanvas.canvasId});
        } else {
            setRegistFrame({...registFrame, canvasId:''});
        }
    };
    const editRegist =(e) => {
        setRegistFrame({...registFrame,[e.target.name]:e.target.value})
    };

    const registFrameItem = () => {
        if(!registFrame.frameType) {
            alert("프레임 상품명을 입력하세요.")
            return;
        } 
        if(!registFrame.canvasType) {
            alert("캔버스 타입을 선택하세요.")
            return;
        }
        if(!registFrame.canvasId) {
            alert("캔버스 호수를 선택하세요.")
            return;
        }
        if(!registFrame.framePrice) {
            alert("가격을 입력하세요.")
            return;
        }
        if(!registFrame.stock) {
            alert("재고를 입력하세요.")
            return;
        }
        const frame = {frameType:registFrame.frameType, framePrice:registFrame.framePrice ,stock:registFrame.stock ,canvasId:registFrame.canvasId}
        axios.post(`${url}/registFrame`,frame, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            if(res.data ===true) {
                alert("프레임 옵션이 등록되었습니다.")
            } else {
                alert("프레임 옵션 등록 중 오류가 발생했습니다.")
            }
        })
        .catch(err => {
            console.log(err);
        })

    }



    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.frameList}>
                <h4>프레임 옵션 목록</h4>
                <div className={styles.listBox}>
                <table>
                    <thead>
                        <tr><th>상품명</th><th>캔버스 타입</th><th>사이즈(호)</th><th>가격</th><th>재고</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            frameList.length > 0 ? (
                                frameList.map(frameItem => (
                                    <tr key={frameItem.framdId}>
                                        <td>{frameItem.frameType}</td>
                                        <td>{frameItem.canvasType}</td>
                                        <td>{frameItem.canvasNum}</td>
                                        <td>{frameItem.framePrice.toLocaleString()}</td>
                                        <td>{frameItem.stock}</td>
                                        <td>
                                            <div className={styles.buttonDiv}>
                                                <button className={styles.goldbutton} >수정하기</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={6}>등록된 프레임이 없습니다.</td></tr>
                            )
                        }
                        
                    </tbody>
                </table>
                </div>
                <h4>추가 옵션 등록</h4>
                <div className={styles.tableBox}>
                <table>
                    <thead>
                        <tr>
                            <th>상품명</th>
                            <th>캔버스 타입</th>
                            <th>사이즈(호)</th>
                            <th>가격</th>
                            <th>재고</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name="frameType" onChange={editRegist} style={{textAlign:"center"}}></input></td>
                            <td>
                                <div className={styles.customSelect}>
                                    <select id='canvasType' name='canvasType' onChange={selectCanvasType}>
                                        <option value="A" disabled selected>선택해주세요</option>
                                        <option value="F" >F</option>
                                        <option value="P" >P</option>
                                        <option value="M" >M</option>
                                        <option value="S" >S</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div className={styles.customSelect}>
                                    <select disabled={!registFrame.canvasType} 
                                        name='canvasId'
                                        onChange={handleCanvasChange}>
                                            <option value="">호수선택</option>
                                            {canvas.map((canvasItem)=>(
                                                <option key={canvasItem.canvasId} value={canvasItem.canvasId} >
                                                    {canvasItem.canvasNum}
                                                </option>
                                            ))}  
                                    </select>
                                </div>
                            </td>
                            <td><input type="text" name="framePrice" onChange={handleChangePrice} value={registFrame.framePrice} style={{textAlign:"right"}}></input></td>
                            <td><input type="text" name="stock" onChange={handleChangeStock} value={registFrame.stock} style={{textAlign:"right"}}></input></td>
                        </tr> 
                    </tbody>
                </table>
                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.goldbutton} onClick={registFrameItem}>등록</button>
                </div>
            </div>
        </div>
            
                    
        </>
    )
}

export default AdminFrame;