import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';

export class Opened implements DoorState {
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		if (events[0] === 'P') {
			return '4';
		}
		if (events.length === 1) {
			return '5';
		}
		return '5' + this.doorController.processEvents(events.slice(1));
	}
}
