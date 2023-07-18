import { DoorState } from './DoorState';
import { Closed } from './door_states/Closed';

export class DoorController {
	private doorState: DoorState = new Closed(this);
	processEvents(events: string) {
		return this.doorState.processEvents(events);
	}

	changeState(doorState: DoorState) {
		this.doorState = doorState;
	}
}
