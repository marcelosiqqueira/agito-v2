import { ListButton } from "./ListButton"
import { EventsEnum } from "../const/Enums/eventsEnum"
import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"

type ListProps = {
    coverageSelected: boolean | null
    children: React.ReactNode
    handlePage: (value: string) => void,
    handleCoverageSelected: (value: string) => void
}

export function List({ coverageSelected, handlePage, handleCoverageSelected, children }: ListProps) {
    return (
        <div className="bg-gray drop-shadow-md h-[980px] w-full lg:w-[480px] lg:rounded-lg">
            <div className="text-xl pb-5">
                <button onClick={(e) => handleCoverageSelected(e.currentTarget.value)} value={EventsEnum.COVERAGES} className={`w-1/2 h-16 rounded-br-lg lg:rounded-tl-lg ${coverageSelected ? '' : 'bg-dark-gray'}`}>Coberturas</button>
                <button onClick={(e) => handleCoverageSelected(e.currentTarget.value)} value={EventsEnum.SCHEDULE} className={`w-1/2 h-16 rounded-bl-lg lg:rounded-tr-lg ${coverageSelected ? 'bg-dark-gray' : ''}`}>Agenda</button>
            </div>
            <div>
                <ul className="flex flex-col gap-3 min-h-full">
                    {children}
                </ul>
            </div>
            <div>
                <ul className="flex gap-1.5 justify-around items-center h-18 py-2 my-3">
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