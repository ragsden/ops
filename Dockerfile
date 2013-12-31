FROM ubuntu:latest

RUN echo 'export PATH=$PATH:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' >> /etc/environment;
RUN  echo "deb http://archive.ubuntu.com/ubuntu precise universe restricted multiverse" >> /etc/apt/sources.list;
RUN apt-get -y install --force-yes build-essential libxslt-dev libxml2-dev libpq5 libpq-dev git git-core wget curl g++ texinfo make vim;

RUN apt-get -y install openssh-server

RUN apt-get update
RUN apt-get -y install python-software-properties software-properties-common;
RUN apt-get -y install --force-yes python-dev;
RUN apt-get -y install --force-yes python-pip;

RUN add-apt-repository ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install nodejs

RUN /usr/bin/pip install supervisor;

ADD . /code

RUN chmod +x /code/run.sh && \
    mkdir /var/run/sshd && \
    echo 'root:f!zzb!n' | chpasswd

RUN npm install supervisor -g

RUN cd /code;npm install

EXPOSE 22 80 3000

CMD supervisord -c /code/supervisor.conf -n
