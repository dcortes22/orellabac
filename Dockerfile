FROM node:argon

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#install botkit
RUN npm install botkit --save
COPY slack_bot.js /usr/src/app/
COPY package.json /usr/src/app/

#set startup commands
CMD ["token=xoxb-49316833511-KGcnu3ZXSAhzHhCKQ9RMt77Q node", "slack_bot"]
