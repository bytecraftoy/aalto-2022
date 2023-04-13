-- keep username and password in sync with .env/.env-sample
CREATE USER adminjs WITH SUPERUSER PASSWORD 'DEV-SERVER-dOaf4YKgfG6A1jl3';
GRANT ALL PRIVILEGES ON DATABASE aalto_backend TO adminjs;
