FROM node:16.14.2
WORKDIR /instrument
COPY . /instrument
RUN npm install
EXPOSE 4444
CMD npm start "mongodb+srv://adityaa0544:darkknightoo544@cluster0.lxgmqqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
