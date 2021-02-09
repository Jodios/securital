# base image
FROM node:14 AS securital

# set working directory
WORKDIR /app
COPY . .

RUN ls
RUN npm ci && npm -g install @angular/cli
RUN ng build --prod --base-href ./ 

# deleting everything but the dist folder and moving contents
# of dist folder up one
RUN find . -maxdepth 1 ! -name dist ! -name . ! -name .. -exec rm -fR {} +
RUN mv ./dist/securital . && rm -fR ./dist
RUN ls

# Running nginx server
# exposing the port for the app
FROM nginx:stable
COPY --from=securital /app/securital /usr/share/nginx/html
EXPOSE 4200