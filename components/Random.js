module.exports = {
    description: "Tout ce qui ne va pas dans d'autres catégories.",
    commands: {
        "ping": {
            exe: async (client, interaction) => {
                interaction.reply(`Pooong! \`${Date.now() - interaction.createdTimestamp} ms\`  🏓`);
            },
            description: "Réponds pong!"
        }
    },
    events: {
        "ready": async (client) => {
            console.log(`Logged in as ${client.user.tag}!`);

            // Set the status of the bot
            client.user.setPresence({ activities: [{ name: "Coucou :D" }] });

            // Send an invite for the bot
            let invite = client.generateInvite(
                {
                    scopes: [
                        "bot", "applications.commands"
                    ],
                    permissions: "ADMINISTRATOR" }
                );
            console.log(`-> ${invite}`);

        },
        'interactionCreate': async (client, interaction) => {
            if (!interaction.isCommand()) return;
        
            client.commands.each((command, name) => {
                if (interaction.commandName == name) {
                    try {
                        command.exe(client, interaction);
                    }
                    catch (e) {}
                }
            });
        }
    }    
}