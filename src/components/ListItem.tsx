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
        <li className="relative px-5">
            <button onClick={() => handleSelectedEvent(id)} className="bg-white border-dark-gray border-4 rounded-lg w-full h-24 p-4 text-xl text-light-purple">
                <div className="flex font-bold gap-1.5">
                    <img src="src/assets/star.svg" alt="" />
                    <span>{name}</span>
                </div>
                <div className="flex gap-2.5 font-bold">
                    <div className="flex gap-1.5">
                        <img src="src/assets/clock.svg" alt="" />
                        <span>{date.toLocaleDateString('pt-BR')}</span>
                        {type === EventsEnum.SCHEDULE && <span>Horario : {time}</span>}
                    </div>
                    <div className="flex gap-1.5">
                        <img src="src/assets/location.svg" alt="" />
                        <span>{local}</span>
                    </div>
                </div>
                {type === EventsEnum.COVERAGES && <div className="absolute top-1 right-8 flex gap-2">
                    <img src="src/assets/clicks.svg" alt=""/>
                    <span>{clicks ?? 'Clicks : N/A'}</span>
                </div>}
            </button>
        </li>
    )
}