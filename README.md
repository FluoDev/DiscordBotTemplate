# A Discord Bot Template
*made by Jules.#7341.*

## How to add components

Every file in the `./components` folder represents a component. To add one you just need to add a new Javascript file, name it with your components' name. The basic content of it must be :
```javascript
module.exports = {
    description: "The component's description.",
    commands: {

    },
    events: {
        
    }    
}
```
In order to add commands in your component you have to respect discord's API syntax, and then add a `exe` function that will execute when you'll run the function.
```js
(...)
commands: {
    example: { // A command named 'example', in discord : "/example"
        description: "A command example.",
        options: [
            // Your command options, look at discord API's doc
        ],
        exe: async (client, interaction) {
            // client: a reference to the client
            // interaction: the command that has been executed
            interaction.reply("Command perfectly executed.");
        }
    }
},
(...)
```
If you want to add an event, add it with the event's name. The args are fistly a reference to the client, and then all the args that are passed to the event.
```js
(...)
events: {
    ready: async (client) {
        console.log("The bot is on.");
    }
}
(...)
```
