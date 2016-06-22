if (!process.env.SLACK_TOKEN) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.SLACK_TOKEN
}).startRTM();

controller.hears(['cuenteme algo', 'cuenteme un chiste', 'cuente un chiste', 'estoy aburrido'], 'direct_message,direct_mention,mention', function(bot, message){
  var stories = ['- Mama que haces en frente de la computadora con los hojos cerrados??? \n- Nada hijo es que Windows me dijo que cierre las pestañas',
                 'Un hombre está haciendo un vuelo en un globo aerostático.' +
                 'Se extravía y decide descender y preguntar a alguien. Baja a ' +
                 'unos 10 metros del suelo y pregunta a una persona que pasaba por allí: \n' +
                 '- Por favor, ¿puede decirme donde estoy?\n' +
                 '- Pues mire, está usted en un globo aerostático, a unos 10 metros del suelo.\n'+
                 '- Usted es informático, ¿verdad?\n'+
                 '- Sí, ¿cómo lo sabe?\n'+
                 '- Porque me ha dado una respuesta técnicamente correcta, pero que no me soluciona nada.\n'+
                 '- Y usted es usuario, ¿verdad?\n'+
                 '- Pues sí, ¿cómo lo sabe?\n'+
                 '- Porque está igual de perdido que antes, pero ahora me echa la culpa a mí.',
                 '¿Qué le dice una IP a otra?\n'+
                 '—¿Qué tramas?', 'http://img.desmotivaciones.es/201508/sexo-silencio-desmotivaciones.jpg',
                 'http://img.desmotivaciones.es/201112/informatica.jpg', 'https://lh3.googleusercontent.com/-RanqDppqME4/VUOZ06phYnI/AAAAAAAAADQ/q0sTl6Ygrcs/w800-h800/por-esos-chistes-malos-carteles-chistes-tonterias-risa-sonrisa-desmotivaciones.jpg',
                 'http://img.desmotivaciones.es/201101/images_4701.jpg', 'http://img.desmotivaciones.es/201011/bandaancha.jpg'];
  var story = stories[Math.floor(Math.random() * stories.length)];
  bot.reply(message, 'Que tal un chiste?')
  bot.reply(message, story);
});

controller.hears(['este es un trabajo para la doctora', 'doctora'], 'ambient', function(bot,message){
  bot.reply(message, "http://67.media.tumblr.com/6339f52d38760a700ca9adc48eab43ea/tumblr_o17hspcySq1rzlfxxo1_1280.gif");
});

