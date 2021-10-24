import Express from "express";
import bodyParser from "body-parser";
import compress from "compression";
import responseTime from "response-time";
import Logger, { LogLevel } from "../misc/Logger";

const writeLine = Logger.generateLogger("HttpApi");

export default class ApiService {
    app: Express.Application;
    port: number;

    constructor(port: number) {
        this.port = port;
        this.app = Express();
        // Enable parsing URL encoded bodies.
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // Enable parsing JSON bodies.
        this.app.use(bodyParser.json());

        // Enables compression of response bodies.
        this.app.use(compress({
            threshold: 1400,
            level: 4,
            memLevel: 3
        }));

        // Enable response time tracking for HTTP request.
        this.app.use(responseTime());

        // Enable cors
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
            next();
        });

    }

    initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.app.listen(this.port)
                .on("error", (err) => {
                    reject(err);
                })
                .on("listening", () => {
                    writeLine("Server listening on " + this.port + "...", LogLevel.Verbose);
                    resolve();
                }).on("close", () => {
                    writeLine("closed", LogLevel.Warning);
                });
        });
    }
}