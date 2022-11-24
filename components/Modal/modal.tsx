import style from './Modal.module.css'
export default function Modal({children}: any) {
    return(
        <div className={style.modal_container}>
            <div className={style.modal}>
                <div className={style.modal_head_container}>
                    <img src="/x.svg" alt="X" />
                </div>
                <div className={style.content_modal}>
                    {children}
                </div>
            </div>
        </div>
    )
}