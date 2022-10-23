const { ChatInputCommandInteraction } = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const { GuildMember, Embed, InteractionCollector } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param { ChatInputCommandInteraction } interaction
   */
  async execute(interaction, client) {
    const { values, customId, guild, member } = interaction;
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "This Command is OutDated",
        ephemeral: true,
      });
    if (command) {
      
    }
   
    if (command.developer && interaction.user.id !== "890255508693454929")
      return interaction.reply({
        content: "This commands is only available to developers",
        ephemeral: true,
      });


     command.execute(interaction, client);
  },
};