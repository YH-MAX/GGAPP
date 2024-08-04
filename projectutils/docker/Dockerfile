FROM ubuntu:24.04
RUN apt-get update && apt-get install -y curl unzip git dotnet-sdk-8.0 openjdk-17-jre sudo
ARG NVM_DIR_ARG=/opt/.nvm
RUN mkdir $NVM_DIR_ARG
RUN chmod 777 $NVM_DIR_ARG
ARG UNAME=jenkins
ARG UID=110
ARG GID=110
RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME && usermod -aG sudo jenkins
RUN echo "jenkins ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
USER jenkins
ENV NODE_VERSION=22.5.0
ENV NVM_DIR=/opt/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/opt/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"