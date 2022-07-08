import Logger, { LogLevel } from "../misc/Logger";

const writeLine = Logger.generateLogger("Device");

export class Device {
    constructor(public name: string, public ip: string, public port: number) {}

    public turnOn(): void {
        writeLine("Device " + this.name + " turned on", LogLevel.Info);
    }

    public turnOff(): void {
        writeLine("Device " + this.name + " turned off", LogLevel.Info);
    }
}
