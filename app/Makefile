SHELL := /bin/bash

.PHONY: init
init:
	docker build --rm -f ./Dockerfile -t webintrusion/local/app:latest .

.PHONY: run
run:
	export PROJECT_ID=local; \
	docker-compose --file=docker-compose.yaml --project-name=local up --abort-on-container-exit
