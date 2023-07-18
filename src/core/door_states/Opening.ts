import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';

export class Opening implements DoorState {
	private position = 0;
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		this.position++;
		const processedEvent = this.position.toString();
		const lastEventToProcess = events.length === 1;
		if (lastEventToProcess) {
			return processedEvent;
		}
		const restEventsToProcess = events.slice(1);
		return processedEvent + this.processEvents(restEventsToProcess);
	}
}
