const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const distube = require('../../client/distube')
const wait = require('node:timers/promises').setTimeout;
const { Utils } = require("devtools-ts");
const { SearchResultPlaylist } = require("distube");
const utilites = new Utils();

module.exports = {
    name: "play",
    description: "Add a song to queue and plays it.",
    cooldown: 5000,
    aliases: ['p', 'ش', 'شغل'],
    async execute(client, message, args) {
        try {
            if (message.guild.members.me.voice?.channelId && message.member.voice.channelId !== message.guild.members.me?.voice?.channelId) return message.channel.send({ content: `:no_entry_sign: You must be listening in \`${message.guild.members.me?.voice?.channel.name}\` to use that!` });
            if (!message.member.voice.channel) return message.channel.send({ content: ":no_entry_sign: You must join a voice channel to use that!" })

            let player = args.slice(0).join(' ')
            if (!player) return message.channel.send({ content: `:no_entry_sign: You should type song name or url.` })

            const queue = distube.getQueue(message.id)

            const searchResult = await distube.play(message.member.voice.channel, player, {
                textChannel: message.channel,
                member: message.member,
                message,
            });
            message.react(`🎶`)
        } catch (err) {
            console.log(err)
        }
    },
};