# MicroURL
---
A lightweight simple Blogging platform made using Node, Express and uses Mongo DB. The endpoints are protected by JWT based authentication.


### Endpoints 
- Auth
     -  ``` POST <IP>:<port>/auth/register ```
     -  ``` POST <IP>:<port>/auth/login ```
   -  ``` POST <IP>:<port>/auth/logout ```
    
- Post
   - ```GET <IP>:<port>/api/post?authorName=...&title=...```
    - ```GET <IP>:<port>/api/post/:postUID```
    - ```POST <IP>:<port>/api/ -d { title,content,isPublished}```
    - ```PATCH <IP>:<port>/api/:postUID -d { title,content,isPublished}```
    - ```DELETE <IP>:<port>/api/post/:postUID```
### Future Updates
- Comment Controllers and logic
- A frontend