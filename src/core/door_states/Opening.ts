import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';
import { Opened } from './Opened';

export class Opening implements DoorState {
	private position = 0;
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		if (this.position == 5) {
			this.doorController.changeState(new Opened(this.doorController));
			return this.doorController.processEvents(events);
		}
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
