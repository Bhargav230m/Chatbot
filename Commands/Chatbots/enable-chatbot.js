const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const welcomeSchema = require("../../Schemas/Chatbot");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup-chatbot")
    .setDescription("Set up your chatbot.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel for chatbot.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const { options } = interaction;

    const channel = options.getChannel("channel");

    if (
      !interaction.guild.members.me.permissions.has(
        PermissionFlagsBits.SendMessages
      )
    ) {
      interaction.reply({
        content: "I don't have permissions for this.",
        ephemeral: true,
      });
    }

    welcomeSchema.findOne(
      { Guild: interaction.guild.id },
      async (err, data) => {
        if (!data) {
          const newChatbot = await welcomeSchema.create({
            Guild: interaction.guild.id,
            Channel: channel.id,
          });
        }
        interaction.reply({
          content: "Succesfully created Chatbot",
          ephemeral: true,
        });
        channel.send({ content: "It looks like, this channel has Chatbot" });
      }
    );
  },
};
