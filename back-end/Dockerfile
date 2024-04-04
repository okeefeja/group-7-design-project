# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

WORKDIR /backend-docker

ENV DATABASE_URL=mysql+pymysql://root:root@127.0.0.1/fitness_app

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m", "flask", "run"]