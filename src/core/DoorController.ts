export class DoorController {
	processEvents(events: string) {
		let processedEvent = '0';
		if (events[0] == 'P') {
			processedEvent = '1';
		}
		if (events.length === 1) {
			return processedEvent;
		}
		return processedEvent + this.processEvents(events.slice(1));
	}
}
