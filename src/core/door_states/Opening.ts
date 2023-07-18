import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';
import { Opened } from './Opened';
import { Closing } from "./Closing";

export class Opening implements DoorState {
	private paused = false;
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		const doorIsFullyOpen = this.doorController.doorPosition == 5;
		if (doorIsFullyOpen) {
			this.doorController.changeState(new Opened(this.doorController));
			return this.doorController.processEvents(events);
		}
		const obstacleDetectedEvent = events[0] === 'O';
		const doorIsOpening = (
			this.doorController.doorPosition > 0
				&& this.doorController.doorPosition < 5
		);
		if (obstacleDetectedEvent && doorIsOpening) {
			this.doorController.changeState(new Closing(this.doorController));
			return this.doorController.processEvents('.' + events.slice(1));
		}
		const buttonPressedEvent = events[0] === 'P';
		if (buttonPressedEvent && doorIsOpening) {
			this.paused = !this.paused;
		}
		if (!this.paused) {
			this.doorController.doorPosition++;
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
