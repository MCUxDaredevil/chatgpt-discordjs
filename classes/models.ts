const openai = require('openai');
const axios = require('axios');
import { Message, ModelInterface } from "./interfaces";


export class OpenAIModel implements ModelInterface {
    readonly model_engine: string;
    readonly image_size: string;
    readonly headers: any;

    constructor(api_key: string, model_engine: string, image_size: string = '1024x1024') {
        openai.api_key = api_key;
        this.model_engine = model_engine;
        this.image_size = image_size;
        this.headers = {headers: {"Authorization": `Bearer ${openai.api_key}`, "Content-Type": "application/json"}}
    }

    async chat_completion(messages: Message[]): Promise<any> {
        const result = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {model: this.model_engine, messages: messages},
            this.headers
        );
        return result.data;
    }

    async image_generation(prompt: string, n: number): Promise<string[]> {
        try {
            const result = await axios.post(
                "https://api.openai.com/v1/images/generations",
                {
                    prompt: prompt,
                    n: n || 1,
                    size: this.image_size,
                },
                this.headers
            )
            return result.data.data.map((obj: any) => obj.url);
        } catch (error: any) {
            if (error.message === 'Your request was rejected as a result of our safety system. Your prompt may contain text that is not allowed by our safety system.') {
                return ['Your prompt may contain text that is not allowed by our safety system.\nContent Policy: https://labs.openai.com/policies/content-policy'];
            }
        }
        return ["Something went wrong! Please inform the developer!"];
    }
}
