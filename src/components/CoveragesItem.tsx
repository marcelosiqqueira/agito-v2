type ListItemProps = {
    name: string,
    date: Date,
    local: string,
    clicks: number | null,
}

export function CoveragesItem({ name, date, local, clicks }: ListItemProps) {
    return (
        <li>
            <button onClick={() => console.log('oi')} className="bg-white text-black border-dark-gray border w-full h-28 px-6 py-2 text-xl text-start hover:bg-purple/40 hover:text-white duration-200">
                <div className="leading-none">
                    <div className="capitalize font-semibold">{name.toLowerCase()}</div>
                    <div className="font-light text-gray opacity-80">{local}</div>
                </div>
                <div className="flex justify-between">
                    <div className="flex">
                        <img src="./calendar.svg" alt="calendar icon" />
                        {date.toLocaleString('pt-BR', { dateStyle: "short" })}
                    </div>
                    <div className="flex">
                        <img src="./views.svg" alt="eye icon" />
                        {clicks}
                    </div>
                </div>
            </button>
        </li>
    )
}