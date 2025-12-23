
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [yogurtName, setYogurtName] = useState('');   
    const [riceName, setRiceName] = useState('');
    const apiUrl = window.ENV?.API_URL || "http://localhost:8083";
    const [loading, isLoading]  = useState(false);
    const navi = useNavigate();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleYogurtName = (e) => {
        setYogurtName(e.target.value);  
    };

    const handleRiceName = (e) => {
        setRiceName(e.target.value);    
    };

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        console.log(selectedFile);


        if(selectedFile && selectedFile.type.startsWith('image/')){
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else{
            setPreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();  
        isLoading(true);

        axios.post(`${apiUrl}/api/yogurts`, {
            yogurtName: yogurtName,
            riceName: riceName,
        })
        .then((res) => {
            console.log(res);
            alert("요거트가 성공적으로 추가되었어요!");
            // 폼 제출 후 입력창 비우기
            setYogurtName('');
            setRiceName('');
            isLoading(false);
        })
        .catch((err) => {
            console.error(err);
            alert("요거트 추가에 실패했어요ㅠㅠ");
            isLoading(false);
        });
    };

    if(loading){
        return <h2 style={{color:"pink"}}>요거트를 추가 중입니다...</h2>;
    }

    return (
        <>  
            <h2>이스라엘 왕자 윤기킴의 요거트</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="yogurt">요거트</label>
                    <input type="text" id="yogurt"
                    value={yogurtName}
                    placeholder='내가 먹고 싶은 요거트는~'
                    onChange={handleYogurtName}
                    />
                </div>
                <div>
                    <label htmlFor="rice">밥</label>
                    <input type="text" id="rice"
                    value={riceName}
                    placeholder='내가 먹고 싶은 밥은~'
                    onChange={handleRiceName}
                    />
                </div>

                <div>
                    <label htmlFor="file">파일 업로드</label>
                    <input type="file" id="file" onChange={handleFile}/>
                    
                </div>
                {preview && (
                    <>
                        <h4>이미지 미리보기</h4>
                        <img src={preview} alt="미리보기 이미지" style={{maxWidth: '200px', maxHeight:"160px"}}/>
                    </>
                )}
                <div>
                    <button type='button'>요거트 어케먹어</button>
                    <button type='submit'>입력 추가하기</button>
                </div>
            </form>
        </>
    )
}

export default Form;