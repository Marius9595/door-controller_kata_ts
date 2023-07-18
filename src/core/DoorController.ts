export class DoorController {
	processEvents(events: string) {
		let processedEvent = '0';
		if (events[0] == 'P') {
			processedEvent = '1';
		}
		const isLastEventToProcess = events.length === 1;
		if (isLastEventToProcess) {
			return processedEvent;
		}
		const restEventsToProcess = this.processEvents(events.slice(1));
		return processedEvent + restEventsToProcess;
	}
}
