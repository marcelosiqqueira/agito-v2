import { ListButton } from "./ListButton"

type ListProps = {
    children: React.ReactNode
    handleCoverageSelected: (value: string) => void
}

export function List({ handleCoverageSelected, children }: ListProps) {
    return (
        <div>
            <div>
                <button onClick={(e) => handleCoverageSelected(e.currentTarget.value)} value='Coberturas'>Coberturas</button>
                <button onClick={(e) => handleCoverageSelected(e.currentTarget.value)} value='Agenda'>Agenda</button>
            </div>
            <div>
                <ul>
                    {children}
                </ul>
            </div>
            <div>
                <ul>
                    <ListButton>{'|<'}</ListButton>
                    <ListButton>{'<'}</ListButton>
                    <ListButton>1</ListButton>
                    <ListButton>2</ListButton>
                    <ListButton>3</ListButton>
                    <ListButton>{'>'}</ListButton>
                    <ListButton>{'>|'}</ListButton>
                </ul>
            </div>
        </div>
    )
}