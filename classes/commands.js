"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
exports.commands = [
    {
        name: 'chat',
        description: 'Start a chat with the bot',
        type: 'CHAT_INPUT',
        options: [
            {
                name: 'text',
                description: 'The text to send to the bot',
                type: 'STRING',
                required: true,
            },
        ],
    },
    {
        name: 'reset',
        description: 'Reset the chat history with the bot',
    },
    {
        name: 'imagine',
        description: 'Generate an image from the text',
        type: 'CHAT_INPUT',
        options: [
            {
                name: 'text',
                description: 'The text to generate an image from',
                type: 'STRING',
                required: true,
            },
        ],
    },
];
