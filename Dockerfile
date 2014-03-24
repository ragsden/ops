FROM shippable/base
MAINTAINER Sharath "sharath@shippable.com"

RUN apt-get install -y git-core
RUN mkdir -p /opt/shippable/opsDashboard
RUN mkdir -p /opt/shippable/opsDashboard/logs
ADD . /opt/shippable/opsDashboard


RUN cd /opt/shippable/opsDashboard && npm config set ca "" && git pull origin master && git checkout master && git rebase origin/master;\
    cd /opt/shippable/opsDashboard && /usr/local/bin/npm install;


EXPOSE 31154

ENTRYPOINT ["/usr/local/bin/node", "/opt/shippable/opsDashboard/app.js"]
