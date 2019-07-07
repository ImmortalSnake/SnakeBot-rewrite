import { Command, CommandStore, KlasaMessage, KlasaUser } from 'klasa';
import SnakeBot from '../../lib/client';
import { MessageEmbed } from 'discord.js';
const weather = require('weather-js');

export default class extends Command {
    public constructor(client: SnakeBot, store: CommandStore, file: string[], directory: string) {
        super(client, store, file, directory, {
            usage: '<city:...str>',
        });
    }

    public async run(msg: KlasaMessage, [city]: [string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        weather.find({ search: city, degreeType: 'F' }, function(err: any, result: any[]) {
            if (err) throw 'Please enter a valid location';
            if (result.length === 0) throw 'Please enter a valid location';

            const current = result[0].current;
            const location = result[0].location;

            return msg.sendEmbed(new MessageEmbed()
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
    }
}
