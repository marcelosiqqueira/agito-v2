type ListButtonProps = {
    children: string
}

export function ListButton({ children }: ListButtonProps) {
    return (
        <li className="bg-dark-gray w-10 h-10 font-bold text-sm flex justify-center align-center rounded border-4 border-dark-gray">
            <button className="bg-white w-full h-full rounded hover:bg-light-purple duration-300 bg-last-page">
                {children}
            </button>
        </li>
    )
}