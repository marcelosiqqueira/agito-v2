import { AgitoEvent } from "../interfaces/event"
import { ScheduleItem } from "./ScheduleItem"

type ScheduleProps = {
    schedule: AgitoEvent[],
}

export function Schedule({ schedule }: ScheduleProps) {
    return (
        <ul>{schedule.map((event: AgitoEvent, index: number) =>
            <ScheduleItem key={index} {...event}></ScheduleItem>)}
        </ul>
    )
}