FROM ubuntu:16.04

RUN sed -i 's/archive.ubuntu.com/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y curl daemon git python build-essential
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs
RUN useradd -m -s /bin/bash stream

ADD . /home/stream/stream-examples
WORKDIR /home/stream/stream-examples
RUN chown -R stream:stream .

USER stream
RUN npm install --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist

ENTRYPOINT ["daemon", "-f", "-r", "--"]
