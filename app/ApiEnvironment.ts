import Logger, { LogLevel } from "./misc/Logger";
import readline from "readline";
import Core from "./core/Core";
import ConfigManager from "./misc/ConfigManager";

const writeLine = Logger.generateLogger("ApiEnvironment");

export default class ApiEnvironment {
    private static initialized = false;
    public static configManager: ConfigManager;
    public static core: Core;

    static async initialize() {
        if (this.initialized) {
            writeLine("Environment already initialized!", LogLevel.Warning);
            return;
        }
        this.initialized = true;
        this.printSplash();

        this.configManager = new ConfigManager();

        this.core = new Core(this.configManager);
        try {
            await this.core.initialize();
            writeLine("The environment has initialized successfully. Ready for connections.", LogLevel.Info);
            //this.startCommandLoop();
        } catch (err) {
            writeLine("Error initializing server: " + (err as Error).message, LogLevel.Warning);
            process.exit(0);
        }
    }

    private static printSplash() {
        console.log("lights 1.0.0 alpha");
        console.log("Copyright (c) 2021 - deeply.to");
        console.log();
    }

    private static async startCommandLoop() {
        const reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        for await (const line of reader) {
            switch (line) {
                case "stop":
                    return;
                default:
                    writeLine("Invalid command", LogLevel.Info);
                    break;
            }
        }
    }
}