import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';
import { Opened } from './Opened';

export class Opening implements DoorState {
	private doorPosition = 0;
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		const doorIsFullyOpen = this.doorPosition == 5;
		if (doorIsFullyOpen) {
			this.doorController.changeState(new Opened(this.doorController));
			return this.doorController.processEvents(events);
		}
		this.doorPosition++;
		const processedEvent = this.doorPosition.toString();
		const lastEventToProcess = events.length === 1;
		if (lastEventToProcess) {
			return processedEvent;
		}
		const restEventsToProcess = events.slice(1);
		return processedEvent + this.processEvents(restEventsToProcess);
	}
}
