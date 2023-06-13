type ScheduleItemProps = {
    id: string,
    name: string,
    date: Date,
    local: string,
}

export function ScheduleItem({ id, name, date, local }: ScheduleItemProps) {
    function monthToReducedString(month: number) {
        switch (month) {
            case 0:
                return 'JAN'
            case 1:
                return 'FEV'
            case 2:
                return 'MAR'
            case 3:
                return 'ABR'
            case 4:
                return 'MAI'
            case 5:
                return 'JUN'
            case 6:
                return 'JUL'
            case 7:
                return 'AGO'
            case 8:
                return 'SET'
            case 9:
                return 'OUT'
            case 10:
                return 'NOV'
            case 11:
                return 'DEZ'
            default:
                return ''
        }
    }

    return (
        <li className="bg-dark-gray text-white h-20 py-2 px-2 w-full flex items-center overflow-x-auto">
            <div className="border-l-yellow border-l-4 w-full h-5/6 py-1 px-2 flex  items-center gap-4">
                <div className="flex-col font-bold items-center justify-center text-center">
                    <span className="text-3xl block">{date.getDay()}</span>
                    <span className="">{monthToReducedString(date.getUTCMonth())}</span>
                </div>
                <div className="flex-col font-title">
                    <span className="block text-2xl font-bold">{name}</span>
                    <span className="text-gray text-sm">{local}</span>
                </div>
            </div>
        </li>
    )
}