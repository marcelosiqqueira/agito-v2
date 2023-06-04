/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { miniFetch } from "../functions/util";
import { UrlEnum } from "../const/Enums/urlEnum";
import { AgitoEvent, MongoEvent, ResponseEvent, SelectedEvent } from "../interfaces/event";
import { ImageCarousel } from "../components/ImageCarousel";
import { HeaderButtonEnum } from "../const/Enums/headerButtonEnum";
import { EventsEnum } from "../const/Enums/eventsEnum";
import { CarouselButtonAction } from "../const/Enums/carouselButtonAction";


export function Index() {
    // const [mongoEvents, setMongoEvents] = useState<MongoEvent[]>([])
    const [coverages, setCoverages] = useState<AgitoEvent[]>([])
    const [schedule, setSchedule] = useState<AgitoEvent[]>([])
    const [coverageSelected, setCoverageSelected] = useState<boolean>(true)
    const [mainEvent, setMainEvent] = useState<SelectedEvent | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null)
    const [page, setPage] = useState<number>(1)
    const [isHovered, setIsHovered] = useState(false);

    const eventsPerPage = 5;

    const events: { data: AgitoEvent[], type: EventsEnum } = coverageSelected ?
        { data: coverages, type: EventsEnum.COVERAGES } :
        { data: schedule, type: EventsEnum.SCHEDULE }

    const homeRef = useRef<HTMLButtonElement | null>(null)
    const listRef = useRef<HTMLButtonElement | null>(null)
    const aboutRef = useRef<HTMLButtonElement | null>(null)
    const returnRef = useRef<HTMLButtonElement | null>(null)

    async function getSelectedEvent(value: string): Promise<SelectedEvent | null> {
        if (value) {
            const data: any = await miniFetch(UrlEnum.EVENTS + value)
            const auxArray: string[] = []
            data.forEach((element: any) => {
                // auxArray.unshift(`${UrlEnum.IMAGE}?id=${element.id}`)
                auxArray.unshift(`${UrlEnum.IMAGE}${element.id}`)

            })
            const event: SelectedEvent = {
                id: value,
                imagesUrl: auxArray
            }
            return event
        }
        return null;
    }

    function handleButtonClick(value: string) {
        const getImagesUrlByEvent = async () => {
            const data: any = await miniFetch(UrlEnum.EVENTS + schedule[0].id)
            const auxArray: string[] = []
            data.forEach((element: any) => {
                auxArray.unshift(`${UrlEnum.IMAGE}?id=${element.id}`)
            })
            setSelectedEvent({
                id: schedule[0].id, imagesUrl: auxArray
            })
            switch (value) {
                case HeaderButtonEnum.START:
                    homeRef.current?.scrollIntoView(true)
                    break;
                case HeaderButtonEnum.COVERAGES:
                    listRef.current?.scrollIntoView(true)
                    setCoverageSelected(true)
                    if (coverages.length > 0)
                        getImagesUrlByEvent()
                    break;
                case HeaderButtonEnum.SCHEDULE:
                    listRef.current?.scrollIntoView(true)
                    setCoverageSelected(false)
                    if (schedule.length > 0)
                        getImagesUrlByEvent()
                    break;
                case HeaderButtonEnum.ABOUT:
                    aboutRef.current?.scrollIntoView(true)
                    break;
            }
        }
    }

    function handleCoverageSelected(value: string) {
        switch (value) {
            case EventsEnum.COVERAGES:
                setCoverageSelected(true)
                break;
            case EventsEnum.SCHEDULE:
                setCoverageSelected(false)
                break
            default:
                console.error('Error selecting event type. Error location : index.tsx, handleCoverageSelected()')
        }
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
                    console.log(index)
                    if (index)
                        setPage(index)
                    break

                case CarouselButtonAction.NEXT:
                    if (page < (coverageSelected ? Math.ceil(coverages.length / eventsPerPage) : Math.ceil(schedule.length / eventsPerPage)))
                        setPage(page + 1)
                    break

                case CarouselButtonAction.END:
                    setPage(coverageSelected ? Math.ceil(coverages.length / eventsPerPage) : Math.ceil(schedule.length / eventsPerPage))
                    break
            }
        }
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function handleSelectedEvent(id: string) {

        setSelectedEvent(await getSelectedEvent(id))

        const dataEvent = coverages.find(event => event.id === id);

        if (dataEvent) {
            dataEvent.clicks = (dataEvent.clicks || 0) + 1;

            const newDataEvent = { id: dataEvent?.id, clicks: dataEvent?.clicks };
            const options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newDataEvent)
            };
            try {
                const updatedEvent = await miniFetch(UrlEnum.CLICKS, options)
                console.log(updatedEvent)
            } catch (error) {
                console.error(error);
            }
        }
    }


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const sortEvents = async (eventArray: AgitoEvent[]) => {
            eventArray.sort((a: any, b: any) => b.date - a.date);
            const currentDate = new Date()
            const coveragesArray: AgitoEvent[] = []
            const scheduleArray: AgitoEvent[] = []
            eventArray.forEach((element) => {
                if (currentDate > element.date)
                    coveragesArray.push(element)
                else
                    scheduleArray.push(element)
            })
            setCoverages(coveragesArray)

            setSchedule(scheduleArray)
            if (coveragesArray.length > 0) {
                setMainEvent(await getSelectedEvent(coveragesArray[0].id))
                setSelectedEvent(await getSelectedEvent(coveragesArray[0].id))
            }
        }

        const getData = async () => {
            const mongoEvents: MongoEvent[] = await miniFetch(UrlEnum.CLICKS);

            const data: ResponseEvent[] = await miniFetch(UrlEnum.EVENTS)
            const eventArray: AgitoEvent[] = []
            data.forEach((element: ResponseEvent) => {
                const mongoEvent = mongoEvents.find(event => event.id === element.id);
                const clicks = mongoEvent ? mongoEvent.clicks : 0;

                const stringArray = element.name.split('--')
                const [day, month, year] = stringArray[0].split('-').map(Number);
                try {
                    const event: AgitoEvent = {
                        id: element.id,
                        date: new Date(year, month - 1, day),
                        time: stringArray[1].replace(/\./g, ':'),
                        name: stringArray[2],
                        local: stringArray[3],
                        clicks: clicks
                        // pageId: 1,
                    }
                    eventArray.push(event)
                } catch (e) {
                    console.error(e)
                }

            })
            await sortEvents(eventArray)
        }
        getData()

    }, [])

    return (
        <>
            <header ref={homeRef} className="bg-purple drop-shadow-md h-20 w-full p-2 text-white flex items-center justify-between fixed z-30 m-0 lg:flex-row-reverse">
                    <div className="hidden lg:flex lg:justify-between lg:max-w-7xl lg:h-full mx-auto">
                        <Button value={HeaderButtonEnum.START} buttonClick={handleButtonClick}>início</Button>
                        <Button value={HeaderButtonEnum.COVERAGES} buttonClick={handleButtonClick}>coberturas</Button>
                        <Button value={HeaderButtonEnum.SCHEDULE} buttonClick={handleButtonClick}>agenda</Button>
                        <Button value={HeaderButtonEnum.ABOUT} buttonClick={handleButtonClick}>sobre</Button>
                    </div>

                    <img src="/logo-placeholder.svg" alt="Logo do site" className="w-20 h-14"/>

                    <button className="h-14 w-14  lg:hidden">
                        <img src="/menu.svg" alt="Menu" />
                    </button>
            </header>
            <main>
                <section className="bg-black w-full  pb-20 pt-10 lg:pb-36">
                    <div className="lg:w-[720px] lg:mx-auto pt-20">
                        <div className="relative w-full h-24 mb-8">
                            <div className="bg-orange h-14 z-20 absolute w-4/5 font-bold font-title text-3xl flex items-center justify-center text-white  drop-shadow-default">
                                <span className="uppercase drop-shadow-under">Em destaque</span>
                            </div>
                            <div className="bg-pink h-14 w-4/5 z-10  absolute top-6 right-0">

                            </div>
                        </div>
                        <div className="relative mb-8">
                            <ImageCarousel imagesUrl={mainEvent?.imagesUrl ? mainEvent?.imagesUrl : null} autoPlay={true} ></ImageCarousel>
                            <div className={` text-white absolute w-full h-1/3 bg-gradient-to-b from-black/0 to-black/90 flex items-end px-3 py-2 lg:transition-opacity lg:duration-500 bottom-0 ${isHovered ? 'lg:opacity-1' : 'lg:opacity-0'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <div className="flex-col w-full">
                                    <div className="font-bold text-2xl capitalize">
                                        <span>{coverages[0]?.name.toLowerCase()}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="flex gap-1.5 pl-0.5">
                                            <img src="/location.svg" alt="" />
                                            <span>{coverages[0]?.local}</span>
                                        </div>
                                        <div className="flex gap-1.5">
                                            <img src="/calendar.svg" alt="" />
                                            <span>{coverages[0]?.date.toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-0 right-0">
                                    <div className="flex gap-1.5 pr-3">
                                        <img src="/views.svg" alt="" />
                                        <span>{coverages[0]?.clicks}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-pink h-12 w-1/4"></div>
                    </div>
                </section>
                <section id={HeaderButtonEnum.COVERAGES} ref={listRef} className="bg-white py-20 lg:flex lg:justify-between lg:px-10 ">
                    <div className="lg:flex lg:justify-between lg:max-w-7xl lg:mx-auto lg:gap-7 bg-dots-design bg-no-repeat bg-lefttop">
                        <div className="mb-10 lg:w-[720px] lg:h-[480px]">
                            <div className="relative w-full h-52 mb-8">
                                <div className="bg-yellow h-14 z-20 absolute w-3/5 bottom-12 font-bold font-title text-3xl flex items-center justify-center text-white drop-shadow-default">
                                    <span className="uppercase drop-shadow-under">Últimas</span>
                                </div>
                                <div className="bg-black h-16 w-4/5 z-10 absolute bottom-0 right-0 font-bold font-title text-3xl flex items-center justify-center text-white drop-shadow-default">
                                    <span className="uppercase drop-shadow-under">Coberturas</span>
                                </div>
                                <img src="/hand-cursor.svg" alt="" className="h-16 w-14 absolute z-20 bottom-0 right-10"/>
                            </div>
                            {/* <ImageCarousel
                                imagesUrl={selectedEvent?.imagesUrl ? selectedEvent?.imagesUrl : null} multiple={true}></ImageCarousel> */}
                        </div>
                        {/* <List handleCoverageSelected={handleCoverageSelected}
                            coverageSelected={coverageSelected}
                            page={page}
                            eventsLength={events.data.length}
                            eventsPerPage={eventsPerPage}
                            handlePage={handlePage}>
                            {events.data.slice((page - 1) * eventsPerPage, (page * eventsPerPage)).map((element, index) => <ListItem key={index}
                                id={element.id}
                                name={element.name}
                                date={element.date}
                                time={element.time}
                                local={element.local}
                                type={events.type}
                                clicks={element.clicks ?? null}
                                handleSelectedEvent={handleSelectedEvent}></ListItem>)}
                        </List> */}
                        <div className="px-3">
                            <div className="bg-black/90 h-48 rounded-lg">
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-black h-96 px-3 py-8">
                    <div className="bg-white rounded-xl h-4/5">
                       {/* agenda */} 
                       <List></List>
                    </div>
                </section>
                <section className="bg-dark-gray pb-10 pt-5 bg-dots-design bg-no-repeat bg-righttop" ref={aboutRef}>
                    <div className="lg:max-w-7xl lg:mx-auto pt-5">
                        <div className="relative w-full h-24 mb-8">
                            <div className="bg-purple h-14 z-20 absolute top-0 right-0 w-4/5 font-bold font-title text-3xl flex items-center justify-center text-white  drop-shadow-default">
                                <span className="uppercase drop-shadow-under">Contato</span>
                            </div>
                            <div className="bg-yellow h-14 w-4/5 z-10 absolute top-6 left-0"></div>
                        </div>
                        <div className="mt-32">
                            <img src="/profile-placeholder.png" alt="Foto de perfil do Gabriel" className="w-1/2 h-1/2 lg:w-2/12 rounded-full  mb-5 mx-auto" />
                            <div className="bg-black text-white w-full h-16 mx-auto drop-shadow-md">
                                <a href="https://www.instagram.com/gabrielagito/" target="_blank" className="flex items-center justify-center gap-1.5">
                                    <img src="/instagram-logo.svg" alt="Ícone do Instagram" className="w-18 h-18" />
                                    <span>@gabrielagito</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-gray h-12 lg:h-8 flex justify-center items-center">
                <span className="text-white text-sm lg:text-xs">© 2023 - GABRIEL AGITO - TODOS OS DIREITOS RESERVADOS</span>
            </footer>
            <div className=" invisible lg:visible fixed bottom-4 right-4 p-3 ">
                <button ref={returnRef} onClick={(e) => handleButtonClick(e.currentTarget.value)} value={HeaderButtonEnum.START} className="h-12 w-12 flex-col items-center justify-center text-white font-bold text-">
                    <img src="/back-to-top.svg" alt="Voltar ao topo" className="select-"/>
                    <span className="select-none drop-shadow-default">TOPO</span>
                </button>
            </div>
        </>
    )
}