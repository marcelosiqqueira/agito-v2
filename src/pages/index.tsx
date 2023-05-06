import { Button } from "../components/Button";
import { List } from "../components/List";
import { ListItem } from "../components/ListItem";

export function Index() {
    return (
        <>
            <header>
                <div>
                    <Button selected={false}></Button>
                    <Button selected={false}></Button>
                    <Button selected={false}></Button>
                    <Button selected={false}></Button>
                </div>
                <div className="bg-white"></div>
            </header>
            <main>
                <section>
                    <div>
                        <img src="" alt="" />
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
                        Seja bem-vindo ao meu site de eventos, onde você encontrará uma seleção das minhas melhores fotos de eventos recentes. Estou sempre buscando capturar as emoções e momentos mais significativos de cada ocasião,
                        de forma que essas imagens se tornem uma recordação inesquecível.
                        Obrigado por visitar e espero que goste das minhas fotos tanto quanto eu gostei de capturá-las!
                    </p>
                </section>
                <section>
                    <div>
                        <img src="" alt="" />
                        <div>
                            <img src="" alt="" />
                            <img src="" alt="" />
                            <img src="" alt="" />
                            <img src="" alt="" />
                        </div>
                    </div>
                    <List>
                        <ListItem></ListItem>
                        <ListItem></ListItem>
                        <ListItem></ListItem>
                        <ListItem></ListItem>
                        <ListItem></ListItem>
                        <ListItem></ListItem>
                    </List>
                </section>
                <section>
                    <img src="" alt="" />
                    <span></span>
                    <img src="" alt="" />
                </section>
            </main>
            <footer>
                <span>© 2023 - GABRIEL AGITO - TODOS OS DIREITOS RESERVADOS</span>
            </footer>
        </>
    )
}