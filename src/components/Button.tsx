type ButtonProps = {
    children: string,
}

export function Button({ children }: ButtonProps) {

    return (
        <button className={`bg-orange`}>{children}</button>
    )
}