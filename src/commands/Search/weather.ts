import { CommandStore, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';
import SnakeCommand from '../../lib/structures/base/SnakeCommand';
import WeatherAPI from '../../apis/OpenWeather';

export default class extends SnakeCommand {

    public constructor(store: CommandStore, file: string[], directory: string) {
        super(store, file, directory, {
            cooldown: 10,
            usage: '<city:...str>'
        });
    }

    public async run(msg: KlasaMessage, [city]: [string]): Promise<KlasaMessage | KlasaMessage[] | null> {
        const weather = this.client.apis.get('OpenWeather') as WeatherAPI;
        return weather.fetch(city)
            .then(data => {
                if (!data.weather) throw 'Invalid City Name!';
                const temp = data.main!.temp - 273.15;

                return msg.send(new MessageEmbed()
                    .setAuthor(`${data.name}, ${data.sys!.country}`)
                    .setThumbnail(`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
                    .setDescription(`
                **${data.weather[0].main}** - *${data.weather[0].description}*

                **Temperature:** \`${temp.toFixed(2)} C\` | \`${this.celsiusToFarenheit(temp).toFixed(2)} F\`
                **Feels Like:** \`${(data.main!.feels_like - 273.15).toFixed(2)} C\` | \`${this.celsiusToFarenheit(data.main!.feels_like - 273.15).toFixed(2)}\`
                **Humidity:** \`${data.main!.humidity}%\`
                **Pressure:** \`${data.main!.pressure} hPa\`
                ${data.visibility ? `**Visibility:** \`${data.visibility}\`\n` : ''}\
                ${data.wind ? `**Wind:** \`${data.wind.speed} m/s\`\n` : ''}\
                ${data.clouds ? `**Cloudiness:** \`${data.clouds.all}%\`\n` : ''}\
                ${data.rain ? `**Rain:** \`${data.rain['1h']} mm\`\n` : ''}\
                ${data.snow ? `**Snow:** \`${data.snow['1h']} mm\`` : ''}
                `)
                    .setFooter('Powered by Open Weather'));
            });
    }

    public celsiusToFarenheit(temp: number) {
        return ((temp * 9) / 5) + 32;
    }

}
