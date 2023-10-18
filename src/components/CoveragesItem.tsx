import { useState } from "react"
import { EventModal } from "./EventModal"
import { miniFetch } from "../functions/util"
import { URL } from "../const/Enums/URL"

type ListItemProps = {
    id: string,
    name: string,
    date: Date,
    local: string,
    photosIds: string[],
    clicks: number | null,
}

export function CoveragesItem({ id, name, date, local, photosIds, clicks }: ListItemProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function handleButtonClick() {
        handleOpenModal()
        patchClick()
    }

    async function patchClick() {
        const newDataEvent = { id: id, clicks: (clicks || 0) + 1 };
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDataEvent)
        };
        try {
            miniFetch(URL.CLICKS, options)
        } catch (error) {
            console.error(error);
        }
    }

    function handleOpenModal() {
        setIsOpen(!isOpen)
    }

    return (
        <li className="h-28 overflow-y-hidden">
            <div onClick={handleButtonClick} className="bg-white text-black w-full h-28 px-6 py-2 text-start border-b-gray border-b-[1px] cursor-pointer hover:duration-300 hover:border-l-8 hover:border-l-purple lg:max-w-[400px] lg:min-w-[400px]">
                <div className="leading-none font-title w-full mb-2">
                    <div className="capitalize font-bold text-2xl whitespace-nowrap text-ellipsis overflow-hidden max-w-[70%]">{name.toLowerCase()}</div>
                    <div className="font-light text-gray opacity-80 text-base">{local}</div>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-1.5">
                        <img src="/calendar-black.svg" alt="Data" />
                        {date.toLocaleString('pt-BR', { dateStyle: "short" })}
                    </div>
                    <div className="flex gap-1.5">
                        <img src="/views-gray.svg" alt="Visualizações" />
                        {clicks}
                    </div>
                </div>
            </div>
            {isOpen && <EventModal handleOpenModal={handleOpenModal} imagesUrl={photosIds}></EventModal>}
        </li>
    )
}