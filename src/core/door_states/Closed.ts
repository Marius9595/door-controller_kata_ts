import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';
import { Opening } from './Opening';

export class Closed implements DoorState {
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		if (events[0] === 'P') {
			this.doorController.changeState(new Opening(this.doorController));
			return this.doorController.processEvents(events);
		}

		const processedEvent = '0';
		const isLastEventToProcess = events.length === 1;
		if (isLastEventToProcess) {
			return processedEvent;
		}
		const restEventsToProcess = this.processEvents(events.slice(1));

		return processedEvent + restEventsToProcess;
	}
}
