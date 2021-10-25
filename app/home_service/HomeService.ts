import { Device } from "./Device";

export class HomeService {
    private devices: Device[];

    constructor() {
        this.devices = [];
    }

    addNode(name: string, ip: string, port: number) {
        this.devices.push(new Device(name, ip, port));
    }
}
