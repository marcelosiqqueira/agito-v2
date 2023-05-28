import { useRef } from "react"
import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"

type ModalProps = {
    index: number,
    imagesUrl: string[] | null,
    handleIndex: (stringValue: string) => void,
    handleOpenModal: () => void
}

export function Modal({ handleIndex, handleOpenModal, index, imagesUrl }: ModalProps) {
    const divRef = useRef<HTMLDivElement | null>(null)
    return (
        <div ref={divRef} tabIndex={1} aria-modal={true} onLoad={() => divRef.current?.focus()} className="bg-black/80 fixed z-10 top-0 bottom-0 right-0 left-0 flex">
            <img src={imagesUrl ? imagesUrl[index] : '/error'} alt="" className="my-0 mx-auto max-w-full aspect-[3/2] object-contain" />
            <button value={CarouselButtonAction.PREV} onClick={(e) => handleIndex(e.currentTarget.value)} className="h-20 w-9 absolute cursor-pointer top-[45%] left-0 bg-arrow-left bg-black/60 bg-center rounded-r-xl hover:bg-dark-gray/60 duration-200">{''}</button>
            <button value={CarouselButtonAction.NEXT} onClick={(e) => handleIndex(e.currentTarget.value)} className="h-20 w-9 absolute cursor-pointer top-[45%] right-0 bg-black/60 bg-arrow-right bg-center rounded-l-xl hover:bg-dark-gray/60 duration-200">{''}</button>
            <button value={CarouselButtonAction.CLOSE} onClick={handleOpenModal} className="bg-gray bg-close bg-center bg-cover absolute right-3 top-3 w-10 h-10 rounded-[50%] hover:bg-white duration-200"></button>
        </div>
    )
}