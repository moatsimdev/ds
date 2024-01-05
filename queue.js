const { EmbedBuilder, MessageFlags } = require("discord.js");
const distube = require('../../client/distube')
const { Utils } = require("devtools-ts");
const utilites = new Utils();

module.exports = {
    name: "queue",
    description: "Display the queue of the current tracks in the playlist.",
    cooldown: 5000,
    aliases: ['انتظار'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.reply({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });
            if (!message.member.voice.channel)
                return message.reply({ content: ":no_entry_sign: You must join a voice channel to use that!" })
            const queue = distube.getQueue(message)
            if (!queue) return message.reply({ content: `:no_entry_sign: There must be music playing to use that!` })
            if (!queue.autoplay && queue.songs.length <= 1) return message.reply({ content: `:no_entry_sign:  this is last song in queue list` });
            let curqueue = queue.songs.slice(queue.songs.length / 10).map((song, id) =>
                `**${id + 1}**. [**${song.name}**](${song.url}) - ${song.user.tag}`
            ).join("\n");
            let embed = new EmbedBuilder()
                .setAuthor({ name: `Current Queue: ${queue.songs.length - 1}` })
                .setDescription(`${curqueue}`)
            return message.reply({ embeds: [embed] })
        } catch (err) {
            utilites.logger(err)
        }
    },
};