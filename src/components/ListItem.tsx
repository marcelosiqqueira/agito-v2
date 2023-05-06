type ListItemProps = {
    children?: React.ReactNode
}

export function ListItem({ }: ListItemProps) {
    return (
        <li>
            <div>
                <img src="" alt="" />
                <span>Festa</span>
            </div>
            <div>
                <div>
                    <img src="" alt="" />
                    <span>11 fev 2020</span>
                </div>
                <div>
                    <img src="" alt="" />
                    <span>Local</span>
                </div>
            </div>
            <div>
                <img src="" alt="" />
                <span>3000</span>
            </div>
        </li>
    )
}