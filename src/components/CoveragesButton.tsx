import { CarouselButtonAction } from "../const/Enums/carouselButtonAction"

type ListButtonProps = {
    children: string,
    value: string,
    buttonClick: (value: string, index?: number) => void
}

export function CoveragesButton({ value, children, buttonClick }: ListButtonProps) {
    return (
        <li className=" w-10 h-10 font-bold text-lg flex justify-center items-center">
            <button className="bg-white w-full h-full hover:bg-purple/40 duration-300"
                value={value}
                onClick={(e) => buttonClick(e.currentTarget.value,
                    (e.currentTarget.value === CarouselButtonAction.SELECT ? Number.parseInt(children) : undefined))}>
                {children}
            </button>
        </li>
    )
}