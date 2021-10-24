import ConfigManager from "../misc/ConfigManager";
import { ConfigKeys } from "../misc/ConfigKeys";
import ApiService from "./ApiService";
import RouteManager from "./controllers/RouteManager";

export default class Core {
    private apiService: ApiService;
    private routeManager: RouteManager;

    constructor(configManager: ConfigManager) {
        const apiPort = configManager.getInt(ConfigKeys.API_PORT, 1232);

        this.apiService = new ApiService(apiPort);
        this.routeManager = new RouteManager();
    }

    async initialize() {
        await this.apiService.initialize();
        this.routeManager.initialize(this.apiService.app);
    }
}