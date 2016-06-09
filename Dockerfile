FROM node:argon

# create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#install botkit
RUN npm install botkit --save
COPY slack_bot.js /usr/src/app/
COPY package.json /usr/src/app/
COPY lib /usr/src/app/lib

#set startup commands
CMD ["node", "slack_bot"]
