import Logger, { LogLevel } from "../../misc/Logger";
import { Request, Response, NextFunction } from "express";

const writeLine = Logger.generateLogger("BasicController");
export const writeLineWithRequest = (line: String, req: Request) => {
    const address = req.connection.remoteAddress;
    if (address != null) {  
        writeLine(line + " from " + address, LogLevel.Debug);
    }
};

export default class BasicController {
    static getIndex(req: Request, res: Response, next: NextFunction): void {
        writeLineWithRequest("Requested index", req);
        res.json({});
    }
}

