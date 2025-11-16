This project demonstrates an API flow using Kong as the API gateway, Nginx as the load balancer, and two Node.js application instances backed by MongoDB.
All services run using Docker Compose for easy local testing and routing.

How to Run

From the project root:

docker compose up --build


This starts:

Kong on port 8000

Nginx load balancer on port 8080

Node.js apps (app1 and app2)

MongoDB

Postman collections are stored in the postman-collections folder.

How to Hit the Load Balancer Directly

Nginx load balancer is exposed at:

http://localhost:8080


Example request:

POST http://localhost:8080/users


This bypasses Kong and sends the request directly to Nginx, which forwards it to app1 or app2.

Request Flow Diagram
            +-------------+
            |   Client    |
            +-------------+
                   |
                   | HTTP Request (e.g., POST /users)
                   v
            +-------------+
            |    Kong     |  (port 8000)
            +-------------+
                   |
                   | Forwards to internal service
                   v
            +-------------+
            |   Nginx     |  (port 8080 inside network)
            +-------------+
                   |
           +-------+--------+
           |                |
           v                v
   +-------------+   +-------------+
   |    app1     |   |    app2     |
   |  (port 3000)|   |  (port 3001)|
   +-------------+   +-------------+
                   |
                   v
            +-------------+
            |   MongoDB   |
            +-------------+

How Requests Flow Through the System

Client calls Kong:

POST http://localhost:8000/users


Kong forwards the request to Nginx:

http://nginx:80/users


Nginx load balancer forwards the request to one of the Node.js apps:

http://app1:3000/users

http://app2:3001/users

The response returns through Nginx → Kong → Client.