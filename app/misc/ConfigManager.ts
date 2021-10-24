import dotenv from "dotenv";
import { ConfigKeys } from "./ConfigKeys";

export default class ConfigManager {
    constructor() {
        dotenv.config();
    }

    getInt(key: ConfigKeys, failsafe: number): number {
        const value = process.env[key];
        if (value != null) {
            return parseInt(value);
        }
        return failsafe;
    }

    getString(key: ConfigKeys, failsafe: string): string {
        const value = process.env[key];
        if (value != null) {
            return value;
        }
        return failsafe;
    }
}