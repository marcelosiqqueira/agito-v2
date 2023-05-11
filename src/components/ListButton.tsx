import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"

type ListButtonProps = {
    children: string,
    value: string,
    buttonClick: (value: string, index?: number) => void
}

export function ListButton({ value, children, buttonClick }: ListButtonProps) {
    return (
        <li className="bg-dark-gray w-10 h-10 font-bold text-sm flex justify-center align-center rounded border-4 border-dark-gray">
            <button className="bg-white w-full h-full rounded hover:bg-light-purple duration-300 hover:text-white "
                value={value}
                onClick={(e) => buttonClick(e.currentTarget.value,
                    (e.currentTarget.value === CarouselButtonAction.SELECT ? Number.parseInt(children) : undefined))}>
                {children}
            </button>
        </li>
    )
}