import { useState } from "react"
import { Modal } from "./Modal"
import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"

type ImageCarouselProps = {
    imagesUrl: string[] | null,
    buttonStyle?: boolean,
    multiple?: boolean,
}

export function ImageCarousel({ imagesUrl, buttonStyle, multiple }: ImageCarouselProps) {
    const [index, setIndex] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const maxMultipleSize = imagesUrl ? ((imagesUrl.length <= 4) ? (imagesUrl?.length - 1) : 4) : 4

    function handleIndex(stringValue: string, id?: number) {
        if (imagesUrl) {
            switch (stringValue) {
                case CarouselButtonAction.PREV:
                    if ((index - 1) >= 0)
                        setIndex(index - 1)
                    break
                case CarouselButtonAction.NEXT:
                    if ((index + 1 <= imagesUrl.length))
                        setIndex(index + 1)
                    break
                case CarouselButtonAction.SELECT:
                    if (id)
                        setIndex(id)
            }
        }
    }

    function handleOpenModal() {
        setIsOpen(!isOpen)
    }

    return (
        //text-white -> temporario
        <div className="text-white">
            <button>
                <img src={imagesUrl ? imagesUrl[index] ?? '/error' : '/error'} alt="Foto do evento" onClick={handleOpenModal} />
            </button>
            <div>
                {multiple && (imagesUrl && imagesUrl.slice(index, maxMultipleSize + index).map((element, elementIndex) =>
                    <button
                        value={CarouselButtonAction.SELECT}
                        onClick={(e) => handleIndex(e.currentTarget.value, elementIndex + index)}>
                        <img src={element ?? '/error'} alt="" height={240} width={240} className="" />
                    </button>))
                }
            </div>
            {buttonStyle ?
                <>
                    <button value={CarouselButtonAction.SELECT} onClick={(e) => handleIndex(e.currentTarget.value)}>♦</button>
                    <button value={CarouselButtonAction.SELECT} onClick={(e) => handleIndex(e.currentTarget.value)}>♦</button>
                    <button value={CarouselButtonAction.SELECT} onClick={(e) => handleIndex(e.currentTarget.value)}>♦</button>
                    <button value={CarouselButtonAction.SELECT} onClick={(e) => handleIndex(e.currentTarget.value)}>♦</button>
                    <button value={CarouselButtonAction.SELECT} onClick={(e) => handleIndex(e.currentTarget.value)}>♦</button>
                </> :
                <>
                    <button value={CarouselButtonAction.PREV} onClick={(e) => handleIndex(e.currentTarget.value)}>{'<'}</button>
                    <button value={CarouselButtonAction.NEXT} onClick={(e) => handleIndex(e.currentTarget.value)}>{'>'}</button>
                </>
            }
            {isOpen && <Modal handleIndex={handleIndex} handleOpenModal={handleOpenModal} index={index} imagesUrl={imagesUrl}></Modal>}
        </div>
    )
}