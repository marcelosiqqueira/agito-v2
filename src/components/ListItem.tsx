type ListItemProps = {
    id: string,
    name: string,
    date: Date,
    local: string,
    clicks: number | null,
    handleSelectedEvent: (value: string) => void,
}

export function ListItem({ id, name, date, local, clicks, handleSelectedEvent }: ListItemProps) {
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
                        <span>{date.toLocaleString('pt-BR')}</span>
                    </div>
                    <div>
                        <img src="" alt="" />
                        <span>{local}</span>
                    </div>
                </div>
                <div>
                    <img src="" alt="" />
                    <span>{clicks ?? 'N/A'}</span>
                </div>
            </button>
        </li>
    )
}