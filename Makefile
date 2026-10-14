SHELL := /bin/sh
.DEFAULT_GOAL := all

COMPOSE ?= docker compose
SERVICE ?=
ARGS ?=

# Mount the source so generated migrations stay on the host, with its ownership.
DJANGO = $(COMPOSE) run --rm --no-deps --user "$$(id -u):$$(id -g)" --volume "$(CURDIR)/backend:/app" backend python manage.py

.PHONY: all help init up build down clean stop restart re logs ps health check test \
        makemigrations migrate superuser manage shell dbshell fclean docker-check

all: up ## Préparer et démarrer le projet (commande par défaut).

help: ## Afficher les commandes disponibles.
	@awk 'BEGIN {FS = ":.*## "; print "Usage : make [commande] [SERVICE=backend] [ARGS=...]\n"} /^[a-zA-Z_-]+:.*## / {printf "  %-18s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

init: ## Créer .env avec des secrets aléatoires, sans écraser un fichier existant.
	@set -eu; \
	if [ -e .env ]; then \
		printf '%s\n' '.env existant conservé.'; \
	else \
		umask 077; \
		postgres_password=$$(od -An -N32 -tx1 /dev/urandom | tr -d ' \n'); \
		django_secret_key=$$(od -An -N48 -tx1 /dev/urandom | tr -d ' \n'); \
		if [ "$${#postgres_password}" -ne 64 ] || [ "$${#django_secret_key}" -ne 96 ]; then \
			printf '%s\n' 'Impossible de générer les secrets.' >&2; exit 1; \
		fi; \
		env_tmp=$$(mktemp .env.tmp.XXXXXX); \
		trap 'rm -f "$$env_tmp"' 0; \
		sed -e "s/^POSTGRES_PASSWORD=.*/POSTGRES_PASSWORD=$$postgres_password/" \
		    -e "s/^DJANGO_SECRET_KEY=.*/DJANGO_SECRET_KEY=$$django_secret_key/" \
		    .env.example > "$$env_tmp"; \
		ln "$$env_tmp" .env; \
		printf '%s\n' '.env créé avec de nouveaux secrets.'; \
	fi

docker-check:
	@$(COMPOSE) version >/dev/null 2>&1 || { printf '%s\n' 'Docker Compose V2 est requis pour cette commande.' >&2; exit 1; }

up: init docker-check ## Construire et démarrer les services en arrière-plan.
	$(COMPOSE) up --build -d
	@printf '%s\n' 'Application : https://localhost:8443' 'État des services : make ps'

build: init docker-check ## Construire les images (option : SERVICE=backend).
	$(COMPOSE) build $(SERVICE)

down: docker-check ## Arrêter et supprimer les conteneurs, en conservant les données.
	$(COMPOSE) down

clean: down ## Même chose que down ; les données sont conservées.

stop: docker-check ## Arrêter les conteneurs sans les supprimer (option : SERVICE=backend).
	$(COMPOSE) stop $(SERVICE)

restart: docker-check ## Redémarrer sans reconstruire les images (option : SERVICE=backend).
	$(COMPOSE) restart $(SERVICE)

re: ## Arrêter, reconstruire et relancer le projet, en conservant les données.
	$(MAKE) down
	$(MAKE) up

logs: docker-check ## Suivre les 100 dernières lignes de logs (option : SERVICE=backend).
	$(COMPOSE) logs --follow --tail=100 $(SERVICE)

ps: docker-check ## Afficher l'état des services.
	$(COMPOSE) ps

health: ## Vérifier la santé de l'API via HTTPS local (nécessite curl).
	curl --fail --silent --show-error --insecure https://localhost:8443/api/health/
	@printf '\n'

check: docker-check ## Vérifier Compose, Django et les types TypeScript ; services démarrés requis.
	$(COMPOSE) config --quiet
	$(DJANGO) check
	$(COMPOSE) exec -T frontend npm run lint

test: docker-check ## Lancer les tests Django (option : ARGS=apps.users).
	$(DJANGO) test $(ARGS)

makemigrations: docker-check ## Créer les fichiers de migration dans backend/ (option : ARGS=users).
	$(DJANGO) makemigrations $(ARGS)

migrate: docker-check ## Appliquer les migrations à la base de données.
	$(DJANGO) migrate $(ARGS)

superuser: docker-check ## Créer un administrateur Django.
	$(DJANGO) createsuperuser

manage: docker-check ## Exécuter une commande Django, par exemple ARGS="showmigrations".
	$(DJANGO) $(ARGS)

shell: docker-check ## Ouvrir un terminal dans un service (backend par défaut).
	$(COMPOSE) exec $(or $(SERVICE),backend) sh

dbshell: docker-check ## Ouvrir la console PostgreSQL.
	$(COMPOSE) exec db sh -c 'exec psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"'

fclean: docker-check ## Supprimer les conteneurs ET toutes les données locales (volumes).
	$(COMPOSE) down --volumes
