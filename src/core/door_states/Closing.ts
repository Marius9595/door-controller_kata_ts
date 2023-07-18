import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';

export class Closing implements DoorState {
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		return '4';
	}
}
