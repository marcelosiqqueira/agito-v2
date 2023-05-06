type ButtonProps = {
    selected: boolean,
    children: string,
}

export function Button({ selected, children }: ButtonProps) {

    return (
        <button className={selected ? ` bg-light-orange` : `bg-orange`}>{children}</button>
    )
}