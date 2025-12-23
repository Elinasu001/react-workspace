import axios from "axios";
import { useState, useEffect } from "react";


const List = () => {    
    const [yogurts, setYogurts] = useState([]);
    const [err, setErr] = useState("");
    // ? 이란, 읽을 떄는 API_URL를 읽어오고 없으면 NULL 체크 하여 UNDIFINED 방지
    const apiUrl = window.ENV?.API_URL || "http://localhost:8083"; 
    const [flag, isFlag] = useState(false);

    useEffect(() => {
        console.log("API URL:", apiUrl);

        /*
        axios.get("http://localhost:8083/api/yogurts")
        .then((res) =>{
            //console.log(res);
            setYogurts([...res.data.data]);
            console.log(yogurts);
            console.log(...res.data.data);

        })*/

        const reqYogurts = async ()  => {
            try {
                const res = await axios.get(`${apiUrl}/api/yogurts`);
                setYogurts([...res.data.data]);
            } catch (e){
                console.error(e);
                setErr("에러가 발생했어요");
            }
        };
        
        reqYogurts();
    }, [flag]); // 의존성 배열
    /*
        setYogurts 이후에 최신값을 보고 싶다면, 
        useEffect로 yogurts가 바뀔 때마다 로그를 찍는 별도의 useEffect를 추가
    */
    useEffect(() => {
        if(yogurts.length != 0){
            console.log(yogurts);
        }
    }, [yogurts]);

    const handleDelete = (id) => {

        if(!confirm("정말 삭제하시겠습니까?")){
            return;
        }

        axios.delete(`${apiUrl}/api/yogurts/${id}`)
        .then(() => {
            alert("삭제되었습니다.");
            isFlag((flag) => !flag);
        })
        .catch((err) => {
            console.error(err);
        });
    }

    if(err){
        return <h1 style={{color:"red"}}>에러 발생: {err}</h1>;
    }

    return (
        <div>   
            <h2>요거트 목록</h2>
            {
                yogurts.length === 0 ? (
                    <div>아직 요거트가 존재하지 않습니다.</div>
                ) : (
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                        {yogurts.map((y) => (
                            <div key={y.yogurtId} style={{backgroundColor: '#f0f0f0', color: '#333'}}>
                                <h3>{y.yogurtName || <mark>요거트 없음</mark>}</h3>
                                <p>{y.riceName || <mark> 밥 없음</mark>}</p>
                                <img src={y.filePath}/>
                                <div style={{marginBottom: '10px', padding: '10px'}}>
                                    <button onClick={() => handleDelete(y.yogurtId)}>삭제하기</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

        </div>
    );
};

export default List;