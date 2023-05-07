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
        <li>
            <button onClick={() => handleSelectedEvent(id)}>
                <div>
                    <img src="" alt="" />
                    <span>{name}</span>
                </div>
                <div>
                    <div>
                        <img src="" alt="" />
                        <span>{date.toLocaleDateString('pt-BR')}</span>
                        {type === EventsEnum.SCHEDULE && <span>Horario : {time}</span>}
                    </div>
                    <div>
                        <img src="" alt="" />
                        <span>{local}</span>
                    </div>
                </div>
                {type === EventsEnum.COVERAGES && <div>
                    <img src="" alt="" />
                    <span>{clicks ?? 'Clicks : N/A'}</span>
                </div>}
            </button>
        </li>
    )
}