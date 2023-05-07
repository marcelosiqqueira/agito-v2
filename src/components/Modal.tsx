import { useRef } from "react"
import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"

type ModalProps = {
    index: number,
    imagesUrl: string[] | null,
    handleIndex: (stringValue: string) => void,
    handleOpenModal: () => void
}

export function Modal({ handleIndex, handleOpenModal, index, imagesUrl }: ModalProps) {
    const divRef = useRef<any>(null)
    return (
        <div ref={divRef} tabIndex={1} aria-modal={true} onLoad={() => divRef.current?.focus()}>
            <img src={imagesUrl ? imagesUrl[index] : '/error'} alt="" />
            <button value={CarouselButtonAction.PREV} onClick={(e) => handleIndex(e.currentTarget.value)}>{'<'}</button>
            <button value={CarouselButtonAction.NEXT} onClick={(e) => handleIndex(e.currentTarget.value)}>{'>'}</button>
            <button value={CarouselButtonAction.CLOSE} onClick={handleOpenModal}>X</button>
        </div>
    )
}