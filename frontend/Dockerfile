# Node image 
FROM node:18-alpine

#Work directory 
WORKDIR /app

#Dependencies 

COPY package*.json ./
RUN npm install

# copying
COPY . .

# expose port
EXPOSE 3000

# by defult command
CMD ["npm", "start"]
