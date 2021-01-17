.PHONY: $(MAKECMDGOALS)

setup:
	docker-compose build

setup-no-cache:
	docker-compose --no-cache build

server:
	docker-compose up -d

server-dev:
	docker-compose -f docker-compose.dev.yml up -d

server-down:
	docker-compose down

logs:
	docker-compose logs -f

# All test suites
test:
	echo "Running test suite for API"
	docker-compose exec api sh -c "yarn test"

	echo "Running test suite for Front-end"
	docker-compose exec app sh -c "yarn test --watchAll=false"
