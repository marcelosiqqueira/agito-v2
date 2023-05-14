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
        <div className="text-white bg-black/50 flex-col justify-center items-center relative lg:w-[720px]" ref={divRef} tabIndex={1}>
            <button>
                <img src={imagesUrl ? imagesUrl[index] ?? '/error' : '/error'} alt="Foto do evento" onClick={handleOpenModal} onLoad={imageTimerHandler} className="bg-black/40 max-w-full max-h-[277px] object-contain aspect-[3-2]" />
            </button>
            <div className="flex justify-evenly relative">
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
                        <button value={CarouselButtonAction.PREV} onClick={(e) => handleSubIndex(e.currentTarget.value)} className="bg-black/60 bg-image absolute top-1/3 left-0">
                            {'<'}
                        </button>
                        <button value={CarouselButtonAction.NEXT} onClick={(e) => handleSubIndex(e.currentTarget.value)} className="bg-black/60 absolute top-1/3 right-0">
                            {'>'}
                        </button>
                    </>
                }
            </div>
            {buttonStyle ?
                <div className="flex w-20 justify-evenly absolute bottom-3 left-[40%]">
                    <button value={CarouselButtonAction.SELECT} onClick={(e) => handleIndex(e.currentTarget.value)} className="bg-white h-2.5 w-2.5 rounded-full drop-shadow-md"></button>
                    <button value={CarouselButtonAction.SELECT} onClick={(e) => handleIndex(e.currentTarget.value)} className="bg-white h-2.5 w-2.5 rounded-full drop-shadow-md"></button>
                    <button value={CarouselButtonAction.SELECT} onClick={(e) => handleIndex(e.currentTarget.value)} className="bg-white h-2.5 w-2.5 rounded-full drop-shadow-md"></button>
                    <button value={CarouselButtonAction.SELECT} onClick={(e) => handleIndex(e.currentTarget.value)} className="bg-white h-2.5 w-2.5 rounded-full drop-shadow-md"></button>
                    <button value={CarouselButtonAction.SELECT} onClick={(e) => handleIndex(e.currentTarget.value)} className="bg-white h-2.5 w-2.5 rounded-full drop-shadow-md"></button>
                </div> :
                <>
                    <button 
                        value={CarouselButtonAction.PREV}
                        onClick={(e) => handleIndex(e.currentTarget.value)}
                        className="h-20 w-6 absolute cursor-pointer top-[35%] left-0 bg-black/60 bg-arrow-right bg-center rounded-l-xl">{'<'}                       
                    </button>

                    <button 
                        value={CarouselButtonAction.NEXT}
                        onClick={(e) => handleIndex(e.currentTarget.value)}
                        className="h-20 w-6 absolute cursor-pointer top-[35%] right-0 bg-black/60 bg-arrow-right bg-center rounded-l-xl">{'>'}                       
                    </button>

                    {/* <button 
                        value={CarouselButtonAction.NEXT} 
                        onClick={(e) => handleIndex(e.currentTarget.value)} 
                        className="h-20 w-9 absolute cursor-pointer top-[45%] right-0 bg-black/60 bg-arrow-right bg-center rounded-l-xl">{'>'}
                    </button> */}
            
                </>
            }
            {isOpen && <Modal handleIndex={handleIndex} handleOpenModal={handleOpenModal} index={index} imagesUrl={imagesUrl}></Modal>}
        </div>
    )
}