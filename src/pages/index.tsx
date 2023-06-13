/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { Coverages } from "../components/Coverages";
import { miniFetch } from "../functions/util";
import { UrlEnum } from "../const/Enums/urlEnum";
import { AgitoEvent, ResponseEvent, SelectedEvent } from "../interfaces/event";
import { ImageCarousel } from "../components/ImageCarousel";
import { HeaderButtonEnum } from "../const/Enums/headerButtonEnum";
import { Schedule } from "../components/Schedule";
import { Header } from "../components/Header";


export function Index() {
    const [coverages, setCoverages] = useState<AgitoEvent[]>([])
    const [schedule, setSchedule] = useState<AgitoEvent[]>([])
    const [mainEvent, setMainEvent] = useState<SelectedEvent | null>(null)

    const [isHovered, setIsHovered] = useState(false);

    const homeRef = useRef<HTMLHeadingElement | null>(null)
    const coveragesRef = useRef<HTMLButtonElement | null>(null)
    const scheduleRef = useRef<HTMLButtonElement | null>(null)
    const aboutRef = useRef<HTMLButtonElement | null>(null)
    const returnRef = useRef<HTMLButtonElement | null>(null)


    // const events: { data: AgitoEvent[], type: EventsEnum } = coverageSelected ?
    //     { data: coverages, type: EventsEnum.COVERAGES } :
    //     { data: schedule, type: EventsEnum.SCHEDULE }

    function getSelectedEvent(value: string): SelectedEvent | null {
        if (!value)
            return null
        const foundEvent = coverages.find(event => event.id === value)
        if (foundEvent) {
            const event: SelectedEvent = {
                id: value,
                imagesUrl: foundEvent.photosIds
            }
            return event
        }
        return null
    }

    function handleButtonClick(value: string) {
        switch (value) {
            case HeaderButtonEnum.START:
                homeRef.current?.scrollIntoView(true)
                break;
            case HeaderButtonEnum.COVERAGES:
                coveragesRef.current?.scrollIntoView(true)
                break;
            case HeaderButtonEnum.SCHEDULE:
                scheduleRef.current?.scrollIntoView(true)
                break;
            case HeaderButtonEnum.ABOUT:
                aboutRef.current?.scrollIntoView(true)
                break;
        }
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        const sortEvents = (eventArray: AgitoEvent[]) => {
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
                const newSelectedEvent = {
                    id: coveragesArray[0].id,
                    imagesUrl: coveragesArray[0].photosIds
                }
                setMainEvent(newSelectedEvent)
            }
        }

        const getData = async () => {
            const data: ResponseEvent[] = await miniFetch(UrlEnum.EVENTS)
            const eventArray: AgitoEvent[] = []
            data.forEach((element: ResponseEvent) => {
                const clicks = element.clicks ? element.clicks : 0;
                const stringArray = element.name.split('--')
                const [day, month, year] = stringArray[0].split('-').map(Number);
                try {
                    const event: AgitoEvent = {
                        id: element.id,
                        date: new Date(year, month - 1, day),
                        time: stringArray[1].replace(/\./g, ':'),
                        name: stringArray[2],
                        local: stringArray[3],
                        photosIds: element.photosIds.map((element: string) => UrlEnum.IMAGE + element),
                        clicks: clicks
                    }
                    eventArray.push(event)
                } catch (e) {
                    console.error(e)
                }
            })
            sortEvents(eventArray)
        }
        getData()
    }, [])

    return (
        <>
            <Header handleButtonClick={handleButtonClick}></Header>
            <main>
                <section ref={homeRef} className="bg-black w-full  pb-20 pt-10 lg:pb-36">
                    <div className="lg:w-[720px] lg:mx-auto pt-20">
                        <div className="relative w-full h-24 mb-8">
                            <div className="bg-orange h-14 z-20 absolute w-4/5 font-bold font-title text-3xl flex items-center justify-center text-white  drop-shadow-default">
                                <span className="uppercase drop-shadow-under">Em destaque</span>
                            </div>
                            <div className="bg-pink h-14 w-4/5 z-10  absolute top-6 right-0"></div>
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
                        <div className="relative bg-pink h-12 w-1/4">
                            <div className="bg-black absolute transform rotate-45 h-8 w-8 -right-4 top-2"></div>
                        </div>


                    </div>
                </section>
                <section ref={coveragesRef} className="bg-white py-20 lg:flex lg:justify-between lg:px-10 ">
                    <div className="lg:flex lg:justify-between lg:max-w-7xl lg:mx-auto lg:gap-7 bg-dots-design bg-no-repeat bg-lefttop">
                        <div className="mb-10 lg:w-[720px] lg:h-[480px]">
                            <div className="relative w-full h-56 mb-8">
                                <div className="bg-yellow h-14 z-20 absolute w-3/5 top-1/3 font-bold font-title text-3xl flex items-center justify-center text-white drop-shadow-default">
                                    <span className="uppercase drop-shadow-under">Últimas</span>
                                </div>
                                <div className="bg-black h-16 w-4/5 z-10 absolute bottom-10 right-0 font-bold font-title text-3xl flex items-center justify-center text-white drop-shadow-default">
                                    <span className="uppercase drop-shadow-under">Coberturas</span>
                                </div>
                                <img src="/hand-cursor.svg" alt="" className="h-16 w-14 absolute z-20 -bottom-2 right-10" />
                            </div>
                        </div>
                        <div className="px-3">
                            <Coverages coverages={coverages}></Coverages>
                        </div>
                    </div>
                </section>
                <section ref={scheduleRef} className="bg-dark-gray py-20">
                    <div className="relative w-full h-24 mb-8">
                        <div className="bg-black h-14 z-20 absolute top-0 right-0 w-4/5 font-bold font-title text-3xl flex items-center justify-center text-white  drop-shadow-default">
                            <span className="uppercase drop-shadow-under">Agenda</span>
                        </div>
                        <div className="bg-pink h-14 w-1/2 z-10 absolute top-6 left-0"></div>
                    </div>
                    <div className="bg-gray w-full flex-col gap-[1px] py-[1px]">
                        <Schedule schedule={schedule}></Schedule>
                    </div>
                </section>
                <section className="bg-gray pt-8 " ref={aboutRef}>
                    <div className="lg:max-w-7xl lg:mx-auto pt-5 bg-dots-design bg-no-repeat bg-righttop">
                        <div className="relative w-full h-24 mb-8">
                            <div className="bg-purple h-14 z-20 absolute top-5 right-0 w-4/5 font-bold font-title text-3xl flex items-center justify-center text-white  drop-shadow-default">
                                <span className="uppercase drop-shadow-under">Contato</span>
                            </div>
                            <div className="bg-yellow h-14 w-4/5 z-10 absolute bottom-0 left-0"></div>
                        </div>
                        <div className="mt-10 ">
                            <img src="/foto-gabriel-agito.jpg" alt="Foto de perfil do Gabriel" className="w-1/2 h-1/2 sm:w-1/3 md:w-1/4 lg:w-2/12 rounded-full  mb-5 mx-auto" />
                            <div className="bg-black text-white w-full h-24 mx-auto flex items-center justify-center">
                                <a href="https://www.instagram.com/gabrielagito/" target="_blank" className="flex items-center justify-center gap-1.5">
                                    <img src="/instagram-logo.svg" alt="Ícone do Instagram" className="w-18 h-18" />
                                    <span>@gabrielagito</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-purple h-12 lg:h-8 flex justify-center items-center text-center">
                <span className="text-white text-sm lg:text-xs uppercase">© 2023 - Gabriel Agito - Todos os direitos reservados</span>
            </footer>
            <div className=" invisible lg:visible fixed bottom-4 right-4 p-3 ">
                <button ref={returnRef} onClick={(e) => handleButtonClick(e.currentTarget.value)} value={HeaderButtonEnum.START} className="h-12 w-12 flex-col items-center justify-center text-white font-bold text-">
                    <img src="/back-to-top.svg" alt="Voltar ao topo" className="select-" />
                    <span className="select-none drop-shadow-default">TOPO</span>
                </button>
            </div>
        </>
    )
}