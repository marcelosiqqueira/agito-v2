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
        <div className="text-white bg-black/50">
            <button>
                <img src={imagesUrl ? imagesUrl[index] ?? '/error' : '/error'} alt="Foto do evento" onClick={handleOpenModal} className="bg-black/40 max-w-full max-h-[415px] object-contain aspect-[3-2]"/>
            </button>
            <div className="flex justify-evenly">
                {multiple && (imagesUrl && imagesUrl.slice(index, maxMultipleSize + index).map((element, elementIndex) =>
                    <button
                        value={CarouselButtonAction.SELECT}
                        onClick={(e) => handleIndex(e.currentTarget.value, elementIndex + index)} className="bg-black/40">
                        <img src={element ?? '/error'} alt="" height={55} width={83} className="h-20 w-22 object-contain aspect-[3-2]" />
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