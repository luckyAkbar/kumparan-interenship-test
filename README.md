# WELCOME TO MY REPOSITORY!
## I want to say welcome to all of you, especially Kumparan's Backend Engineering Internship Selection Teams!

### This Repository was build to fulfill internship @ Kumparan X Kampus Merdeka

### Live Version
This app already deployed on: https://luckyakbar.tech/kumparanTest

### What is inside this app?
  1. Create new article
      - route: '/create/article'
      - method: POST
      - type: application/json
      - body request: authorID, title, body (all mandatory)
      - response: articleID
  2. Search article
      - route: '/find/article'
      - method: GET
      - type: application/json
      - query params: author, query (all optional)
      - response: [title, body, created_at, author_name]

### App requirement (defined on technical assesment details)
  1. Write solution in NodeJS or Golang (fulfilled)
  2. Use any popular database, search engine etc (fullfilled)
  3. Unit test / integration test (fulfilled)
  4. Use docker-compose for deployement (Using Nginx and PM2 in deployment)
  5. Do not use ORM (fulfilled. using native PG module)

### Tech stack
  - Lang: Javascript
  - ENV: NodeJS
  - Server: AWS EC2 Ubuntu Server 20.04
  - Framework: Express.JS
  - Database: Postgresql
  - Reverse Proxy: Nginx
  - Load Balancer: Nginx

### Possible Problem (defined on technical assesment details)
  1. What if there are thousands of articles in the database?
      - We have to prepare the database!
      - My app will be able to handle the creation of thousands of article, because i use Postgresql in database layer, with also using pool connection. This will make one connection to the database can be used by multiple client.
      - Using poooled connection also will increase scalability.
      - In search article endpoint, i'm not using query %%LIKE%% to search for the related article, instead i take advantage of built-in full text search from Postgresql.
      - Why not using %%LIKE%% query? Because it's so expensive and will take very long to complete. Also, this technique will only return exact match. So if we are searching word computer, the word laptop will never be returned.
      - What is full text search? Simply feature to deeply search dictionary close meaning of a word using tensor or smart algorithm in which machine learning was embedded.
  2. What if many users are acessing your API at the same time?
      - Using Load Balanced, such as Nginx!
      - This can be done, first start as many server as you can. This servers can be categorized as Cluster!
      - Set Nginx as reverse proxy and also as a load balancer
      - Register your running server in server list
      - Everytime user hits your reverse proxy, Nginx will automatically distribute the load to every server listed in server list. So, you client will not have to wait just like in a queue!
      - Using this technique will also increase scalability, because you just have to start a new server, and then register it in the load balancer if the traffic is high.

### Step to run this app
1. Install NodeJS
2. Install Postgresql
3. Clone / Pull this repo
4. Run: npm install
5. Install PM2
6. Install Nginx
7. Run this server multiple times on different ports
8. Register all the running server on Nginx server list
9. App ready to use



##### Note:
- You can setup Nginx to be a reverse proxy and a load balancer using this setup:
```
  log_format upstreamlog '$server_name to: $upstream_addr [$request] '
          'upstream_response_time $upstream_response_time '
          'msec $msec request_time $request_time';

  upstream notes {
          server localhost:6000; # List all your running server here
          server localhost:7000;
          server localhost:8000;
  }

  server {
          listen 10000;
          server_name www.luckyakbar.tech;
          access_log /var/log/nginx/access_lb.log upstreamlog;

          location / {
                  proxy_pass http://notes;
                  proxy_http_version 1.1;
                  proxy_set_header Upgrade $http_upgrade;
                  proxy_set_header Connection "upgrade";
          }
  }
```