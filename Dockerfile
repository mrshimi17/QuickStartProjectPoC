FROM node:8
CMD ["/bin/bash"]
RUN apt-get update -y && \
    apt-get upgrade -y && \    
    apt-get install -y vim && \
    apt-get install ssh rsync -y && \
    apt-get install -y git
RUN git --version
RUN git config --global user.email "mrshimi17"
RUN git config --global user.name "Manohar Shimpi"
RUN pwd
WORKDIR /home/
RUN pwd
RUN git clone https://github.com/mrshimi17/QuickStartProjectPoC.git
WORKDIR /home/QuickStartProjectPoC
RUN echo "CurrentDirectory" ; pwd
RUN git status
RUN git pull
RUN npm install -g node-gyp
RUN npm install
CMD [ "node", "index.js" ]
