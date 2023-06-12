import { CoveragesButton } from "./CoveragesButton"
import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"
import { CoveragesItem } from "./CoveragesItem"
import { AgitoEvent } from "../interfaces/event"
import { useState } from "react"

type ListProps = {
    coverages: AgitoEvent[],
}

export function Coverages({ coverages }: ListProps) {

    const [page, setPage] = useState<number>(1)
    const coveragesPerPage = 5;

    function pageLabel(numb: number) {
        switch (numb) {
            case 1:
                if (page === 1)
                    return 1
                if (page === Math.ceil(coverages.length / coveragesPerPage))
                    return page - 2
                return page - 1
            case 2:
                if (page === 1)
                    return page + 1
                if (page === Math.ceil(coverages.length / coveragesPerPage))
                    return page - 1
                return page
            case 3:
                if (page === 1)
                    return page + 2
                if (page === Math.ceil(coverages.length / coveragesPerPage))
                    return page
                return page + 1
        }
        return 0
    }

    function handlePage(value: string, index?: number) {
        if (value) {
            switch (value) {
                case CarouselButtonAction.START:
                    setPage(1)
                    break
                case CarouselButtonAction.PREV:
                    if (page - 1 > 0)
                        setPage(page - 1)
                    break
                case CarouselButtonAction.SELECT:
                    if (index)
                        setPage(index)
                    break
                case CarouselButtonAction.NEXT:
                    if (page < Math.ceil(coverages.length / coveragesPerPage))
                        setPage(page + 1)
                    break
                case CarouselButtonAction.END:
                    setPage(Math.ceil(coverages.length / coveragesPerPage))
                    break
            }
        }
    }

    // async function handleSelectedCoverage(id: string) {
    //     setSelectedCoverage(getSelectedEvent(id))
    //     const dataEvent = coverages.find(event => event.id === id);
    //     if (dataEvent) {
    //         dataEvent.clicks = (dataEvent.clicks || 0) + 1;
    //         const newDataEvent = { id: dataEvent?.id, clicks: dataEvent?.clicks };
    //         const options = {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(newDataEvent)
    //         };
    //         try {
    //             await miniFetch(UrlEnum.CLICKS, options)
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // }


    return (
        <>
            <div className="bg-gray bg-opacity-40 h-12 px-6 rounded-3xl flex justify-start items-center shadow-sm">
                <img src="" alt="" />
                <input type="search" name="search-coverage-input" id="search-coverage-input" placeholder="Pesquisar evento..." className="bg-clip-text placeholder:text-dark-gray" />
            </div>
            <ul className="bg-purple">
                {coverages.slice((page - 1) * coveragesPerPage, (page * coveragesPerPage)).map((coverage: AgitoEvent, index: number) =>
                    <CoveragesItem {...coverage} key={index}></CoveragesItem>
                )}
            </ul>
            <ul className="flex justify-between text-black">
                <CoveragesButton value={CarouselButtonAction.START} buttonClick={handlePage}>⬅️</CoveragesButton>
                <CoveragesButton value={CarouselButtonAction.PREV} buttonClick={handlePage}>⬅️</CoveragesButton>
                <CoveragesButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>{pageLabel(1)?.toString()}</CoveragesButton>
                <CoveragesButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>{pageLabel(2)?.toString()}</CoveragesButton>
                <CoveragesButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>{pageLabel(3)?.toString()}</CoveragesButton>
                <CoveragesButton value={CarouselButtonAction.NEXT} buttonClick={handlePage}>➡️</CoveragesButton>
                <CoveragesButton value={CarouselButtonAction.END} buttonClick={handlePage}>➡️</CoveragesButton>
            </ul>
        </>
    )
}



{/* <div className="bg-gray drop-shadow-md  w-full lg:w-96 lg:rounded-lg">
<div className="text-xl pb-5">
    <button onClick={(e) => handleCoverageSelected(e.currentTarget.value)} value={coveragesEnum.COVERAGES} className={`w-1/2 h-16 rounded-br-lg lg:rounded-tl-lg ${coverageSelected ? '' : 'bg-dark-gray'}`}>Coberturas</button>
    <button onClick={(e) => handleCoverageSelected(e.currentTarget.value)} value={coveragesEnum.SCHEDULE} className={`w-1/2 h-16 rounded-bl-lg lg:rounded-tr-lg ${coverageSelected ? 'bg-dark-gray' : ''}`}>Agenda</button>
</div>
<div>
    <ul className="flex flex-col gap-3 min-h-full">
        {children}
    </ul>
</div>
<div>
    <ul className="flex gap-1.5 justify-around items-center h-18 py-2 px-4 my-3">
        <CoveragesButton value={CarouselButtonAction.START} buttonClick={handlePage}>{'|<'}</CoveragesButton>
        <CoveragesButton value={CarouselButtonAction.PREV} buttonClick={handlePage}>{'<'}</CoveragesButton>
        <CoveragesButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>{pageLabel(1)?.toString()}</CoveragesButton>
        <CoveragesButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>{pageLabel(2)?.toString()}</CoveragesButton>
        <CoveragesButton value={CarouselButtonAction.SELECT} buttonClick={handlePage}>{pageLabel(3)?.toString()}</CoveragesButton>
        <CoveragesButton value={CarouselButtonAction.NEXT} buttonClick={handlePage}>{'>'}</CoveragesButton>
        <CoveragesButton value={CarouselButtonAction.END} buttonClick={handlePage}>{'>|'}</CoveragesButton>
    </ul>
</div>
</div> */}

// 1 -> 0 , 6
// 2 -> 6 , 12
// 3 -> 12 , 18