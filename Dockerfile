FROM shippable/base
MAINTAINER Sharath "sharath@shippable.com"

RUN mkdir -p /opt/shippable/opsDashboard
ADD . /opt/shippable/opsDashboard


RUN cd /opt/shippable/opsDashboard git pull origin master && git checkout master && git rebase origin/master;\
    cd /opt/shippable/opsDashboard && /usr/local/bin/npm install;


EXPOSE 31154

ENTRYPOINT ["/usr/local/bin/node", "/opt/shippable/opsDashboard/app.js"]