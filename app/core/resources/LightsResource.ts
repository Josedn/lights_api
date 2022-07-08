import { Application } from "express";
import { constants } from "http2";
import Logger from "../../misc/Logger";
import { LightsService } from "../services/LightsService";
import { Request, Response, NextFunction } from "express";
import { writeLineWithRequest } from "../../misc/Utils";

const writeLine = Logger.generateLogger("LightsResource");

export class LightsResource {
    constructor(private lightsService: LightsService) { }

    initialize(app: Application): void {
        app.get("/", this.getIndex);
        app.post("/device", this.addDevice);
        app.get("/devices", this.listDevices);
    }

    private getIndex = (req: Request, res: Response, next: NextFunction): void => {
        writeLineWithRequest("Requested index", req, writeLine);
        res.status(constants.HTTP_STATUS_NO_CONTENT).send();
    }

    private listDevices = (req: Request, res: Response, next: NextFunction): void => {
        writeLineWithRequest("Requested list devices", req, writeLine);
        const devices = this.lightsService.getDevices();
        res.json(devices);
    }

    private addDevice = (req: Request, res: Response, next: NextFunction): void => {
        writeLineWithRequest("Requested add device", req, writeLine);
        const { name, ip, port } = req.body;
        const device = this.lightsService.addDevice(name, ip, port);
        res.status(constants.HTTP_STATUS_CREATED).json(device);
    }


}