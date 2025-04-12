# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for efficient caching
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of your frontend code into the container
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Expose the port the app will run on
EXPOSE 3000

# Step 8: Run the application
CMD ["npm", "start"]
