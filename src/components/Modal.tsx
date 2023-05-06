type ModalProps = {
    index: number,
    imagesUrl: string[] | null,
    handleOpenModal: () => void
}

enum Value {
    LEFT = 'left',
    RIGHT = 'right',
    CLOSE = 'close',
}



export function Modal({ handleOpenModal, index, imagesUrl }: ModalProps) {
    return (
        <div>
            <img src={imagesUrl ? imagesUrl[index] : '/error'} alt="" />
            <button value={Value.LEFT}>{'<'}</button>
            <button value={Value.RIGHT}>{'>'}</button>
            <button value={Value.CLOSE} onClick={handleOpenModal}>X</button>
        </div>
    )
}