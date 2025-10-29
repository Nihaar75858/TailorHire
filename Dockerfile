FROM python:3.11-slim
ENV PYTHONBUFFERED=1 

COPY ./requirements.txt /requirements.txt
RUN pip3 install -r requirements.txt

RUN mkdir /app
WORKDIR /server/app
COPY ./server/app /app