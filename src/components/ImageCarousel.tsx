import { useEffect, useRef, useState } from "react"
import { Modal } from "./Modal"
import { CarouselButtonAction } from "../const/Enums/CarouselButtonAction"
import { AgitoEvent } from "../interfaces/event"

type ImageCarouselProps = {
    event: AgitoEvent | null,
    autoPlay?: boolean,
    multiple?: boolean,
}

export function ImageCarousel({ autoPlay, multiple, event }: ImageCarouselProps) {
    const [index, setIndex] = useState<number>(0)
    const [subIndex, setSubIndex] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const divRef = useRef<HTMLDivElement | null>(null)

    let timer: undefined | NodeJS.Timeout = undefined

    const maxMultipleSize = (): number => {
        if (event?.photosIds) {
            if (event?.photosIds.length < 4)
                return event?.photosIds.length
            return 4
        }
        return 0
    }

    function handleIndex(stringValue: string, id?: number) {
        if (event?.photosIds) {
            switch (stringValue) {
                case CarouselButtonAction.PREV:
                    if ((index - 1) >= 0)
                        setIndex(index - 1)
                    break
                case CarouselButtonAction.NEXT:
                    if ((index + 1) < event?.photosIds.length)
                        setIndex(index + 1)
                    break
                case CarouselButtonAction.SELECT:
                    if (id || id === 0)
                        setIndex(id)
                    break
            }
        }
    }

    function handleSubIndex(stringValue: string) {
        if (event?.photosIds) {
            switch (stringValue) {
                case CarouselButtonAction.PREV:
                    if ((subIndex - 1) >= 0)
                        setSubIndex(subIndex - 1)
                    break
                case CarouselButtonAction.NEXT:
                    if ((subIndex + 4 < event?.photosIds.length))
                        setSubIndex(subIndex + 1)
                    break
            }
        }
    }

    function handleOpenModal() {
        setIsOpen(!isOpen)
        divRef.current?.focus()
        clearTimeout(timer)
    }

    function imageTimerHandler() {
        if (event?.photosIds && autoPlay) {
            timer = setTimeout(() => {
                if ((index + 1) < event?.photosIds.length)
                    setIndex(index + 1)
                else
                    setIndex(0)
            }, 5000)
        }
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        setIndex(0)
        setSubIndex(0)
    }, [event?.photosIds])

    return (
        <>
            <div className="text-white bg-black/90 mx-auto flex-col justify-center items-center relative min-h-[265px] w-full lg:max-w-[56rem] lg:rounded-lg lg:overflow-hidden object-contain"
                ref={divRef} tabIndex={1} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {event ? <>
                    <button className="flex items-center justify-center w-full h-full">
                        <img src={event?.photosIds ? event?.photosIds[index] ?? '/error' : '/error'} alt="Event photo" onClick={handleOpenModal}
                            onLoad={isOpen === false ? imageTimerHandler : undefined} className="aspect-[3/2] object-contain h-[265px] lg:h-[37rem] w-full" />
                    </button>
                    {multiple && <div className="flex justify-evenly relative  lg:-bottom-28 bg-black/40">
                        {multiple && (event?.photosIds && event?.photosIds.slice(subIndex, maxMultipleSize() + subIndex).map((_, elementIndex) =>
                            <button
                                key={elementIndex}
                                value={CarouselButtonAction.SELECT}
                                onClick={(e) => handleIndex(e.currentTarget.value, elementIndex + subIndex)} className="bg-black/40">
                                <img src={event?.photosIds[elementIndex + subIndex]}
                                    alt="Mini event photo" height={55} width={83} className="h-20 w-22 object-contain aspect-[3-2] max-w-full" />
                            </button>))
                        }
                        {multiple &&
                            <>
                                <button value={CarouselButtonAction.PREV} onClick={(e) => handleSubIndex(e.currentTarget.value)} className="h-10 w-10 absolute cursor-pointer top-1/3 left-2 bg-arrow
                             bg-dark-gray/60 bg-center bg-contain rounded-full hover:bg-white/70 duration-200">
                                    {''}
                                </button>
                                <button value={CarouselButtonAction.NEXT} onClick={(e) => handleSubIndex(e.currentTarget.value)} className="h-10 w-10 absolute cursor-pointer top-1/3 right-2 bg-dark-gray/60 bg-arrow-right bg-center 
                            bg-contain rounded-full hover:bg-white/70 duration-200">
                                    {''}
                                </button>
                            </>
                        }
                    </div>}
                    {isOpen && <Modal handleIndex={handleIndex} handleOpenModal={handleOpenModal} index={index} imagesUrl={event?.photosIds ?? []}></Modal>}
                    <div className={` text-white absolute w-full h-1/3 bg-gradient-to-b from-black/0 to-black/90 flex items-end px-3 py-2 lg:transition-opacity lg:duration-500 bottom-0 
                    ${isHovered ? 'lg:opacity-1' : 'lg:opacity-0'}`}>
                        <div className="flex-col w-full">
                            <div className="font-bold text-2xl capitalize">
                                <span>{event?.name}</span>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex gap-1.5 pl-0.5">
                                    <img src="/location.svg" alt="Location icon" />
                                    <span>{event?.local}</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <img src="/calendar.svg" alt="Calendar icon" />
                                    <span>{event?.date.toLocaleString('pt-BR', { dateStyle: "short" })}</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-0">
                            <div className="flex gap-1.5 pr-3">
                                <img src="/views.svg" alt="Eye icon" />
                                <span>{event?.clicks}</span>
                            </div>
                        </div>
                    </div>
                </> :
                    <div className="flex items-center justify-center min-w-full min-h-[265px] h-full">
                        <img src="loading.svg" alt="Loading icon" />
                    </div>
                }
            </div >
        </>
    )
}