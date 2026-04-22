#Use Official Node Image
FROM node:18-alpine

#Set working directory
WORKDIR /app

#Copy dependency files 
COPY package*.json ./

#Install dependencies
RUN npm install --production

#Copy app code
COPY app.js .

#Tell Docker to expose port 3000
EXPOSE 3000

#Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !==200) throw new Error(r.statusCode)})"

#Run app
CMD ["npm", "start"]