controller.hears(['insulte'], 'direct_message,direct_mention,mention', function(bot,message){
  var insults = ["http://i.imgur.com/9IZACjN.jpg",
                  "http://i.imgur.com/ftc2h0p.jpg",
                  "http://i.imgur.com/QEb2GaS.jpg",
                  "http://i.imgur.com/LHQ5FXf.jpg",
                  "http://i.imgur.com/rNW9J0D.jpg",
                  "http://i.imgur.com/slGGjh9.png",
                  "http://i.imgur.com/ijuqlp7.png",
                  "http://i.imgur.com/riHJxSx.png",
                  "http://i.imgur.com/21vNjxl.png",
                  "http://i.imgur.com/XlMRGDE.png",
                  "http://i.imgur.com/y9iuoKk.png",
                  "http://i.imgur.com/zmU7RBF.png",
                  "http://i.imgur.com/nrLtb7S.png",
                  "http://i.imgur.com/m0U288v.gif",
                  "http://i.imgur.com/W5LGPj7.gif",
                  "http://i.imgur.com/GZfjPDH.gif",
                  "http://i.imgur.com/TM0qYRi.gif",
                  "http://i.imgur.com/dUb0C1V.gif",
                  "http://i.imgur.com/WFdLzo9.gif",
                  "http://i.imgur.com/doE0ChC.gif",
                  "http://i.imgur.com/Jal12NU.gif",
                  "http://i.imgur.com/SOEQQ6m.gif",
                  "http://i.imgur.com/OJkjPnP.gif",
                  "http://i.imgur.com/CjTPuvh.gif",
                  "http://i.imgur.com/5cpGsja.gif",
                  "http://i.imgur.com/23J4RqC.gif",
                  "http://i.imgur.com/m7qUTLq.gif",
                  "http://i.imgur.com/qwk5kKT.gif",
                  "http://i.imgur.com/6b9OqaI.gif",
                  "http://i.imgur.com/mcL83zN.gif",
                  "http://i.imgur.com/bwzg7nr.gif",
                  "http://i.imgur.com/H92PB5P.gif",
                  "http://i.imgur.com/8sqhwOg.gif",
                  "http://i.imgur.com/WPGwXHq.gif",
                  "http://i.imgur.com/cOVQQq6.gif",
                  "http://cdn.emgn.com/wp-content/uploads/2015/01/Rude-Animal-Facts-EMGN1.png",
                  "http://cdn.emgn.com/wp-content/uploads/2015/01/Rude-Animal-Facts-EMGN2.png",
                  "http://cdn.emgn.com/wp-content/uploads/2015/01/Rude-Animal-Facts-EMGN4.png",
                  "http://cdn.emgn.com/wp-content/uploads/2015/01/Rude-Animal-Facts-EMGN5.png",
                  "http://cdn.emgn.com/wp-content/uploads/2015/01/Rude-Animal-Facts-EMGN6.jpg",
                  "http://i.imgur.com/dMDdQOI.gif",
                  "http://i.imgur.com/4PhyZKv.gif",
                  "http://i.imgur.com/6OGiTqc.gif",
                  "http://i.imgur.com/WtDpHiL.gif",
                  "http://i.imgur.com/7PIIlI7.gif",
                  "http://replygif.net/i/186.gif",
                  "http://i.imgur.com/TLDBTeV.gif",
                  "http://i.imgur.com/HegZkkc.gif",
                  "http://i.imgur.com/clcdkfP.gif",
                  "http://i.imgur.com/c5yeWVx.gif",
                  "http://i.imgur.com/IG4Evs9.gif",
                  "http://i.imgur.com/VJCWcnK.gif",
                  "http://i.imgur.com/QFrk1X5.gif",
                  "http://i.imgur.com/kXGUKwD.gif",
                  "http://i.imgur.com/Jnit9mq.gif",
                  "http://i.imgur.com/iQjNakW.gif",
                  "http://i.imgur.com/5Zfltup.gif",
                  "http://i.imgur.com/OdYTqoB.gif",
                  "http://i.imgur.com/LCy4zVv.gif",
                  "http://i.imgur.com/DZ64Fu7.gif",
                  "http://i.imgur.com/DAzfQh6.gif",
                  "http://i.imgur.com/R8Ou2cj.gif"];
    var insult = insults[Math.floor(Math.random() * insults.length)];
    bot.reply(message, insult);
});

controller.hears(['orellabac'], 'ambient', function(bot, message){
  var userID = message.user;
  var user = "<@"+userID+">";
  var reply = user + " hagame mention, no hable a mis espaldas :rage:";
  bot.reply(message, reply);
});

controller.hears(['no entiendo', 'no entendi', 'expliqueme', 'me explica'], 'ambient', function(bot, message){
  bot.reply(message, "https://s-media-cache-ak0.pinimg.com/736x/2e/29/87/2e298711c7fec1d77637a982235c9910.jpg");
});

controller.hears(['me llamo (.*)', 'mi nombre es (.*)', 'soy (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    var name = message.match[1];
    bot.reply(message, 'Quiere un trofeo o fiesta en hooters? ' + "<@"+message.user+">");
});

controller.on("bot_channel_join", function(bot, message){
  bot.reply(message,"Ahora si empieza lo bueno :smirk:");
});

controller.on("bot_group_join", function(bot, message){
  bot.reply(message,"Ahora si empieza lo bueno :smirk:");
});

controller.on("user_channel_join", function(bot, message) {
  var intro = "Bienvenido al canal <@"+message.user+">";
  bot.reply(message, intro);
})

controller.on("user_group_join", function(bot, message) {
  var intro = "Bienvenido al grupo <@"+message.user+">";
  bot.reply(message, intro);
})

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }

    uptime = uptime + ' ' + unit;
    return uptime;
}
