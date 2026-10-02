https://github.com/Enzeedotdev/IMY220



   docker network create harmony-net


   docker build -t harmony-backend ./backend
   docker build -t harmony-frontend ./frontend


   docker run -d --name harmony-backend --network harmony-net -p 3001:3001 -e MONGO_URI="<your Atlas connection string>" harmony-backend


   docker run -d --name harmony-frontend --network harmony-net -p 5173:5173 -e VITE_API_TARGET=http://harmony-backend:3001 harmony-frontend


   http://localhost:5173


   docker stop harmony-frontend harmony-backend
   docker rm harmony-frontend harmony-backend

