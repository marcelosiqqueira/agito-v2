import { EventsEnum } from "../const/Enums/eventsEnum"

type ListItemProps = {
    id: string,
    name: string,
    date: Date,
    time: string,
    local: string,
    clicks: number | null,
    type: EventsEnum
    handleSelectedEvent: (value: string) => void,
}

export function ListItem({ id, name, date, time, local, clicks, type, handleSelectedEvent }: ListItemProps) {
    return (
        <li className="px-5 font-bold">
            <button onClick={() => handleSelectedEvent(id)} className="bg-white border-dark-gray border-4 rounded-lg w-full h-30 p-4 text-xl text-light-purple">
                <div className="flex gap-1.5 align-center">
                    <img src="/star.svg" alt="" />
                    <span>{name}</span>
                </div>
                <div className="flex gap-1.5 align-center">
                    <img src="/clock.svg" alt="" />
                    <span>{date.toLocaleDateString('pt-BR')}</span>
                    {type === EventsEnum.SCHEDULE && <span>{time}</span>}
                </div>
                <div className="flex justify-between align-center">
                    <div className="flex gap-1.5 ">
                        <img src="/location.svg" alt="" />
                        <span>{local}</span>
                    </div>
                    {type === EventsEnum.COVERAGES && <div className="flex gap-2 font-normal">
                        <img src="/clicks.svg" alt=""/>
                        <span>{clicks ?? 'Clicks : N/A'}</span>
                    </div>}
                </div>
            </button>
        </li>
    )
}