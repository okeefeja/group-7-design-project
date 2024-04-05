# syntax=docker/dockerfile:1

FROM node:14-alpine

WORKDIR /frontend-docker

RUN npm install -g expo-cli
RUN npm install -g typescript

COPY package.json yarn.lock ./
RUN npm install

COPY . .
