type ButtonProps = {
    value: string,
    children: string,
    buttonClick: ((value: string) => void) | null,
}

export function Button({ buttonClick, children, value }: ButtonProps) {
    return (
        <button className={`bg-transparent hover:bg-light-orange h-full px-7 uppercase font-bold text-xl active:scale-90 duration-300`} onClick={buttonClick ?
            ((e) => buttonClick(e.currentTarget.value)) :
            (() => console.log(`Button error. Button onClick does not exist. Value : ${children}`))}
            value={value}
        >{children}</button>
    )
}




