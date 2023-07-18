import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';

export class Opened implements DoorState {
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		if (events[0] === 'P') {
			return '4';
		}
		const processedEvent = '5';
		if (events.length === 1) {
			return processedEvent;
		}
		return processedEvent + this.doorController.processEvents(events.slice(1));
	}
}
