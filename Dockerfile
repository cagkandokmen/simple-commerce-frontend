FROM node:22.9.0-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package.json package-lock.json* ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the app's source code into the container
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 6: Set environment variable for custom port
ENV PORT=80

# Step 7: Expose the port
EXPOSE 80

CMD ["npm", "run", "start"]
