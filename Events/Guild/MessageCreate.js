const { Client } = require("discord.js");
const Schema = require("../../Schemas/Chatbot");
const axios = require("axios");
module.exports = {
  name: "messageCreate",
  /**
 * 

 * @param {Client} client 
 */
  async execute(message, client) {
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
    
      if (!data) return message.author.send('enable chatbot');
      if (message.channel.id !== data.Channel || !message.guild || message.author.bot) return;

      const channel = await message.guild.channels.cache.get(data.Channel)
      
    const res = await axios.get(`
    http://api.brainshop.ai/get?bid=164005&key=cTGmkvqQaz5dUiW1&uid=1&msg=${encodeURIComponent(message.content)}`)
   channel.send({content: `<@${message.member.id}> ${res.data.cnt}`})
  });
},
};
