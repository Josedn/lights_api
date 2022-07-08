import { Device } from "../../home_service/Device";
import Logger, { LogLevel } from "../../misc/Logger";

const writeLine = Logger.generateLogger("LightsService");

export class LightsService {

    private devices: Device[];

    constructor() {
        this.devices = [];
    }

    public addDevice(name: string, ip: string, port: number): Device {
        const newDevice = new Device(name, ip, port);
        this.devices.push(newDevice);
        writeLine("Added device " + newDevice.name + " with ip: " + newDevice.ip + ":" + newDevice.port, LogLevel.Debug);
        return newDevice;
    }

    public getDevices(): Device[] {
        return this.devices;
    }

    public turnOnAll(): void {
        this.devices.forEach(device => device.turnOn());
    }

    public turnOffAll(): void {
        this.devices.forEach(device => device.turnOff());
    }
}