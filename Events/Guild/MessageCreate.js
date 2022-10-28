const Schema = require("../../Schemas/Chatbot");
const axios = require("axios");
const { BrainShopAPI } = require("../../config.json")
module.exports = {
  name: "messageCreate",
  /**
 * 

 * @param {Client} client 
 */
  async execute(message) {
    Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) return;

      if (
        message.channel.id !== data.Channel ||
        !message.guild ||
        message.author.bot
      )
        return;

      const channel = await message.guild.channels.cache.get(data.Channel);

      const res = await axios.get(`${BrainShopAPI}1&msg=${encodeURIComponent(message.content)}`);
      channel.send({ content: `<@${message.member.id}> ${res.data.cnt}` });
    });
  },
};
