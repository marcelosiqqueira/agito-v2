import { ListButton } from "./ListButton"
import { EventsEnum } from "../const/Enums/eventsEnum"
import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"

type ListProps = {
    page: number,
    eventsLength: number
    eventsPerPage: number,
    coverageSelected: boolean | null
    children: React.ReactNode
    handlePage: (value: string) => void,
    handleCoverageSelected: (value: string) => void
}

export function List({ coverageSelected, handlePage, handleCoverageSelected, page, eventsLength, eventsPerPage, children }: ListProps) {

    function pageLabel(numb: number) {
        switch (numb) {
            case 1:
                if (page === 1)
                    return 1
                if (page === Math.ceil(eventsLength / eventsPerPage))
                    return page - 2
                return page - 1
            case 2:
                if (page === 1)
                    return page + 1
                if (page === Math.ceil(eventsLength / eventsPerPage))
                    return page - 1
                return page
            case 3:
                if (page === 1)
                    return page + 2
                if (page === Math.ceil(eventsLength / eventsPerPage))
                    return page
                return page + 1
        }
        return 0
    }


    return (
        <div className="bg-gray drop-shadow-md  w-full lg:w-96 lg:rounded-lg">
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
                <ul className="flex gap-1.5 justify-around items-center h-18 py-2 px-4 my-3">
                    <ListButton value={CarouselButtonAction.START} buttonClick={handlePage}>{'|<'}</ListButton>
                    <ListButton value={CarouselButtonAction.PREV} buttonClick={handlePage}>{'<'}</ListButton>
                    <ListButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>{pageLabel(1)?.toString()}</ListButton>
                    <ListButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>{pageLabel(2)?.toString()}</ListButton>
                    <ListButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>{pageLabel(3)?.toString()}</ListButton>
                    <ListButton value={CarouselButtonAction.NEXT} buttonClick={handlePage}>{'>'}</ListButton>
                    <ListButton value={CarouselButtonAction.END} buttonClick={handlePage}>{'>|'}</ListButton>
                </ul>
            </div>
        </div>
    )
}