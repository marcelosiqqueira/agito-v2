import { ListButton } from "./ListButton"
import { EventsEnum } from "../const/Enums/eventsEnum"
import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"

type ListProps = {
    children: React.ReactNode
    handlePage: (value: string) => void,
    handleCoverageSelected: (value: string) => void
}

export function List({ handlePage, handleCoverageSelected, children }: ListProps) {
    return (
        <div className="bg-gray">
            <div className="text-xl pb-5">
                <button onClick={(e) => handleCoverageSelected(e.currentTarget.value)} value={EventsEnum.COVERAGES} className="w-1/2 h-16 rounded-br-lg">Coberturas</button>
                <button onClick={(e) => handleCoverageSelected(e.currentTarget.value)} value={EventsEnum.SCHEDULE} className="w-1/2 h-16 bg-dark-gray rounded-bl-lg">Agenda</button>
            </div>
            <div>
                <ul className="flex flex-col gap-3 justify-evenly">
                    {children}
                </ul>
            </div>
            <div>
                <ul className="flex gap-1.5 justify-around">
                    <ListButton value={CarouselButtonAction.START} buttonClick={handlePage}>{'|<'}</ListButton>
                    <ListButton value={CarouselButtonAction.PREV} buttonClick={handlePage}>{'<'}</ListButton>
                    <ListButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>1</ListButton>
                    <ListButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>2</ListButton>
                    <ListButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>3</ListButton>
                    <ListButton value={CarouselButtonAction.NEXT} buttonClick={handlePage}>{'>'}</ListButton>
                    <ListButton value={CarouselButtonAction.END} buttonClick={handlePage}>{'>|'}</ListButton>
                </ul>
            </div>
        </div>
    )
}