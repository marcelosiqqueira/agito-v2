import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";
import { miniFetch } from "../functions/util";
import { Url } from "../const/url";
import { AgitoEvent, ResponseEvent, SelectedEvent } from "../interfaces/event";
import { ImageCarousel } from "../components/ImageCarousel";


export function Index() {
    const [coverages, setCoverages] = useState<AgitoEvent[]>([])
    const [schedule, setSchedule] = useState<AgitoEvent[]>([])
    const [coverageSelected, setCoverageSelected] = useState(true)
    const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null)

    const events: AgitoEvent[] = coverageSelected ? coverages : schedule

    useEffect(() => {
        const sortEvents = (eventArray: AgitoEvent[]) => {
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
            if (coveragesArray.length > 0)
                handleSelectedEvent(coveragesArray[0].id)
        }

        const getData = async () => {
            const data: ResponseEvent[] = await miniFetch(Url.EVENTS)
            const eventArray: AgitoEvent[] = []
            data.forEach((element: ResponseEvent) => {
                const stringArray = element.name.split('--')
                const event: AgitoEvent = {
                    id: element.id,
                    date: new Date(stringArray[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2-$1-$3')),
                    time: stringArray[1],
                    name: stringArray[2],
                    local: stringArray[3],
                    clicks: null
                    // pageId: 1,
                }
                eventArray.push(event)
            })
            sortEvents(eventArray)
        }
        getData()
    }, [])

    const homeRef = useRef<HTMLButtonElement | null>(null)
    const coveragesRef = useRef<HTMLButtonElement | null>(null)
    const scheduleRef = useRef<HTMLButtonElement | null>(null)
    const aboutRef = useRef<HTMLButtonElement | null>(null)

    function handleButtonClick(value: string) {
        switch (value) {
            case 'início':
                homeRef.current?.scrollIntoView(true)
                break;
            case 'coberturas':
                coveragesRef.current?.scrollIntoView(true)
                break;
            case 'agenda':
                scheduleRef.current?.scrollIntoView(true)
                break;
            case 'sobre':
                aboutRef.current?.scrollIntoView(true)
                break;
        }
    }

    function handleCoverageSelected(value: string) {
        switch (value) {
            case 'Coberturas':
                setCoverageSelected(true)
                break;
            case 'Agenda':
                setCoverageSelected(false)
                break
            default:
                console.error('Error selecting event type. Error location : handleCoverageSelected()')
        }
    }

    async function handleSelectedEvent(value: string) {
        if (value) {
            const data = await miniFetch(Url.EVENTS + value)
            const auxArray: string[] = []
            data.forEach((element: any) => {
                auxArray.push(`${Url.IMAGE}?id=${element.id}`)
            })
            const event: SelectedEvent = {
                id: value,
                imagesUrl: auxArray
            }
            setSelectedEvent(event)
        }
    }

    return (
        <>
            <header>
                <div className=" hidden"></div>
                <div>
                    <Button buttonClick={handleButtonClick}>início</Button>
                    <Button buttonClick={handleButtonClick}>coberturas</Button>
                    <Button buttonClick={handleButtonClick}>agenda</Button>
                    <Button buttonClick={handleButtonClick}>sobre</Button>
                </div>
                <div className="bg-white"></div>
            </header>
            <main>
                <section>
                    <div>
                        <ImageCarousel imagesUrl={null}></ImageCarousel>
                        <div>
                            <div>
                                <img src="" alt="" />
                                Evento
                            </div>
                            <div>
                                <img src="" alt="" />
                                Local
                            </div>
                            <div>
                                <img src="" alt="" />
                                11 fev 2020
                            </div>
                            <div>
                                <img src="" alt="" />
                                10
                            </div>
                        </div>
                    </div>
                    <p>
                        Seja bem-vindo ao meu site de eventos, onde você encontrará uma seleção das minhas melhores fotos de eventos recentes.
                        Estou sempre buscando capturar as emoções e momentos mais significativos de cada ocasião,
                        de forma que essas imagens se tornem uma recordação inesquecível.
                        Obrigado por visitar e espero que goste das minhas fotos tanto quanto eu gostei de capturá-las!
                    </p>
                </section>
                <section>
                    <div>
                        <ImageCarousel imagesUrl={selectedEvent?.imagesUrl ? selectedEvent?.imagesUrl : null}></ImageCarousel>
                    </div>
                    <List handleCoverageSelected={handleCoverageSelected}>
                        {events.map((element, index) => <ListItem key={index}
                            id={element.id}
                            name={element.name}
                            date={element.date} local={element.local}
                            clicks={element.clicks}
                            handleSelectedEvent={handleSelectedEvent}></ListItem>)}
                    </List>
                </section>
                <section>
                    <img src="" alt="" />
                    <div>
                        <span>Sobre mim</span>
                        <span>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                            Phasellus pretium nulla vitae dignissim venenatis. Nulla sit amet tortor sem. Nam a digni</span>
                    </div>
                    <img src="" alt="" />
                </section>
            </main>
            <footer>
                <span>© 2023 - GABRIEL AGITO - TODOS OS DIREITOS RESERVADOS</span>
            </footer>
            <div className="hidden">
                <img src="" alt="" />
            </div>
        </>
    )
}