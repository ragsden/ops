FROM shippable/base
MAINTAINER Sharath "sharath@shippable.com"


RUN mkdir -p /opt/shippable/opsDashboard
ADD . /opt/shippable/opsDashboard
RUN mkdir -p /opt/shippable/opsDashboard/logs


RUN cd /opt/shippable/opsDashboard && /usr/local/bin/npm install;


EXPOSE 31154

ENTRYPOINT ["/usr/local/bin/npm", "start", "/opt/shippable/opsDashboard"]
