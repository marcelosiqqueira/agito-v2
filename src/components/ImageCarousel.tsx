import { useEffect, useRef, useState } from "react"
import { Modal } from "./Modal"
import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"

type ImageCarouselProps = {
    imagesUrl: string[] | null,
    buttonStyle?: boolean,
    multiple?: boolean,
}

export function ImageCarousel({ imagesUrl, buttonStyle, multiple }: ImageCarouselProps) {
    const [index, setIndex] = useState<number>(0)
    const [subIndex, setSubIndex] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const divRef = useRef<any>(null)
    const maxMultipleSize = (): number => {
        if (imagesUrl) {
            if (imagesUrl.length < 4)
                return imagesUrl.length
            return 4
        }
        return 0
    }

    function handleIndex(stringValue: string, id?: number) {
        if (imagesUrl) {
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
            }
        }
    }

    function handleSubIndex(stringValue: string) {
        if (imagesUrl) {
            switch (stringValue) {
                case CarouselButtonAction.PREV:
                    if ((subIndex - 1) >= 0)
                        setSubIndex(subIndex - 1)
                    break
                case CarouselButtonAction.NEXT:
                    if ((subIndex + 4 < imagesUrl.length))
                        setSubIndex(subIndex + 1)
                    break
            }
        }
    }

    function handleOpenModal() {
        setIsOpen(!isOpen)
        divRef.current?.focus()
    }

    function imageTimerHandler() {
        if (imagesUrl && buttonStyle) {
            const timer = setTimeout(() => {
                if ((index + 1) < imagesUrl.length)
                    setIndex(index + 1)
                else
                    setIndex(0)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }

    useEffect(() => {
        setIndex(0)
        setSubIndex(0)
    }, [imagesUrl])

    return (
        //text-white -> temporario
        <div className="text-white bg-black/50" ref={divRef} tabIndex={1}>
            <button>
                <img src={imagesUrl ? imagesUrl[index] ?? '/error' : '/error'} alt="Foto do evento" onClick={handleOpenModal} onLoad={imageTimerHandler} className="bg-black/40 max-w-full max-h-[415px] object-contain aspect-[3-2]" />
            </button>
            <div className="flex justify-evenly">
                {multiple && (imagesUrl && imagesUrl.slice(subIndex, maxMultipleSize() + subIndex).map((_, elementIndex) =>
                    <button
                        key={elementIndex}
                        value={CarouselButtonAction.SELECT}
                        onClick={(e) => handleIndex(e.currentTarget.value, elementIndex + subIndex)} className="bg-black/40">
                        <img src={imagesUrl ? imagesUrl[elementIndex + subIndex] ?? '/error' : '/error'}
                            alt="" height={55} width={83} className="h-20 w-22 object-contain aspect-[3-2]" />
                    </button>))
                }
                {multiple &&
                    <>
                        <button value={CarouselButtonAction.PREV} onClick={(e) => handleSubIndex(e.currentTarget.value)}>
                            {'<'}
                        </button>
                        <button value={CarouselButtonAction.NEXT} onClick={(e) => handleSubIndex(e.currentTarget.value)}>
                            {'>'}
                        </button>
                    </>
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