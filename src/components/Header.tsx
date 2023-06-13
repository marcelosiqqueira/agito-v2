import { HeaderButtonEnum } from "../const/Enums/headerButtonEnum";
import { Button } from "./Button";

type HeaderProps = {
    handleButtonClick: (value: string) => void,
}

export function Header({ handleButtonClick }: HeaderProps) {
    return (
        <header className="bg-purple drop-shadow-md h-20 w-full p-2 text-white flex items-center justify-between fixed z-30 m-0 lg:flex-row-reverse">
            <div className="hidden lg:flex lg:justify-between lg:max-w-7xl lg:h-full mx-auto">
                <Button value={HeaderButtonEnum.START} buttonClick={handleButtonClick}>início</Button>
                <Button value={HeaderButtonEnum.COVERAGES} buttonClick={handleButtonClick}>coberturas</Button>
                <Button value={HeaderButtonEnum.SCHEDULE} buttonClick={handleButtonClick}>agenda</Button>
                <Button value={HeaderButtonEnum.ABOUT} buttonClick={handleButtonClick}>sobre</Button>
            </div>

            <img src="/logo-placeholder.svg" alt="Logo do site" className="w-20 h-14" />

            <button className="h-14 w-14  lg:hidden">
                <img src="/menu.svg" alt="Menu" />
            </button>
        </header>
    )
}