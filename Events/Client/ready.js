const { loadCommands } = require("../../Handlers/commandHandler")
const chalk = require("chalk")
module.exports = {
    name: "ready",
    once: "true",
    execute(client) {
        console.log(chalk.green(`Logined as Chatbot.js`))
        client.user.setActivity(`Chatbot Active`)



    console.log(chalk.red("Chatbot made by Technology Power"))
loadCommands(client);
        
    }
}