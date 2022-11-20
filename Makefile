SHELL := /bin/bash

.PHONY: initall
initall:
	cd app; \
	make init; \
	cd ../dirb_services; \
	make init;

.PHONY: runall
runall:
	export APP_DIR=../app; \
	export DIRB_SERVICES_DIR=../dirb-services; \
	docker-compose \
	-f app/docker-compose.yaml \
	-f dirb-services/docker-compose.yaml \
	--project-name=local up
