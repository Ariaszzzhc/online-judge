# Online Judge
在线判题系统

# 部署
外部依赖与运行时

    apt install mysql-server
    apt install rabbitmq-server
    apt install openjdk-8-jdk

编译

    cd online-judge
    ./gradlw bootJar

# 可执行的子项目

    eureka
    ribbon
    web-api
    runner

编译后的 jar 包输出默认在子项目目录的 ./build/libs

更多构建问题请参阅 Gradle 使用手册

项目启动顺序请参阅 Spring Cloud 使用手册
