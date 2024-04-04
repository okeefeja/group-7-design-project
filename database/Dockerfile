# syntax=docker/dockerfile:1

FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=root

COPY ./fitness_app.sql ./docker-entrypoint-initdb.d/


#Docker Volumes may be interesting