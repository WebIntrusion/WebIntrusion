SHELL := /bin/bash

.PHONY: init
init:
	docker build --rm -f ./Dockerfile -t webintrusion/local/dirb-services:latest .

.PHONY: run
run:
	docker-compose --file=docker-compose.yaml --project-name=local up --abort-on-container-exit
