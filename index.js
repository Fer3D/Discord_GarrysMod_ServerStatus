const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { token, channelID, ip, port } = require('./config.json');
const Gamedig = require('gamedig');

const cliente = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
let mensajeEstado, canal;

cliente.on('ready', async () => {
    console.log(`Iniciado sesión como: ${cliente.user.tag}!`);
    canal = cliente.channels.cache.get(channelID);

    try {
        const mensajes = await canal.messages.fetch({ limit: 10 });
        mensajeEstado = mensajes.find(msg => msg.author.id === cliente.user.id);

        if (!mensajeEstado) {
            mensajeEstado = await canal.send('🤔');
        }

        console.log('La aplicación se ha iniciado.');
    } catch (error) {
        console.error(error);
    }

    actualizarEstadoServidor();
    setInterval(actualizarEstadoServidor, 60000);
});

async function actualizarEstadoServidor() {
    try {
        const estado = await Gamedig.query({ type: 'garrysmod', host: ip, port });

        const jugadoresConectando = estado.players.filter(player => !player.name || player.name === "Conectando ...");
        const otrosJugadores = estado.players.filter(player => player.name && player.name !== "Conectando ...");

        const listaJugadores = otrosJugadores.map(player => `🔹 ${player.name}`).join('\n') +
            (jugadoresConectando.length > 0 ? `\n🔹 Hay ${jugadoresConectando.length} usuarios conectando ...` : "");

        const embedEstado = new MessageEmbed()
            .setTitle(`🟢 GenosRP | Un servidor de Roleplay Mágico`)
            .setDescription("*¡Bienvenido/a a nuestro servidor de Garry's Mod!\nAquí encontrarás una comunidad amigable y muchas aventuras emocionantes.\n¡Únete ahora y conviértete en el mejor mago o bruja!*")
            .setColor("#5ad65c")
            .setImage('https://i.imgur.com/WXRppSR.png')
            .addFields(
                { name: "\u200B", value: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\u200B" },
                { name: `👥 ┃ Jugadores conectados: \`${estado.raw.numplayers}/${estado.maxplayers}\``, value: listaJugadores || "🔸 No hay nadie en el servidor. 😴" },
                { name: "\u200B", value: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\u200B" },
                { name: "📡 ┃ Copia y pega esto en tu navegador para jugar:", value: `\`\`\`steam://connect/${ip}:${port}\`\`\`` }
            )
            .setFooter({ text: 'Actualizado:' })
            .setTimestamp();

        const filaBotones = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Conectar al Servidor')
                    .setURL('https://tinyurl.com/genosrp')
                    .setEmoji('🚀')
                    .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                    .setLabel('Página web')
                    .setURL('https://genos.nn.pe')
                    .setEmoji('🌐')
                    .setStyle('LINK')
            );

        await mensajeEstado.edit({ content: null, embeds: [embedEstado], components: [filaBotones] });

    } catch (error) {
        const embedEstadoApagado = new MessageEmbed()
            .setTitle("🔴 SERVIDOR APAGADO")
            .setColor("#d65a5a")
            .setFooter({ text: 'Actualizado:' })
            .setTimestamp();

        await mensajeEstado.edit({ content: null, embeds: [embedEstadoApagado], components: [] });
    }
}

cliente.login(token);