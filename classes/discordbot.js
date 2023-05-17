"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sender = exports.DiscordClient = void 0;
var discord_js_1 = require("discord.js");
var logger_1 = require("./logger");
var commands_1 = require("./commands");
var DiscordClient = /** @class */ (function (_super) {
    __extends(DiscordClient, _super);
    function DiscordClient() {
        var _this = _super.call(this, {
            intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
            presence: {
                status: "online",
                activities: [
                    {
                        type: 3,
                        name: '/chat | /reset | /imagine',
                    }
                ]
            }
        }) || this;
        _this.synced = false;
        _this.added = false;
        return _this;
    }
    DiscordClient.prototype.onReady = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        logger_1.logger.info('Syncing');
                        if (!!this.synced) return [3 /*break*/, 3];
                        return [4 /*yield*/, ((_a = this.application) === null || _a === void 0 ? void 0 : _a.fetch())];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, ((_b = this.application) === null || _b === void 0 ? void 0 : _b.commands.set(commands_1.commands))];
                    case 2:
                        _d.sent();
                        this.synced = true;
                        _d.label = 3;
                    case 3:
                        if (!this.added) {
                            this.added = true;
                        }
                        logger_1.logger.info("".concat((_c = this.user) === null || _c === void 0 ? void 0 : _c.username, " is running!"));
                        return [2 /*return*/];
                }
            });
        });
    };
    return DiscordClient;
}(discord_js_1.Client));
exports.DiscordClient = DiscordClient;
var Sender = /** @class */ (function () {
    function Sender() {
    }
    Sender.prototype.sendMessage = function (interaction, send, receive) {
        return __awaiter(this, void 0, void 0, function () {
            var user, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        user = interaction.user;
                        response = "> **".concat(send, "** - <@").concat(user.id, "> \n\n ").concat(receive);
                        return [4 /*yield*/, interaction.editReply(response)];
                    case 1:
                        _a.sent();
                        logger_1.logger.info("".concat(user.id, " sent: ").concat(send, ", response: ").concat(receive));
                        return [3 /*break*/, 4];
                    case 2:
                        e_1 = _a.sent();
                        return [4 /*yield*/, interaction.reply('> **Error: Something went wrong, please try again later!**')];
                    case 3:
                        _a.sent();
                        logger_1.logger.error("Error while sending:".concat(send, " in chatgpt model, error: ").concat(e_1));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Sender.prototype.sendImage = function (interaction, send, receive) {
        return __awaiter(this, void 0, void 0, function () {
            var user, response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 5]);
                        user = interaction.user;
                        response = "> **".concat(send, "** - <@").concat(user.id, "> \n\n");
                        return [4 /*yield*/, interaction.editReply(response)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, interaction.followUp({ files: [receive] })];
                    case 2:
                        _a.sent();
                        logger_1.logger.info("".concat(user.id, " sent: ").concat(send, ", response: ").concat(receive));
                        return [3 /*break*/, 5];
                    case 3:
                        e_2 = _a.sent();
                        return [4 /*yield*/, interaction.reply('> **Error: Something went wrong, please try again later!**')];
                    case 4:
                        _a.sent();
                        logger_1.logger.error("Error while sending:".concat(send, " in dalle model, error: ").concat(e_2));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Sender;
}());
exports.Sender = Sender;
