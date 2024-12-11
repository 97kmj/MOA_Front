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
    const [editingFrameId, setEditingFrameId] = useState(null); // 수정 중인 프레임 ID
    const [editValues, setEditValues] = useState({ framePrice: '', stock: '' }); // 수정 중인 값
    
    
    const handleChangeRegist = (e) => {
        const { name, value } = e.target;
      // 숫자만 허용 (정규식)
        if (/^\d*$/.test(value)) {        
        setRegistFrame({...registFrame, [name]:value})
      }
    };
    
    useEffect(()=> {
        token!==null && token!=='' && axios.get(`${url}/adminFrame`,{
            headers : {
                Authorization : token
            }
        })
            .then(res=>{
                setFrameList(res.data);
            })
            .catch(err=> {
                console.log(err)
            })
    },[token])    
    
    const selectCanvasType = (e) => {
        setRegistFrame({...registFrame,canvasType:e.target.value, canvasId:''})
        console.log(e.target.value)
    }
    
    useEffect(() => {
        if(registFrame.canvasType){
            axios.get(`${url}/getCanvas/${registFrame.canvasType}`, {
                headers : {
                    Authorization : token
                }
            })
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
                Authorization: token
            }
        })
        .then(res => {
            if(res.data) {
                alert("프레임 옵션이 등록되었습니다.");
                // 새로 등록된 프레임을 기존 리스트에 추가
                setFrameList((prevList) => [...prevList, res.data]);
            } else {
                alert("프레임 옵션 등록 중 오류가 발생했습니다.")
            }
        })
        .catch(err => {
            console.log(err);
        })

    }
    
    //수정하기
    const startEditing = (frameItem) => {
        setEditingFrameId(frameItem.frameId);
        setEditValues({ framePrice: frameItem.framePrice, stock: frameItem.stock });
    };

    const cancelEditing = () => {
        setEditingFrameId(null);
        setEditValues({ framePrice: '', stock: '' });
    };

    const saveChanges = (frameId) => {
        const updatedFrame = {
            ...frameList.find(item => item.frameId === frameId),
            framePrice: editValues.framePrice,
            stock: editValues.stock,
        };
    
        axios.post(`${url}/updateFrame`, updatedFrame, {
            headers: { Authorization: token }
        })
        .then(res => {
            if (res.data === true) {
                alert('수정이 완료되었습니다.');
                setFrameList(frameList.map(item => 
                    item.frameId === frameId ? updatedFrame : item
                ));
                setEditingFrameId(null); // 수정 모드 종료
            } else {
                alert('수정 중 오류가 발생했습니다.');
            }
        })
        .catch(err => console.error(err));
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        if (/^\d*$/.test(value)) { // 숫자만 허용
            setEditValues({ ...editValues, [name]: value });
        }
    };

    return(
        <>
        <div className={styles.container}>
            <AdminSidebar/>
            <div className={styles.frameList}>
                <h4>프레임 옵션 목록</h4>
                <div className={styles.listBox}>
                <table className={styles.frameTable}>
                    <thead>
                        <tr><th>상품명</th><th>캔버스 타입</th><th>사이즈(호)</th><th>가격</th><th>재고</th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        frameList.length > 0 ? (
                            frameList.map(frameItem => (
                                <tr key={frameItem.frameId}>
                                    <td>{frameItem.frameType}</td>
                                    <td>{frameItem.canvasType}</td>
                                    <td>{frameItem.canvasNum}</td>
                                    <td>
                                        {editingFrameId === frameItem.frameId ? (
                                            <input 
                                                className={styles.editInput}
                                                type="text" 
                                                name="framePrice" 
                                                value={editValues.framePrice} 
                                                onChange={handleEditChange}
                                                style={{ textAlign: 'right' }}
                                            />
                                        ) : (
                                            frameItem.framePrice.toLocaleString()
                                        )}
                                    </td>
                                    <td>
                                        {editingFrameId === frameItem.frameId ? (
                                            <input 
                                                className={styles.editInput}
                                                type="text" 
                                                name="stock" 
                                                value={editValues.stock} 
                                                onChange={handleEditChange}
                                                style={{ textAlign: 'right' }}
                                            />
                                        ) : (
                                            frameItem.stock
                                        )}
                                    </td>
                                    <td className={styles.editTd}>
                                        {editingFrameId === frameItem.frameId ? (
                                            <div className={styles.editbuttonDiv}>
                                                <button 
                                                    className={styles.goldbutton} 
                                                    onClick={() => saveChanges(frameItem.frameId)}>
                                                    수정완료
                                                </button>
                                                <button 
                                                    className={styles.goldbutton} 
                                                    onClick={cancelEditing}>
                                                    취소
                                                </button>
                                            </div>
                                        ) : (
                                            <div className={styles.buttonDiv}>
                                                <button 
                                                    className={styles.goldbutton} 
                                                    onClick={() => startEditing(frameItem)}>
                                                    수정하기
                                                </button>
                                            </div>
                                        )}
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
                <table className={styles.registTable}>
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
                            <td><input type="text" name="framePrice" className={styles.editInput} onChange={handleChangeRegist} value={registFrame.framePrice.toLocaleString()} style={{textAlign:"right"}}></input></td>
                            <td><input type="text" name="stock"  className={styles.editInput}  onChange={handleChangeRegist} value={registFrame.stock} style={{textAlign:"right"}}></input></td>
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