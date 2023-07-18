import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';
import { Closed } from './Closed';

export class Closing implements DoorState {
	private doorPosition = 5;
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		const doorIsFullyClosed = this.doorPosition == 0;
		if (doorIsFullyClosed) {
			this.doorController.changeState(new Closed(this.doorController));
			return this.doorController.processEvents(events);
		}
		this.doorPosition--;
		const processedEvent = this.doorPosition.toString();
		const lastEventToProcess = events.length === 1;
		if (lastEventToProcess) {
			return processedEvent;
		}
		const restEventsToProcess = events.slice(1);
		return processedEvent + this.processEvents(restEventsToProcess);
	}
}
