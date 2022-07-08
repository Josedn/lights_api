import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import { LogLevel } from "./Logger";

export const getRandomToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

export const writeLineWithRequest = (line: string, req: Request, writeLine: (text: string, logLevel: LogLevel) => void) => {
    const address = req.connection.remoteAddress;
    if (address != null) {  
        writeLine(line + " from " + address, LogLevel.Debug);
    } else {
        writeLine(line + " with null address", LogLevel.Warning);
    }
};