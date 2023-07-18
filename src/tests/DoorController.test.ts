import { DoorController } from "../core/DoorController";

/*
	CASES:
    "." -> "0" ✅
    ".." -> "00" ✅
    ".P" -> "01" ✅
    ".P...." -> "012345" ✅
    ".P......" -> "01234555"
    ".P.....P" -> "01234554"
    ".P.....P...." -> "012345543210"
    ".P.P." -> "0122"
    ".P.P....." -> "01222222"
    ".P.P.....P" -> "01222223"
    ".P.....P.P." -> "01234554322"
    ".P.....P.P....." -> "0123455432222"
    ".P.....P.P.P" -> "01234554332"
    ".P..O." -> "01232"
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

	it('should open the door completely when this was closed and button was pressed', function () {
		expect(new DoorController().processEvents('.P....')).toBe('012345');
	});

	it('should keep opened the door while no events occur', function () {
		expect(new DoorController().processEvents('.P......')).toBe('01234555');
	});
});
