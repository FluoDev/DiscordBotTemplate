module.exports = {
    description: "Tout ce qui ne va pas dans d'autres catégories.",
    commands: {
        "ping": {
            exe: async (client, interaction) => {
                interaction.reply(`Pong! \`${Date.now() - interaction.createdTimestamp} ms\`  🏓`);
            },
            description: "Réponds pong!"
        },
        "private": {
            exe: async (client, interaction) => {
                interaction.channel.send(
                    {
                        "content": null,
                        "embeds": [
                          {
                            "description": "Pour copier ce formulaire sur téléphone, laisser simplement appuyer sur le message.",
                            "color": 16025855
                          }
                        ]
                      }
                );
                interaction.reply({ content: "Action effectuée.", ephemeral: true });
            },
            description: "Rien à voir par ici. 🕵️"
        }
    },
    events: {
        "ready": async (client) => {
            console.log(`Logged in as ${client.user.tag}!`);

            client.user.setPresence({ activities: [{ name: "made by: Jules.#7341" }] });

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
                    command.exe(client, interaction);
                }
            });
        }
    }    
}