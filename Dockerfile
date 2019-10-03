FROM node:latest
RUN mkdir -p /usr/src/vending-backend
WORKDIR /usr/src/vending-backend
COPY package.json /usr/src/vending-backend
RUN npm install
COPY . /usr/src/vending-backend
EXPOSE 7000
EXPOSE 3000
CMD ["npm", "start"]