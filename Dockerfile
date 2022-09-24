# FROM jenkins/jenkins:2.346.3-jdk11

# USER root

# RUN apt-get update && apt-get install -y lsb-release

# RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
#   https://download.docker.com/linux/debian/gpg

# RUN echo "deb [arch=$(dpkg --print-architecture) \
#   signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
#   https://download.docker.com/linux/debian \
#   $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list

# RUN apt-get update && apt-get install -y docker-ce-cli

# USER jenkins

# RUN jenkins-plugin-cli --plugins "blueocean:1.25.6 docker-workflow:1.29"

# FROM node:14-alpine
FROM node:13.12.0-alpine
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .
CMD ["npm", "start"]

EXPOSE 3000

# docker run --name jenkins-blueocean --detach ^
#   --network jenkins --env DOCKER_HOST=tcp://localhost:2375 ^
#   --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 ^
#   --volume jenkins-data:/var/jenkins_home ^
#   --volume jenkins-docker-certs:/certs/client:ro ^
#   --volume "%HOMEDRIVE%%HOMEPATH%":/home ^
#   --restart=on-failure ^
#   --env JAVA_OPTS="-Dhudson.plugins.git.GitSCM.ALLOW_LOCAL_CHECKOUT=true" ^
#   --publish 8080:8080 --publish 50000:50000 myjenkins-blueocean:2.361.1-1