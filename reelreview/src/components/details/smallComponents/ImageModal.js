import styles from '../../../css/details/Detail_num5.module.css';
import imgs from '../../../img/Detail/slide.jpg'

export default function ImageModal({setModalOpen}){
    const closeModal = () =>{
        setModalOpen(false);
    }

    return(
      <div className={styles.modalImg}>
          <div className={styles.modalbox}>
              <img src={imgs} alt='#'/>
              <button className={styles.close} onClick={closeModal}/>
          </div>
      </div>
    )
}