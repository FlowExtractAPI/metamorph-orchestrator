FROM apify/actor-node:20

# Copy package files first for better Docker layer caching
COPY --chown=myuser:myuser package*.json ./

# Install dependencies
RUN npm install --only=prod --no-optional

# Copy the rest of the source code
COPY --chown=myuser:myuser . ./

# Set the command to run the Actor
CMD ["npm", "start"]