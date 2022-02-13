const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");
require("dotenv").config();

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_MEMBERS', 'GUILD_BANS'] });

client.config = require("./config.json");
client.commands = new Collection();

console.clear();

/*
    Load the components
*/
const compFolder = fs.readdirSync("./components/");
for (let ifile = 0; ifile < compFolder.length; ifile++) {
    comp = require(`./components/${compFolder[ifile]}`);

    // Set the commands
    for (command in comp.commands) {
        client.commands.set(command, comp.commands[command]);
    }
    // Manage the events
    for (ev in comp.events) {
        client.on(ev, comp.events[ev].bind(null, client));
    }
    console.log(`  - ${compFolder[ifile]} loaded.`);
}
console.log(`Every components loaded.`);

/*
    Registering the slash commands
*/
let commands = [];
client.commands.each((command, name) => {
    commands.push({
        name,
        description: command.description,
        type: command.type ? command.type : 1,
        options: command.options ? command.options : []
    });
});

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(client.config.clientID, client.config.guildID),
			{ body: commands },
		);
	} catch (error) {
		console.error(error);
	}
})();
console.log('Successfully reloaded application (/) commands.');
console.log("\n-----\n");

client.login(process.env.TOKEN);