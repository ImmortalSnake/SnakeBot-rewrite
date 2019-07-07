"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ownerID: '410806297580011520',
    prefix: 's!',
    preserveSettings: false,
    noPrefixDM: true,
    disabledCorePieces: ['providers'],
    providers: {
        default: 'mongodb'
    },
    pieceDefaults: {
        commands: {
            quotedStringSupport: true,
            runIn: ['text'],
            usageDelim: ' '
        }
    }
};
exports.mongoOptions = {
    uri: process.env.DATABASE_URL || '',
    options: {
        useNewUrlParser: true,
        reconnectInterval: 500,
        reconnectTries: Number.MAX_VALUE,
        poolSize: 5,
        connectTimeoutMS: 10000
    }
};
exports.musicOptions = {
    host: process.env.HOST,
    pass: 'youshallnotpass',
    port: '/',
    nodes: [{
            host: process.env.HOST,
            port: '/',
            password: 'youshallnotpass'
        }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtCQUFlO0lBQ1gsT0FBTyxFQUFFLG9CQUFvQjtJQUM3QixNQUFNLEVBQUUsSUFBSTtJQUNaLGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsVUFBVSxFQUFFLElBQUk7SUFDaEIsa0JBQWtCLEVBQUUsQ0FBQyxXQUFXLENBQUM7SUFDakMsU0FBUyxFQUFFO1FBQ1gsT0FBTyxFQUFFLFNBQVM7S0FDakI7SUFDRCxhQUFhLEVBQUU7UUFDZixRQUFRLEVBQUU7WUFDUixtQkFBbUIsRUFBRSxJQUFJO1lBQ3pCLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNmLFVBQVUsRUFBRSxHQUFHO1NBQ2hCO0tBQ0Y7Q0FDRixDQUFDO0FBRVMsUUFBQSxZQUFZLEdBQUc7SUFDdEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLEVBQUU7SUFDbkMsT0FBTyxFQUFFO1FBQ0wsZUFBZSxFQUFFLElBQUk7UUFDckIsaUJBQWlCLEVBQUUsR0FBRztRQUN0QixjQUFjLEVBQUUsTUFBTSxDQUFDLFNBQVM7UUFDaEMsUUFBUSxFQUFFLENBQUM7UUFDWCxnQkFBZ0IsRUFBRSxLQUFLO0tBQzFCO0NBQ0osQ0FBQztBQUVTLFFBQUEsWUFBWSxHQUFHO0lBQ3RCLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQWM7SUFDaEMsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixJQUFJLEVBQUUsR0FBRztJQUNULEtBQUssRUFBRSxDQUFDO1lBQ0osSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBYztZQUNoQyxJQUFJLEVBQUUsR0FBRztZQUNULFFBQVEsRUFBRSxpQkFBaUI7U0FDOUIsQ0FBQztDQUNMLENBQUMifQ==