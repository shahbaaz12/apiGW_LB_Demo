This project demonstrates an API flow using Kong as the gateway, Nginx as the load balancer, and two Node.js application instances backed by MongoDB.
All services run together using Docker Compose for easy local testing and request routing.

How to Run

From the project root:

docker compose up --build


This starts:

Kong on port 8000

Nginx load balancer on port 8080

Node apps (app1 and app2)

MongoDB

Postman collections are kept in the postman-collections folder.

How to Hit the Load Balancer Directly

Nginx load balancer is exposed on:

http://localhost:8080


Example:

POST http://localhost:8080/users


This bypasses Kong and sends traffic directly to Nginx, which distributes requests between app1 and app2.

How Requests Flow Through the System

Client calls Kong:

POST http://localhost:8000/users


Kong forwards the request to Nginx:

http://nginx:80/users


Nginx load balancer forwards to one of the Node app instances:

app1: http://app1:3000/users

app2: http://app2:3001/users

Response returns back through Nginx → Kong → Client.