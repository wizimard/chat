# chat

## dev
docker compose -f docker-compose.dev.yml up

## prod
docker compose -f docker-compose.build.yml up

## after running containers
docker exec -it server sh
npx prisma migrate dev --name init
npx prisma db push