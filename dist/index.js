"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config_1 = __importDefault(require("./config"));
const client_1 = __importDefault(require("./lib/client"));
const client = new client_1.default(config_1.default).login(process.env.TOKEN);
process.on('unhandledRejection', console.log);
process.on('uncaughtException', console.log);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFM0Isc0RBQStCO0FBQy9CLDBEQUFvQztBQUVwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGdCQUFRLENBQUMsZ0JBQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTlELE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlDLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDIn0=