# chat

## dev
docker compose -f docker-compose.dev.yml up

## prod
docker compose -f docker-compose.build.yml up

docker exec -it server sh
npx prisma migrate dev --name init
npx prisma db push