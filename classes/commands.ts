export let commands: any[] = [
    {
        name: 'chat',
        description: 'Start a chat with the bot',
        type: 1,
        options: [
            {
                name: 'text',
                description: 'The text to send to the bot',
                type: 3,
                required: true,
            },
        ],
    },
    {
        name: 'reset',
        description: 'Reset the chat history with the bot',
        type: 1
    },
    {
        name: 'imagine',
        description: 'Generate an image from the text',
        type: 1,
        options: [
            {
                name: 'text',
                description: 'The text to generate an image from',
                type: 3,
                required: true,
            },
            {
                name: 'number',
                description: 'The number of images to generate',
                type: 4,
                required: false,
                minValue: 1,
                maxValue: 10,
                choices: Array.from({length: 10}, (_, i) => ({name: String(i + 1), value: i + 1}))
            },
        ],
    },
];
