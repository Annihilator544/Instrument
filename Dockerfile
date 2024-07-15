FROM node:16.14.2
WORKDIR /instrument
COPY . /instrument
RUN npm install
EXPOSE 4444
CMD npm start
