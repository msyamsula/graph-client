ship:
	npm run build
	docker build -t syamsuldocker/syamsulapp-graph:${TAG} .
	docker push syamsuldocker/syamsulapp-graph:${TAG}