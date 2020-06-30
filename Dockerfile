FROM nginx
ADD . /root
RUN apt update &&\
        apt -y install git curl gnupg2 &&\
        curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - &&\
        echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list &&\
        apt update && apt -y install yarn &&\
        cd /root/transformations/ &&\
        yarn install &&\
        yarn build &&\
	rm -r /usr/share/nginx/html/ &&\
	cp -r /root/transformations/build /usr/share/nginx/html
