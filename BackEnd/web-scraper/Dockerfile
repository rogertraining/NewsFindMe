FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine
RUN apk --update add bash nano
WORKDIR /var/www/app
COPY ./requirements.txt /var/www/requirements.txt
COPY ./main.py /var/www/main.py
COPY ./app/__init__.py /var/www/app/__init__.py
COPY ./app/views.py /var/www/app/views.py
RUN pip install -r /var/www/requirements.txt
RUN pip3 install requests
RUN pip install beautifulsoup4
EXPOSE 56733