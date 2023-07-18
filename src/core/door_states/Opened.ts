import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';

export class Opened implements DoorState {
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		return '5'.repeat(events.length);
	}
}
