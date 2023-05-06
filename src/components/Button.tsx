type ButtonProps = {
    buttonClick: ((value: string) => void) | null,
    children: string,
}

export function Button({ buttonClick, children }: ButtonProps) {
    return (
        <button className={`bg-orange`} onClick={buttonClick ?
            ((e) => buttonClick(e.currentTarget.value)) :
            (() => console.log(`Button error. Button Click does not exist. Value : ${children}`))}
            value={children}
        >{children}</button>
    )
}




