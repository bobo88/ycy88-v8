# 实践：阿里云 ECS 服务器

## 一、下载安装（基于 CentOS 8.5 64 位）

### 1.1 安装 JDK

- 定位到自定义的目录，比如： /root
- 下载压缩包：wget https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.tar.gz -O jdk_17.tgz
- 解压压缩包：tar zxvf jdk_17.tgz
- 移动解压文件：
  - mkdir /usr/local/java
  - mv /root/jdk-17.0.5 /usr/local/java
- 修改环境变量

  - 修改环境变量，通过命令: vim /etc/profile
  - 用 vim 编辑器来编辑 profile 文件，在文件末尾添加一下内容（按“i”进入编辑）

  ```js
  export JAVA_HOME=/usr/local/java
  export JRE_HOME=${JAVA_HOME}/jre
  export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib:$CLASSPATH
  export JAVA_PATH=${JAVA_HOME}/bin:${JRE_HOME}/bin
  export PATH=$PATH:${JAVA_PATH}
  ```

- 让配置生效：
  ```
  source /etc/profile
  ```

### 1.2 安装 Jenkins

- 进入官网：https://pkg.jenkins.io/redhat-stable/
  ```
  sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
  sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
  ```
- 修改配置文件
  - cd /etc/sysconfig
  - vi jenkins: 按“i”进行编辑，找到字段 JENKINS_PORT="8080"，修改成 JENKINS_PORT="8888"
  - 保存退出： (esc 按键) + (:wq!)
- 查找 jdk 安装位置，将位置配置到 jenkins 里面：
  - whereis java
    <img width="100%" src="/images/tools/jenkins/jenkins_1.png" /><br/>
  - vim /etc/init.d/jenkins
    <img width="100%" src="/images/tools/jenkins/jenkins_2.png" /><br/>
- 重启 Jenkins：

  - systemctl start jenkins
  - 如果上述命令警告报错，则需要 systemctl daemon-reload

  ```
  systemctl daemon-reload

  systemctl restart jenkins
  ```

  <img width="100%" src="/images/tools/jenkins/jenkins_3.png" /><br/>

:::warning 提示
这里可能会出现 ip:8888 访问不了的情况，由于是使用阿里云服务器，所以需要去配置安全组规则。
:::

  <!-- wget https://mirrors.jenkins.io/war/latest/jenkins.war -O jenkins.war -->

## 二、运行截图

<!-- <img width="100%" src="/images/tools/jenkins/jenkins.png" /><br/> -->

## 三、TODO

> TODO

---

- [阿里云安装 jdk](https://blog.csdn.net/nike_android_start/article/details/127176537)
