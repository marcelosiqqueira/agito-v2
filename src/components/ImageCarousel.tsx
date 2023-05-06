import { useState } from "react"
import { Modal } from "./Modal"

type ImageCarouselProps = {
    imagesUrl: string[] | null,
    buttonStyle?: boolean,
    multiple?: boolean,
}

enum Value {
    LEFT = 'left',
    RIGHT = 'right'
}

export function ImageCarousel({ imagesUrl, buttonStyle, multiple }: ImageCarouselProps) {
    const [index, setIndex] = useState<number>(0)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function handleIndex(stringValue: string) {
        if (imagesUrl) {
            switch (stringValue) {
                case Value.LEFT:
                    if ((index - 1) >= 0)
                        setIndex(index - 1)
                    break
                case Value.RIGHT:
                    if ((index + 1 <= imagesUrl.length))
                        setIndex(index + 1)
                    break
            }
        }
    }

    function handleOpenModal() {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <button>
                <img src={imagesUrl ? imagesUrl[index] ?? '/error' : '/error'} alt="Foto do evento" onClick={handleOpenModal} />
            </button>
            {multiple && <div>
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
            </div>}
            {buttonStyle ?
                <>
                    <button onClick={(e) => handleIndex(e.currentTarget.value)}>♦</button>
                    <button onClick={(e) => handleIndex(e.currentTarget.value)}>♦</button>
                    <button onClick={(e) => handleIndex(e.currentTarget.value)}>♦</button>
                    <button onClick={(e) => handleIndex(e.currentTarget.value)}>♦</button>
                    <button onClick={(e) => handleIndex(e.currentTarget.value)}>♦</button>
                </> :
                <>
                    <button value={Value.LEFT} onClick={(e) => handleIndex(e.currentTarget.value)}>{'<'}</button>
                    <button value={Value.RIGHT} onClick={(e) => handleIndex(e.currentTarget.value)}>{'>'}</button>
                </>
            }
            {isOpen && <Modal handleOpenModal={handleOpenModal} index={index} imagesUrl={imagesUrl}></Modal>}

        </div>
    )
}