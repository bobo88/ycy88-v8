# 大五人格测试题目 - 项目搭建

```bash
maven-abc/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── org/
│   │   │       └── example/
│   │   │           ├── App.java
│   │   │           ├── controller/
│   │   │           │   └── QuestionController.java
│   │   │           ├── model/
│   │   │           │   └── Question.java
│   │   │           └── service/
│   │   │               └── QuestionService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │       └── templates/
│   └── test/
│       └── java/
│           └── org/
│               └── example/
│                   └── AppTest.java
└── pom.xml
```

## 使用 Maven 打包

```bash
mvn clean package
```

## 运行 Spring Boot 应用

```bash
# 连接到服务器后，导航到应用程序目录，并运行Spring Boot应用
cd /opt/your-application
nohup java -jar your-application-name-0.0.1-SNAPSHOT.jar > app.log 2>&1 &
```
