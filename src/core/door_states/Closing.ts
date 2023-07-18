import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';
import { Closed } from './Closed';
import { Opening } from "./Opening";

export class Closing implements DoorState {
	private paused = false;
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		const doorIsFullyClosed = this.doorController.doorPosition == 0;
		const obstacleDetectedEvent = events[0] === 'O';
		const doorIsClosing = (
			this.doorController.doorPosition > 0
				&& this.doorController.doorPosition < 5
		);
		if (obstacleDetectedEvent && doorIsClosing) {
			this.doorController.changeState(new Opening(this.doorController));
			return this.doorController.processEvents('.' + events.slice(1));
		}
		if (doorIsFullyClosed) {
			this.doorController.changeState(new Closed(this.doorController));
			return this.doorController.processEvents(events);
		}
		const buttonPressedEvent = events[0] === 'P';
		if (buttonPressedEvent && doorIsClosing) {
			this.paused = !this.paused;
		}
		if (!this.paused) {
			this.doorController.doorPosition--;
		}
		const processedEvent = this.doorController.doorPosition.toString();
		const lastEventToProcess = events.length === 1;
		if (lastEventToProcess) {
			return processedEvent;
		}
		const restEventsToProcess = events.slice(1);
		return processedEvent + this.processEvents(restEventsToProcess);
	}
}
