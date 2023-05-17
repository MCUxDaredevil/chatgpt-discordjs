export interface Message {
    role: string;
    content: string;
}

export interface Storage {
    [key: string]: Message[];
}

export interface MemoryInterface {
    append(user_id: string, message: Message): void;

    get(user_id: string): Message[];

    remove(user_id: string): void;
}

export interface ModelInterface {
    chat_completion(messages: { role: string, content: string }[]): Promise<any>;

    image_generation(prompt: string, n: number): Promise<string[]>;
}
