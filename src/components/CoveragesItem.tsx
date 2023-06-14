type ListItemProps = {
    name: string,
    date: Date,
    local: string,
    clicks: number | null,
}

export function CoveragesItem({ name, date, local, clicks }: ListItemProps) {
    return (
        <li className="w-full">
            <button onClick={() => console.log('oi')} className="bg-white text-black w-full h-28 px-6 py-2 text-start  hover:duration-300 hover:border-l-8 hover:border-l-purple lg:max-w-[400px] lg:min-w-[400px]">
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
                        <img src="/views-gray.svg" alt="Visualizações"/>
                        {clicks}
                    </div>
                </div>
            </button>
        </li>
    )
}