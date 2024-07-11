![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![RabbitMQ](https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

# xpert: scientific texts classificator


xpert is a web app for classification of scientific texts by topics.

It is created to help:
- 📚 organize scientific text within libraries
- 🧑‍🎓 students find the best topic for their ideas in conferences

![main](<readme-img/main.png>)

## Table of contents 

- [Table of contents](#table-of-contents)
- [Installation](#installation)
  - [Installation using Docker Compose](#installation-using-docker-compose)
  - [Manual installation](#manual-installation)
    - [Requirements](#requirements)
    - [User Interface](#user-interface)
    - [Classification](#classification)
    - [Text from image](#text-from-image)
    - [Auth](#auth)
    - [Users](#users)
    - [Feedbacks](#feedbacks)
    - [Classification history](#classification-history)
- [Architecture](#architecture)
- [AI model](#ai-model)
- [Screenshots](#screenshots)

## Installation
Go to the project root folder. Choose manual installation or using Docker Compose.

The AI model folder is not included because the model file exceeds the GitHub maximum file size 😭

### Installation using Docker Compose 
```
docker-compose up
```


### Manual installation

#### Requirements

- server RabbitMQ
- mongoDB databases for 
  - classification history
  - users
  - auth
  - feedbacks



#### User Interface
```
cd front
npm i
npm run start
```


#### Classification
```
cd back/topic-classifier
pip install -r requirements.txt
python -u src/index.py
```


#### Text from image
```
cd back/ocr
npm i
npm run start
```

#### Auth
```
cd back/auth
npm i
npm run start
```


#### Users
```
cd back/users
npm i
npm run start
```



#### Feedbacks
```
cd back/feedbacks
npm i
npm run start
```


#### Classification history
```
cd back/classification-history
npm i
npm run start
```

## Architecture
![image](<readme-img/architecture.png>)

## AI model
![image](<readme-img/ai.png>)


## Screenshots
![image](<readme-img/main.png>)
![image](<readme-img/feedback.png>)
![image](<readme-img/login.png>)
![image](<readme-img/registration.png>)
![image](<readme-img/profile.png>)

