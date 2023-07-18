export class DoorController {
	processEvents(events: string) {
		if (events.length === 1) {
			return '0';
		}
		return '0' + this.processEvents(events.slice(1));
	}
}
