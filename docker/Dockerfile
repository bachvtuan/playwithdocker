FROM ubuntu:16.04

MAINTAINER Tuan Bach "tuan@legiti.co"

# Update aptitude with new repo
RUN apt-get update

# Install software 
RUN apt-get install -y git
RUN apt-get install -y wget xz-utils bzip2
# Make ssh dir
RUN mkdir /root/.ssh/

# this is public git so it is not necessary
# Copy over private key, and set permissions
#ADD id_rsa /root/.ssh/id_rsa
# Set chmod 
#RUN chmod 400 /root/.ssh/id_rsa
# Create known_hosts
#RUN touch /root/.ssh/known_hosts
#RUN ssh-keyscan git.legitiapplications.com >> /root/.ssh/known_hosts

WORKDIR /data
RUN wget https://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-x64.tar.xz

RUN tar xf /data/node-v8.9.4-linux-x64.tar.xz
RUN cd /data/node-v8.9.4-linux-x64/bin && ls

RUN ln -s /data/node-v8.9.4-linux-x64/bin/node /usr/local/bin/node
RUN ln -s /data/node-v8.9.4-linux-x64/bin/npm /usr/local/bin/npm

# Clone the conf files into the docker container
RUN git clone -b client/proofstack_development git@git.legitiapplications.com:legiti-staffs/TeknoRecordWeb.git


# Copy the current directory contents into the container at /data
ADD . /data

RUN cd /data/playwithdocker &&  git pull 


WORKDIR "/data/playwithdocker/code"

RUN npm install 

EXPOSE 3000
CMD ["node","app.js"]