import { DoorState } from '../DoorState';
import { DoorController } from '../DoorController';

export class Opening implements DoorState {
	constructor(private doorController: DoorController) {}
	processEvents(events: string): string {
		return '1';
	}
}
