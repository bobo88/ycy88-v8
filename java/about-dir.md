# 微服务架构项目的目录结构

## 一、典型的 Java 微服务项目目录结构

在 Java 的微服务架构项目中，通常会采用一种模块化的目录结构来组织代码和资源文件。以下是一个典型的 Java 微服务项目目录结构及其解释：

```
project/
│
├── config/                 # 存放配置文件
│   ├── application.yml     # 应用程序配置文件
│   ├── application-dev.yml # 开发环境配置文件
│   ├── application-prod.yml# 生产环境配置文件
│   └── application-test.yml# 测试环境配置文件
│
├── src/                    # 源代码
│   ├── main/               # 主要代码
│   │   ├── java/           # Java源代码
│   │   │   ├── com/        # 根据公司或组织的域名结构来组织
│   │   │   │   ├── project/    # 项目的根包
│   │   │   │   │   ├── controller/   # 控制器层
│   │   │   │   │   ├── service/      # 服务层
│   │   │   │   │   ├── repository/   # 数据访问层
│   │   │   │   │   ├── model/        # 数据模型
│   │   │   │   │   └── Application.java   # Spring Boot应用程序入口
│   │   ├── resources/      # 资源文件
│   │   │   ├── static/     # 静态资源文件（如CSS、JavaScript）
│   │   │   ├── templates/  # 模板文件（如Thymeleaf模板）
│   │   │   └── application.yml  # 主配置文件
│   │
│   └── test/               # 测试代码
│       ├── java/           # 测试Java源代码
│       └── resources/      # 测试资源文件
│
├── target/                 # 编译输出目录
│
├── Dockerfile              # Docker镜像构建文件
└── pom.xml                 # Maven项目配置文件
```

这个目录结构主要包含以下几个部分：

- **config/**：存放配置文件，主要包括应用程序的配置文件和针对不同环境的配置文件。
- **src/**：存放源代码，主要分为 `main/` 和 `test/` 两个部分。
  - `main/`：存放主要代码，包括 Java 源代码和资源文件。Java 源代码按照包的方式组织，其中包括控制器层、服务层、数据访问层、数据模型等。资源文件主要包括静态资源文件和模板文件，以及主配置文件。
  - `test/`：存放测试代码，包括测试 Java 源代码和测试资源文件。
- **target/**：编译输出目录，存放编译后的类文件和打包后的可执行文件。
- **Dockerfile**：Docker 镜像构建文件，用于定义项目的镜像构建过程。
- **pom.xml**：Maven 项目配置文件，用于管理项目的依赖项和定义项目的构建过程。

## 二、其他结构

```
project/
│
├── config/                 # 存放配置文件
│   ├── application.yml     # 应用程序配置文件
│   ├── application-dev.yml # 开发环境配置文件
│   ├── application-prod.yml# 生产环境配置文件
│   └── application-test.yml# 测试环境配置文件
│
├── src/                    # 源代码
│   ├── main/               # 主要代码
│   │   ├── java/           # Java源代码
│   │   │   ├── cn.com.ycy88.uaa/   # 根据公司或组织的域名结构来组织
│   │   │   │   ├── api/            # 控制器层，包含RESTful API的实现。
│   │   │   │   ├── config/         # 配置类文件，用于配置应用程序的各种配置。
│   │   │   │   ├── controller/     # 控制器类文件，用于处理HTTP请求。
│   │   │   │   ├── interceptor/    # 拦截器类文件，用于拦截请求进行预处理或后处理。
│   │   │   │   ├── plugins/        # 插件类文件，用于扩展应用程序的功能。
│   │   │   │   └── UaaServer.Java  # 应用程序的入口类，包含main方法。
│   │   ├── resources/      # 资源文件
│   │   │   ├── static/     # 静态资源文件（如CSS、JavaScript）
│   │   │   ├── templates/  # 模板文件（如Thymeleaf模板）
│   │   │   └── application.yml  # 主配置文件
│   │
│   └── test/               # 测试代码
│       ├── java/           # 测试Java源代码
│       └── resources/      # 测试资源文件
│
├── target/                 # 编译输出目录
│
├── Dockerfile              # Docker镜像构建文件
└── pom.xml                 # Maven项目配置文件
```

> TODO
