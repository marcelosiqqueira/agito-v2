import { useRef, useState } from "react"
import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"

type EventModalProps = {
    imagesUrl: string[],
    handleOpenModal: () => void
}

export function EventModal({ handleOpenModal, imagesUrl }: EventModalProps) {
    const [index, setIndex] = useState<number>(0)
    const divRef = useRef<HTMLDivElement | null>(null)

    function handleIndex(stringValue: string, id?: number) {
        if (!imagesUrl.length)
            return
        switch (stringValue) {
            case CarouselButtonAction.PREV:
                if ((index - 1) >= 0)
                    setIndex(index - 1)
                break
            case CarouselButtonAction.NEXT:
                if ((index + 1) < imagesUrl.length)
                    setIndex(index + 1)
                break
            case CarouselButtonAction.SELECT:
                if (id || id === 0)
                    setIndex(id)
                break
        }
    }

    return (
        <div ref={divRef} tabIndex={1} aria-modal={true} onLoad={() => divRef.current?.focus()} className="bg-black/90 fixed z-50 top-0 bottom-0 right-0 left-0 flex">
            <span className="absolute text-white font-bold text-xl">Nome do Evento</span>
            <img src={imagesUrl ? imagesUrl[index] : '/error'} alt="" className="my-0 mx-auto max-w-full aspect-[3/2] object-contain" />
            <button value={CarouselButtonAction.PREV} onClick={(e) => handleIndex(e.currentTarget.value)} className="h-20 w-9 absolute cursor-pointer top-[45%] left-0 bg-arrow bg-no-repeat scale-x-[-1] bg-black/60 bg-center rounded-r-xl hover:bg-dark-gray/60 duration-200">{''}</button>
            <button value={CarouselButtonAction.NEXT} onClick={(e) => handleIndex(e.currentTarget.value)} className="h-20 w-9 absolute cursor-pointer top-[45%] right-0 bg-black/60 bg-arrow bg-no-repeat bg-center rounded-l-xl hover:bg-dark-gray/60 duration-200">{''}</button>
            <button value={CarouselButtonAction.CLOSE} onClick={handleOpenModal} className="bg-white/70 bg-close bg-center bg-cover absolute right-3 top-3 w-10 h-10 rounded-[50%] hover:bg-white duration-200"></button>
        </div>
    )
}