FROM node
WORKDIR /app
COPY . /app
EXPOSE 3001
RUN mkdir db
RUN mkdir public/uploads
RUN yarn install
CMD ["npm", "start"]
