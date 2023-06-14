import { ButtonHTMLAttributes } from "react"

type ButtonProps = {
    value: string,
    children: string,
    buttonAtt?: CustomButtonAtt,
    buttonClick: ((value: string) => void) | null,
}

type CustomButtonAtt = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' & 'value'>

export function Button({ buttonClick, children, value, buttonAtt }: ButtonProps & CustomButtonAtt) {
    return (
        <button {...buttonAtt} className={buttonAtt?.className ?? `bg-transparent lg:h-full px-7 uppercase font-bold text-xl active:scale-90 duration-300`} onClick={buttonClick ?
            ((e) => buttonClick(e.currentTarget.value)) :
            (() => console.log(`Button error. Button onClick does not exist. Value : ${children}`))}
            value={value}
        >{children}</button>
    )
}




