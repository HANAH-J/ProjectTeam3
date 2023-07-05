import React, { useState } from 'react';
import styles from '../../../css/profile/PFPModal.module.css'

function PFPModal({setOpenModal}) {
  console.log('모달오픈');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showEditTextModal, setShowEditTextModal] = useState(false);
  const [showEditPFPModal, setShowEditPFPModal] = useState(false);
  const [showEditPFBModal, setShowEditPFBModal] = useState(false);
  
  const closePFPModal = (e) => {
    if (e.target !== e.currentTarget) return;
    /* e.target = 실제 클릭 이벤트가 발생한 요소
       e.currentTarget = 이벤트 핸들러가 바인딩된 요소 (현재의 경우, 모달 자체) 
       모달 내부를 클릭한 경우에는 클릭 이벤트의 target과 currentTarget이 동일하게 모달 요소를 가리키므로
       조건문이 false를 반환하며, 조건문 내부의 코드는 실행되지 않음 -> 따라서 모달 내부를 클릭할 때는 모달이 닫히지 않음 */
    console.log('모달닫기');
    setOpenModal(false);
  };

  const openWithdrawModal = () => {
    setShowWithdrawModal(true);
  };
  const closeWithdrawModal = () => {
    setShowWithdrawModal(false);
  };

  const openEditTextModal = () => {
    setShowEditTextModal(true);
  }
  const closeEditTextModal = () => {
    setShowEditTextModal(false);
  }

  const openEditPFPModal = () => {
    setShowEditPFPModal(true);
  }
  const closeEditPFPModal = () => {
    setShowEditPFPModal(false);
  }

  const openEditPFBModal = () => {
    setShowEditPFBModal(true);
  }
  const closeEditPFBModal = () => {
    setShowEditPFBModal(false);
  }


  return (
    <div className={styles.PFPModal_BG} onClick={closePFPModal}>
      
        <div className={styles.PFPModal_Wrapper}> 
            <div className={styles.PFPModal_Title}>
                <h2>설정</h2>
                <hr className={styles.PFPModal_HR}/>
            </div> 
            <div className={styles.PFPModal_Content}> 
                <p onClick={openEditPFPModal}>프로필 사진 변경</p>
                <p onClick={openEditPFBModal}>배경 사진 변경</p>
                <p onClick={openEditTextModal}>프로필 문구 변경</p>
                <hr className={styles.PFPModal_HR}/>
                <p>로그아웃</p>
                <p onClick={openWithdrawModal}>탈퇴하기</p>
            </div>
            <div className={styles.PFPModal_Logo}> 
                <p>로고</p>
            </div>
            
        </div>

      {showWithdrawModal && ( 
        <div className={styles.WithdrawModal}>
          <h3>탈퇴 확인</h3>
          <p>정말로 탈퇴하시겠습니까?</p>
          <button onClick={closeWithdrawModal}>취소</button>
          <button>탈퇴하기</button>
        </div>
      )}

      {showEditTextModal && ( 
        <div className={styles.EditTextModal}>
          <h3>프로필 문구 변경</h3>
          <input type="text" id="profileText" placeholder="프로필 문구를 입력해주세요." maxLength={100} />
          <br></br>
          <button>저장</button>
          <button onClick={closeEditTextModal}>취소</button>
        </div>
      )}


      {showEditPFPModal && ( 
        <div className={styles.EditPFPModal}>
          <h3>프로필 사진 변경</h3>
          <input type="file" id="pictureForProfile" />
          <br></br>
          <button>변경</button>
          <button onClick={closeEditPFPModal}>취소</button>
        </div>
      )}

      {showEditPFBModal && ( 
        <div className={styles.EditPFBModal}>
          <h3>배경 사진 변경</h3>
          <input type="file" id="pictureForBG" />
          <br></br>
          <button>변경</button>
          <button onClick={closeEditPFBModal}>취소</button>
        </div>
      )}

      
    </div>
  );
}

export default PFPModal;