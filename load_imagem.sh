docker build -t jeffersonfarias/catalogo-dados-frontend:1.0.0  -f Dockerfile .
docker login --username=jeffersonfarias
docker push jeffersonfarias/catalogo-dados-frontend:1.0.0
