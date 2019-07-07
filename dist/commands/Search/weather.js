"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const klasa_1 = require("klasa");
const discord_js_1 = require("discord.js");
const weather = require('weather-js');
class default_1 extends klasa_1.Command {
    constructor(client, store, file, directory) {
        super(client, store, file, directory, {
            usage: '<city:...str>',
        });
    }
    run(msg, [city]) {
        return __awaiter(this, void 0, void 0, function* () {
            weather.find({ search: city, degreeType: 'F' }, function (err, result) {
                if (err)
                    throw 'Please enter a valid location';
                if (result.length === 0)
                    throw 'Please enter a valid location';
                const current = result[0].current;
                const location = result[0].location;
                return msg.sendEmbed(new discord_js_1.MessageEmbed()
                    .setDescription(`**${current.skytext}**`)
                    .setAuthor(`Weather for ${current.observationpoint}`)
                    .setThumbnail(current.imageUrl)
                    .setColor(0x00AE86)
                    .addField('Timezone', `UTC${location.timezone}`, true)
                    .addField('Degree Type', location.degreetype, true)
                    .addField('Temperature', `${current.temperature} Degrees`, true)
                    .addField('Feels Like', `${current.feelslike} Degrees`, true)
                    .addField('Winds', current.winddisplay, true)
                    .addField('Humidity', `${current.humidity}%`, true));
            });
            return null;
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VhdGhlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9TZWFyY2gvd2VhdGhlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQXVFO0FBRXZFLDJDQUEwQztBQUMxQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFdEMsZUFBcUIsU0FBUSxlQUFPO0lBQ2hDLFlBQW1CLE1BQWdCLEVBQUUsS0FBbUIsRUFBRSxJQUFjLEVBQUUsU0FBaUI7UUFDdkYsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsZUFBZTtTQUN6QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRVksR0FBRyxDQUFDLEdBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQVc7O1lBQ2hELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsRUFBRSxVQUFTLEdBQVEsRUFBRSxNQUFhO2dCQUM1RSxJQUFJLEdBQUc7b0JBQUUsTUFBTSwrQkFBK0IsQ0FBQztnQkFDL0MsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQUUsTUFBTSwrQkFBK0IsQ0FBQztnQkFFL0QsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFFcEMsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUkseUJBQVksRUFBRTtxQkFDOUIsY0FBYyxDQUFDLEtBQUssT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDO3FCQUN4QyxTQUFTLENBQUMsZUFBZSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztxQkFDcEQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7cUJBQzlCLFFBQVEsQ0FBQyxRQUFRLENBQUM7cUJBQ2xCLFFBQVEsQ0FBQyxVQUFVLEVBQUUsTUFBTSxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDO3FCQUNyRCxRQUFRLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO3FCQUNsRCxRQUFRLENBQUMsYUFBYSxFQUFFLEdBQUcsT0FBTyxDQUFDLFdBQVcsVUFBVSxFQUFFLElBQUksQ0FBQztxQkFDL0QsUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLE9BQU8sQ0FBQyxTQUFTLFVBQVUsRUFBRSxJQUFJLENBQUM7cUJBQzVELFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUM7cUJBQzVDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxPQUFPLENBQUMsUUFBUSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRSxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtDQUNKO0FBOUJELDRCQThCQyJ9