import { ListButton } from "./ListButton"
import { EventsEnum } from "../const/Enums/eventsEnum"

type ListProps = {
    children: React.ReactNode
    handleCoverageSelected: (value: string) => void
}

export function List({ handleCoverageSelected, children }: ListProps) {
    return (
        <div className="bg-gray">
            <div className="text-xl">
                <button onClick={(e) => handleCoverageSelected(e.currentTarget.value)} value={EventsEnum.COVERAGES} className="w-1/2">Coberturas</button>
                <button onClick={(e) => handleCoverageSelected(e.currentTarget.value)} value={EventsEnum.SCHEDULE}>Agenda</button>
            </div>
            <div>
                <ul>
                    {children}
                </ul>
            </div>
            <div>
                <ul className="flex gap-1.5 justify-around">
                    <ListButton>{'|<'}</ListButton>
                    <ListButton>{'<'}</ListButton>
                    <ListButton>1</ListButton>
                    <ListButton>2</ListButton>
                    <ListButton>3</ListButton>
                    <ListButton>{'>'}</ListButton>
                    <ListButton>{'>|'}</ListButton>
                </ul>
            </div>
        </div>
    )
}