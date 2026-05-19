# Step 1: Node image use karein
FROM node:18-alpine

# Step 2: Work directory set karein
WORKDIR /app

# Step 3: Dependencies install karein
COPY package*.json ./
RUN npm install

# Step 4: Saara code copy karein
COPY . .

# Step 5: Port 3000 expose karein
EXPOSE 3000

# Step 6: React app start karein
CMD ["npm", "start"]
