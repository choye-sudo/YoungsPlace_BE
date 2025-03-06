# Build Stage
FROM node:20.17.0 as build

WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Production Stage
FROM node:20.17.0

WORKDIR /usr/src/app

# Add a non-root user
RUN addgroup appgroup && adduser --system --ingroup appgroup appuser

# Copy only necessary files from build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Set ownership of the app directory
RUN chown -R appuser:appgroup /usr/src/app

# Switch to the new user
USER appuser

# Set environment variable
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "start:prod"]
