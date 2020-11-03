import PolusBuffer from "../../util/PolusBuffer";

export interface Position {
	X: number,
	Y: number
}

export default class Vector2 {
	constructor(public X?: number, public Y?: number) {}
	parse(buffer: PolusBuffer):Vector2 {
		const x = buffer.readU16() / 65535
		const y = buffer.readU16() / 65535
		return new Vector2(this.lerp(-40, 40, x), this.lerp(-40, 40, y))
	}
	serialize():PolusBuffer {
		var buf = new PolusBuffer(4);
		buf.write16(this.unlerp(-40, 40, this.X) * 65535);
		buf.write16(this.unlerp(-40, 40, this.Y) * 65535);
		return buf;
	}
	private lerp(min: number, max: number, value: number):number {
		if (value < 0) {
			value = 0;
		} else if (value > 1) {
			value = 1;
		}

		return min + (max - min) * value;
	}
	private unlerp(min: number, max: number, value: number):number {
		var res = (value - min) / (max - min);

		if (res < 0) {
			res = 0;
		} else if (res > 1) {
			res = 1;
		}

		return res;
	}
};
