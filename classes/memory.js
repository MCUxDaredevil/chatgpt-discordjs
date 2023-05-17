"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memory = void 0;
var logger_1 = require("./logger");
var Memory = /** @class */ (function () {
    function Memory(systemMessage) {
        this.storage = { "": [] };
        this.systemMessage = systemMessage;
    }
    Memory.prototype.initialize = function (user_id) {
        this.storage[user_id] = [{
                role: 'system',
                content: this.systemMessage,
            }];
    };
    Memory.prototype.append = function (user_id, message) {
        logger_1.logger.debug(user_id);
        if (!this.storage[user_id]) {
            this.initialize(user_id);
        }
        this.storage[user_id].push(message);
    };
    Memory.prototype.get = function (user_id) {
        return this.storage[user_id] || [];
    };
    Memory.prototype.remove = function (user_id) {
        this.storage[user_id] = [];
    };
    return Memory;
}());
exports.Memory = Memory;
