import { Message, Storage, MemoryInterface} from "./interfaces";
import { logger } from "./logger";

export class Memory implements MemoryInterface {
    private storage: Storage = {"" : []};
    private readonly systemMessage: string;

    constructor(systemMessage: string) {
        this.systemMessage = systemMessage;
    }

    private initialize(user_id: string): void {
        this.storage[user_id] = [{
            role: 'system',
            content: this.systemMessage,
        }];
    }

    public append(user_id: string, message: Message): void {
        logger.debug(user_id);
        if (!this.storage[user_id]) {
            this.initialize(user_id);
        }
        this.storage[user_id].push(message);
    }

    public get(user_id: string): Message[] {
        return this.storage[user_id] || [];
    }

    public remove(user_id: string): void {
        this.storage[user_id] = [];
    }
}
