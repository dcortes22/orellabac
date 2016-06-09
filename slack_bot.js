/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack bot built with Botkit.

This bot demonstrates many of the core features of Botkit:

* Connect to Slack using the real time API
* Receive messages based on "spoken" patterns
* Reply to messages
* Use the conversation system to ask questions
* Use the built in storage system to store and retrieve information
  for a user.

# RUN THE BOT:

  Get a Bot token from Slack:

    -> http://my.slack.com/services/new/bot

  Run your bot from the command line:

    token=<MY TOKEN> node slack_bot.js

# USE THE BOT:

  Find your bot inside Slack to send it a direct message.

  Say: "Hello"

  The bot will reply "Hello!"

  Say: "who are you?"

  The bot will tell you its name, where it running, and for how long.

  Say: "Call me <nickname>"

  Tell the bot your nickname. Now you are friends.

  Say: "who am I?"

  The bot will tell you your nickname, if it knows one for you.

  Say: "shutdown"

  The bot will ask if you are sure, and then shut itself down.

  Make sure to invite your bot into other channels using /invite @<my bot>!

# EXTEND THE BOT:

  Botkit has many features for building cool and useful bots!

  Read all about it here:

    -> http://howdy.ai/botkit

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();


controller.hears(['hola'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });


    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hola ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hola.');
        }
    });
});

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
  var story = stories[Math.floor(Math.random() * stories.length)]
  bot.reply(message, 'Que tal un chiste?')
  bot.reply(message, story);
});

controller.hears(['picnic'], 'ambient', function(bot, message){
  var userID = message.user;
  var user = "<@"+userID+">";
  var reply = user + " hagame mention, no hable a mis espaldas :rage:";
  bot.reply(message, reply);
});

controller.hears(['julio', 'orlando', 'orly'], 'direct_message,direct_mention,mention,ambient', function(bot, message){
  var userID = message.user;
  var user = "<@"+userID+">";
  var reply = user + " eso que dijo merece esto";
  bot.reply(message, reply);
  bot.reply(message, 'http://gph.is/1HlCG6v');
});

controller.hears(['me llamo (.*)', 'mi nombre es (.*)', 'soy (.*)'], 'direct_message,direct_mention,mention', function(bot, message) {
    var name = message.match[1];
    controller.storage.users.get(message.user, function(err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function(err, id) {
            bot.reply(message, 'Ok. Lo voy a llamar ' + user.name + ' desde ahora.');
        });
    });
});

controller.on("bot_channel_join", function(bot, message){
  bot.reply(message, "Ahora si empieza lo bueno :smirk:");
});

controller.hears(['jale a comer', 'almuerzo', 'comida', 'comen'], 'ambient', function(bot, message){
  var userID = message.user;
  var user = "<@"+userID+">";
  bot.reply(message, "Yo me encargo " + user);
  bot.say({text: "@channel: hey todos dice " + user + " que tiene hambre a donde vamos",
           channel:"C11429SQ6"});
});

controller.hears(['como me llamo', 'quien soy', 'cual es mi nombre'], 'direct_message,direct_mention,mention', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {
        if (user && user.name) {
            bot.reply(message, 'Su nombre es ' + user.name);
        } else {
            bot.startConversation(message, function(err, convo) {
                if (!err) {
                    convo.say('Aun no se su nombre');
                    convo.ask('Como debo llamarlo', function(response, convo) {
                        convo.ask('Quiere que lo llame `' + response.text + '`?', [
                            {
                                pattern: 'si',
                                callback: function(response, convo) {
                                    // since no further messages are queued after this,
                                    // the conversation will end naturally with status == 'completed'
                                    convo.next();
                                }
                            },
                            {
                                pattern: 'no',
                                callback: function(response, convo) {
                                    // stop the conversation. this will cause it to end with status == 'stopped'
                                    convo.stop();
                                }
                            },
                            {
                                default: true,
                                callback: function(response, convo) {
                                    convo.repeat();
                                    convo.next();
                                }
                            }
                        ]);

                        convo.next();

                    }, {'key': 'nickname'}); // store the results in a field called nickname

                    convo.on('end', function(convo) {
                        if (convo.status == 'completed') {
                            bot.reply(message, 'Ok, he aprendido algo nuevo hoy...');

                            controller.storage.users.get(message.user, function(err, user) {
                                if (!user) {
                                    user = {
                                        id: message.user,
                                    };
                                }
                                user.name = convo.extractResponse('nickname');
                                controller.storage.users.save(user, function(err, id) {
                                    bot.reply(message, 'Ok lo llamare ' + user.name + ' a partir de ahora');
                                });
                            });



                        } else {
                            // this happens if the conversation ended prematurely for some reason
                            bot.reply(message, 'OK, no hay problema');
                        }
                    });
                }
            });
        }
    });
});


controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function(bot, message) {

    bot.startConversation(message, function(err, convo) {

        convo.ask('Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: function(response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function() {
                        process.exit();
                    }, 3000);
                }
            },
        {
            pattern: bot.utterances.no,
            default: true,
            callback: function(response, convo) {
                convo.say('*Phew!*');
                convo.next();
            }
        }
        ]);
    });
});


controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
    'direct_message,direct_mention,mention', function(bot, message) {

        var hostname = os.hostname();
        var uptime = formatUptime(process.uptime());

        bot.reply(message,
            ':robot_face: I am a bot named <@' + bot.identity.name +
             '>. I have been running for ' + uptime + ' on ' + hostname + '.');

    });

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
