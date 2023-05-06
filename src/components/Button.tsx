type ButtonProps = {
    selected: boolean
}

export function Button({ selected }: ButtonProps) {

    return (
        <button className={selected ? ` bg-light-orange` : `bg-orange`}></button>
    )
}