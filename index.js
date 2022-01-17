const { Client, Intents, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");
require("dotenv").config();

const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_MEMBERS', 'GUILD_BANS'] });

client.config = require("./config.json");
client.commands = new Collection();

console.clear();

/*
    Load the components
*/
console.log(`Starting loading components...`);
const compFolder = fs.readdirSync("./components/");
for (let ifile = 0; ifile < compFolder.length; ifile++) {
    console.log(`-> ${compFolder[ifile]} ! ${Math.floor((ifile+1)*100/compFolder.length)}%`);

    comp = require(`./components/${compFolder[ifile]}`);

    // Set the commands
    console.log("  Commands :");
    for (command in comp.commands) {
        console.log(`    ╰> ${command}`);
        client.commands.set(command, comp.commands[command]);
    }
    // Manage the events
    console.log("  Events :");
    for (ev in comp.events) {
        console.log(`    ╰> ${ev}`);
        client.on(ev, comp.events[ev].bind(null, client));
    }
    
}
console.log(`All the components are loaded.\n`);

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
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(client.config.clientID, client.config.guildID),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.\n');
	} catch (error) {
		console.error(error);
	}
})();

client.login(process.env.TOKEN);