import { ListButton } from "./ListButton"

type ListProps = {
    children: React.ReactNode
}

export function List({ children }: ListProps) {
    return (
        <div>
            <div>
                <span>Coberturas</span>
                <span>Agenda</span>
            </div>
            <div>
                <ul>
                    {children}
                </ul>
            </div>
            <div>
                <ul>
                    <ListButton>0</ListButton>
                    <ListButton>0</ListButton>
                    <ListButton>0</ListButton>
                    <ListButton>0</ListButton>
                    <ListButton>0</ListButton>
                    <ListButton>0</ListButton>
                    <ListButton>0</ListButton>
                </ul>
            </div>
        </div>
    )
}