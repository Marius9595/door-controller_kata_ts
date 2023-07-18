import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';
import { Closing } from "./Closing";

export class Opened implements DoorState {
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		const buttonPressedEvent = events[0] === 'P';
		if (buttonPressedEvent) {
			this.doorController.changeState(new Closing(this.doorController));
			return this.doorController.processEvents(events);
		}
		const processedEvent = '5';
		const isLastEventToProcess = events.length === 1;
		if (isLastEventToProcess) {
			return processedEvent;
		}
		const restEventsToProcess = this.doorController.processEvents(events.slice(1));
		return processedEvent + restEventsToProcess;
	}
}
