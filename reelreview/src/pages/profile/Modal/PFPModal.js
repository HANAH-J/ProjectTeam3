import React from 'react';
import "../../../css/profile/PFPModal.css";

function PFPModal({setOpenModal}) {
  console.log('모달오픈');
  
  const closePFPModal = (e) => {
    if (e.target !== e.currentTarget) return;
    /* e.target = 실제 클릭 이벤트가 발생한 요소
       e.currentTarget = 이벤트 핸들러가 바인딩된 요소 (현재의 경우, 모달 자체) 
       모달 내부를 클릭한 경우에는 클릭 이벤트의 target과 currentTarget이 동일하게 모달 요소를 가리키므로
       조건문이 false를 반환하며, 조건문 내부의 코드는 실행되지 않음 -> 따라서 모달 내부를 클릭할 때는 모달이 닫히지 않음 */
    console.log('모달닫기');
    setOpenModal(false);
  };

  return (
    <div className="PFPModal_BG" onClick={closePFPModal}>
        <div className="PFPModal_Wrapper"> 
            <div className="PFPModal_Title">
                <h2>설정</h2>
                <hr/>
            </div> 
            <div className="PFPModal_Content"> 
                <p>프로필 사진 변경</p>
                <p>배경 사진 변경</p>
                <p>프로필 문구 변경</p>
                <hr/>
                <p>로그아웃</p>
                <p>탈퇴하기</p>
            </div>
            <div className="PFPModal_Logo"> 
                <p>로고</p>
            </div>
        </div>
    </div>
  );
}

export default PFPModal;