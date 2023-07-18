import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';
import { Closing } from "./Closing";

export class Opened implements DoorState {
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		if (events[0] === 'P') {
			this.doorController.changeState(new Closing(this.doorController));
			return this.doorController.processEvents(events);
		}
		const processedEvent = '5';
		if (events.length === 1) {
			return processedEvent;
		}
		return processedEvent + this.doorController.processEvents(events.slice(1));
	}
}
