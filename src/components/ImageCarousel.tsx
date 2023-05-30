import { useEffect, useRef, useState } from "react"
import { Modal } from "./Modal"
import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"

type ImageCarouselProps = {
    imagesUrl: string[] | null,
    autoPlay?: boolean,
    multiple?: boolean,
}

export function ImageCarousel({ imagesUrl, autoPlay, multiple }: ImageCarouselProps) {
    const [index, setIndex] = useState<number>(0)
    const [subIndex, setSubIndex] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const divRef = useRef<HTMLDivElement | null>(null)
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
            console.log(index)
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
        if (imagesUrl && autoPlay) {
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
            <div className="text-white bg-black/90 flex-col justify-center items-center relative lg:w-[720px] lg:h-[480px] w-full lg:rounded-lg lg:overflow-hidden object-contain" ref={divRef} tabIndex={1}>
                <button className="flex items-center justify-center w-full h-full">
                    <img src={imagesUrl ? imagesUrl[index] ?? '/error' : '/error'} alt="Foto do evento" onClick={handleOpenModal} onLoad={imageTimerHandler} className=" aspect-[3-2] object-contain h-[215px] lg:h-[480px] w-full" />
                </button>
                <div className="flex justify-evenly relative  lg:-bottom-28 bg-black/40">
                    {multiple && (imagesUrl && imagesUrl.slice(subIndex, maxMultipleSize() + subIndex).map((_, elementIndex) =>
                        <button
                            key={elementIndex}
                            value={CarouselButtonAction.SELECT}
                            onClick={(e) => handleIndex(e.currentTarget.value, elementIndex + subIndex)} className="bg-black/40">
                            <img src={imagesUrl[elementIndex + subIndex]}
                                alt="" height={55} width={83} className="h-20 w-22 object-contain aspect-[3-2] max-w-full" />
                        </button>))
                    }
                    {multiple &&
                        <>
                            <button value={CarouselButtonAction.PREV} onClick={(e) => handleSubIndex(e.currentTarget.value)} className="h-10 w-10 absolute cursor-pointer top-1/3 left-2 bg-arrow bg-dark-gray/60 bg-center bg-contain rounded-full hover:bg-white/70 duration-200">
                                {''}
                            </button>
                            <button value={CarouselButtonAction.NEXT} onClick={(e) => handleSubIndex(e.currentTarget.value)} className="h-10 w-10 absolute cursor-pointer top-1/3 right-2 bg-dark-gray/60 bg-arrow-right bg-center bg-contain rounded-full hover:bg-white/70 duration-200">
                                {''}
                            </button>
                        </>
                    }
                </div>
                <button value={CarouselButtonAction.PREV} onClick={(e) => handleIndex(e.currentTarget.value)} className="h-20 w-9 absolute cursor-pointer left-0 top-[30%] lg:top-[40%] bg-arrow scale-x-[-1] bg-black/60 bg-center bg-no-repeat rounded-l-xl hover:bg-dark-gray/60 duration-200">{''}</button>
                <button value={CarouselButtonAction.NEXT} onClick={(e) => handleIndex(e.currentTarget.value)} className="h-20 w-9 absolute cursor-pointer right-0 top-[30%] lg:top-[40%] bg-black/60 bg-arrow bg-no-repeat bg-center rounded-l-xl hover:bg-dark-gray/60 duration-200">{''}</button>
                {isOpen && <Modal handleIndex={handleIndex} handleOpenModal={handleOpenModal} index={index} imagesUrl={imagesUrl}></Modal>}
            </div>
    )
}