const { SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");
const welcomeSchema = require("../../Schemas/Chatbot");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("setup-chatbot")
    .setDescription("Set up your chatbot.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option => 
        option.setName("channel")
        .setDescription("Channel for chatbot.")
        .setRequired(true)
    )
    .addIntegerOption(option => 
        option.setName("rate")
        .setDescription("Provide a rate at which user can send messages like 1s, 5s etc.")
        .setRequired(false)
        ),

    async execute(interaction) {
        const {options} = interaction;

        const channel = options.getChannel("channel");
    const minRate = ms("5s");
    const maxRate = ms("60s");
    const rate = options.getString("rate") && ms(options.getString("rate")) ? ms(options.getString("rate")) : 0;
    if(!rate) {
  return;
    }
    if (rate < minRate || rate > maxRate) {
        response.setDescription(`Rate must be between ${ms(minRate, { long: true })} and ${ms(maxRate, {long: true,})}. The rate can be supplied like so: *10s, 1m, 2h*, etc., or alternatively in milliseconds.`);
        return interaction.reply({
            embeds: [response],
            fetchReply: true,
            ephemeral: true,
        });
    }

        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages)) {
            interaction.reply({content: "I don't have permissions for this.", ephemeral: true});
        }

        welcomeSchema.findOne({Guild: interaction.guild.id}, async (err, data) => {
            if(!data) {
                const newChatbot = await welcomeSchema.create({
                    Guild: interaction.guild.id,
                    Channel: channel.id,
                });
            }
            interaction.reply({content: 'Succesfully created Chatbot', ephemeral: true})
            channel.send({ content: "It looks like, this channel has Chatbot"})
            channel.setRateLimitPerUser(rate / 1000);
        })

    }
}