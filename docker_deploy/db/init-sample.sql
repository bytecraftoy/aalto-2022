-- keep username and password in sync with ./../.backend-env
-- replace "RANDOM-PASSWORD" with the same pasword that is given for "POSTGRES_ADMINJS_PASSWORD" in ./../.backend-env
CREATE USER adminjs WITH SUPERUSER PASSWORD 'RANDOM-PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE aalto_backend TO adminjs;
