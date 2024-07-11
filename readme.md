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

