import { StyledBlueP, StyledP } from "./Chapter01.styles";
import "./Chapter01.css"
import { Fragment } from "react";

const SelectBoard =  () => {
    // AJAX 요청을 보내서 응답이 왔다고 가정
    const obj = {
        boardTitle: "1번글",
        boardContent: "내용입니다.",
        boardWriter: "관리자",
    };

    return (
        <Fragment>
            <StyledBlueP>{obj.boardTitle}</StyledBlueP>        
            <StyledP>{obj.boardContent}</StyledP>
            <p className="styled-p">{obj.boardWriter}</p>        
        </Fragment>
    );
};
export default SelectBoard;