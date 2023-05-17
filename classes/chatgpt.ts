import { MemoryInterface, ModelInterface } from "./interfaces";
import MockErrors from "undici/types/mock-errors";
import MockNotMatchedError = MockErrors.MockNotMatchedError;


export class ChatGPT {
    private model: ModelInterface;
    private memory: MemoryInterface;

    constructor(model: ModelInterface, memory: MemoryInterface) {
        this.model = model;
        this.memory = memory;
    }

    public async getResponse(user_id: string, text: string): Promise<string> {
        this.memory.append(user_id, {role: 'user', content: text});
        const response = await this.model.chat_completion(this.memory.get(user_id));
        const role = response.choices[0].message.role;
        const content = response.choices[0].message.content;
        this.memory.append(user_id, {role, content});
        return content;
    }

    public cleanHistory(user_id: string): void {
        this.memory.remove(user_id);
    }
}

export class DALLE {
    private model: ModelInterface;

    constructor(model: ModelInterface) {
        this.model = model;
    }

    public async generate(text: string, n: number = 1): Promise<string[]> {
        return this.model.image_generation(text, n);
    }
}
