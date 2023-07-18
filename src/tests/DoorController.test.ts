import { DoorController } from "../core/DoorController";

/*
	CASES:
    "." -> "0" ✅
    ".." -> "00" ✅
    ".P" -> "01" ✅
    ".P...." -> "012345" ✅
    ".P......" -> "01234555" ✅
    ".P.....P" -> "01234554" ✅
    ".P.....P...." -> "012345543210" ✅
    ".P.P." -> "01222" ✅
    ".P.P.P." -> "0122234" ✅
    ".P.....P.P." -> "01234554333" ✅
    ".P.....P.P.P" -> "012345543332" ✅
    ".P..O." -> "012321"
    ".P.....P.O." -> "01234554345"
*/

describe('door controller', () => {
	it('should be start working with a closed door', function () {
		expect(new DoorController().processEvents('.')).toBe('0');
	});

	it('should keep the door closed while no events occur', function () {
		expect(new DoorController().processEvents('..')).toBe('00');
	});

	it('should start open the door when this is closed and button is pressed', function () {
		expect(new DoorController().processEvents('.P')).toBe('01');
	});

	it('should open the door completely when this is closed and button was pressed', function () {
		expect(new DoorController().processEvents('.P....')).toBe('012345');
	});

	it('should keep opened the door while no events occur', function () {
		expect(new DoorController().processEvents('.P......')).toBe('01234555');
	});

	it('should start close the door when this is opened and button is pressed', function () {
		expect(new DoorController().processEvents('.P.....P')).toBe('01234554');
	});

	it('should close the door completely when this is opened and button was pressed', function () {
		expect(new DoorController().processEvents('.P.....P....')).toBe('012345543210');
	});

	it('should pause the opening of door when button is pressed', function () {
		expect(new DoorController().processEvents('.P.P.')).toBe('01222');
	});

	it('should restart the opening of door when button is pressed from the the current position of door', function () {
		expect(new DoorController().processEvents('.P.P.P.')).toBe('0122234');
	});

	it('should pause the closing of door when button is pressed', function () {
		expect(new DoorController().processEvents('.P.....P.P.')).toBe('01234554333');
	});

	it('should restart the closing of door when button is pressed from the the current position of door', function () {
		expect(new DoorController().processEvents('.P.....P.P.P')).toBe('012345543332');
	});

	it('should change the opening to closing door when obstacle is detected', function () {
		expect(new DoorController().processEvents('.P..O.')).toBe('012321');
	});
});
