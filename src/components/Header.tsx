import { useState } from "react";
import { HeaderButton } from "../const/Enums/HeaderButton";
import { Button } from "./Button";

type HeaderProps = {
    handleButtonClick: (value: string) => void,
}

export function Header({ handleButtonClick }: HeaderProps) {
    const [selected, setSelected] = useState<boolean>(false)

    function handleMenuButtonClick() {
        setSelected(!selected)
    }

    return (
        <header className="bg-purple drop-shadow-md h-20 w-full p-2 text-white flex items-center justify-between lg:justify-center fixed z-40 m-0">
            <img src="/logo-placeholder.svg" alt="Logo do site" className="lg:absolute w-20 h-14 lg:left-0 lg:ml-2" />
            <nav className="hidden lg:flex lg:justify-between lg:max-w-7xl lg:h-full lg:w-8/12">
                <Button value={HeaderButton.START} buttonClick={handleButtonClick}>início</Button>
                <Button value={HeaderButton.COVERAGES} buttonClick={handleButtonClick}>coberturas</Button>
                <Button value={HeaderButton.SCHEDULE} buttonClick={handleButtonClick}>agenda</Button>
                <Button value={HeaderButton.ABOUT} buttonClick={handleButtonClick}>contato</Button>
            </nav>
            <div className="relative h-14 w-48 flex flex-col gap-y-2 items-end lg:hidden" onClick={handleMenuButtonClick}>
                <img src="/menu.svg" alt="Menu" />
                {selected &&
                    <div className="flex flex-col w-full h-80 bg-purple/90 rounded-lg gap-5 py-5">
                        <Button value={HeaderButton.START} buttonClick={handleButtonClick}>início</Button>
                        <Button value={HeaderButton.COVERAGES} buttonClick={handleButtonClick}>coberturas</Button>
                        <Button value={HeaderButton.SCHEDULE} buttonClick={handleButtonClick}>agenda</Button>
                        <Button value={HeaderButton.ABOUT} buttonClick={handleButtonClick}>contato</Button>
                    </div>}
            </div>
        </header>
    )
}