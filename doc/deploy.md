# 部署

## 环境准备

### 使用docker部署

如果您想自己使用docker构建镜像，那么可以参照 docker-build.sh 中的命令构建，但是前提您需要下载[maven](https://maven.apache.org/index)构建工具
和[java](https://www.oracle.com/java/technologies/downloads/#java8-linux)开发环境。

## 不使用容器部署

```shell
# maven 构建工具打包命令，执行该命令之后会在当前目录下生成一个叫target的目录，该目录下会生成一个 lx-doc.jar
mvn -DskipTests -U clean package

# 生成 lx-doc.jar 之后，可以运行以下脚本执行
sh run_no_in_docker.sh start 512m
```

在启动前，您还需要准备以下环境

- 安装mysql，mysql初始化脚本在本项目的doc.sql里，数据库名默认是lx-doc，如果有需要可以修改成自己的库名
- 安装redis，个人版本，可以忽略(请切换personal分支构建)，自己画画图，根本不需要这么麻烦，安装redis主要是为了解决高可用，分布式集群产生的问题（个人压根不需要集群，也没啥瓶颈）

## 配置说明
在启动应用之前，您还需要配置好参数才能启动应用，在项目里有一个叫做 application.yml 的配置文件，该配置预设了一些默认的参数，您只
需要关注以下参数（请仔细阅读注释）：
```yaml
lx:
  doc:
    whiteUrlList: /,/api/login,/api/register,/static/**,/assets/**,/system/error # 白名单url，配置之后将会被登录拦截器拦截
    fileUploadPath: /usr/attament/ # 配置文件上传的地址，单机使用时请配置
    
    # 如果您使用 nginx 来反向代理，那么不需要配置以下静态资源的映射，可以直接使用 nginx 来代理
    # 如果您不使用 nginx 想直接使用当前服务去请求，请将以下静态资源路径修改成自己的路径，然后在 lx.doc.whiteUrlList 
    # 添加 web 请求白名单，另外也要注意，如果您没有将静态资源打入镜像中，那么您需要在容器启动时进行 -v 目录挂载
    indexHtmlWebPath: /assets/index.html # 配置欢迎页
    staticResources:
      - pathPatterns: /static/** # 配置静态资源访问的web uri
        resourceLocations: file:///${lx.doc.fileUploadPath} # 配置静态资源所在物理磁盘的位置，不过静态资源的访问尽量使用 nginx 反向代理
      - pathPatterns: /assets/**
        resourceLocations: file:///D:/work/lx-doc/workbench/dist/assets/,file:///D:/work/lx-doc/workbench/dist/


spring:
  datasource:
    druid:
      maxActive: 20 # 最大连接池大小
      initialSize: 1 # 初始启动的连接数
      minIdle: 1 # 空闲时的连接数
      url: jdbc:mysql://127.0.0.1:3306/database_name?useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true
      username: xxx
      password: xxx
  # 个人版，不使用集群登录的，不需要下面这个配置
  redis:
    sentinel:
      master: xxx
      nodes: redis1.domain:26379,redis2.domain:26379,redis3.domain:26379
    password: xxx
    lettuce:
      pool:
        max-active: 30
        min-idle: 8
        max-idle: 20
        time-between-eviction-runs: 30000
```
如果您不想修改application.yml配置文件，以上配置都可以通过启动参数指定，docker 启动时，可以通过 -e ARGS='--lx.doc.whiteUrlList=/,/api/login,/api/register,/static/**,/assets/**,/system/error' 指定,
也可以写到 application-prod.yml 的配置文件中，避免参数太长，不直观，启动参数配置可参考如下示例：

```shell
# 你可以拉取github上的代码进行构建
# 这里的 ARGS 参数可以直接写在 application-prod.yml 配置文件里，避免把密码登参数直接写在命令行中
# 挂载的宿主目录请先创建
# /usr/web/html/ 挂载的是前端资源目录
# /usr/config/lx-doc/ 挂载 lx-doc 启动的配置文件，比如 application-prod.yml 就放在这个目录下面
# /usr/nginx/config 放置nginx相关的配置
# /usr/logs/lx-doc 应用的日志
# /usr/attament/lx-doc 上传附件的存放路径
docker run -dit --network host --privileged \
 -v /etc/localtime:/etc/localtime:ro \
 -v /usr/web/html/:/usr/web/html/ \
 -v /usr/config/lx-doc/:/usr/config/lx-doc/ \
 -v /var/log/nginx/:/var/log/nginx/ \
 -v /usr/nginx/config:/usr/nginx/config \
 -v /usr/logs/lx-doc:/usr/logs/lx-doc \
 -v /usr/attament/lx-doc:/usr/attament/lx-doc \
 -e ARGS="--spring.profiles.active=prod --spring.config.location=classpath:/,/usr/config/lx-doc/ --app.name=lx-doc" \
 -e TZ="Asia/Shanghai" \
--name lx-doc lx-doc:1.0

```

注意：如果你的 docker 版本较低，可能不支持 --network host，这个命令的意思是容器共享宿主机的网络，如果你的docker版本不支持，
可以看到的现象就是你在宿主机上看不到容器启动的端口号，或者你直接执行 docker exec -it 容器id ifconfig 得到的ip地址和宿主机
不一致，那么这个时候你就不要使用 --network host 这个命令，你手动映射端口，除此之外如果使用了域名去连接mysql或者redis的可以改成
ip地址或者修改容器的hosts，修改hosts可以在Dockerfile操作：

```shell
# 你可以拉取github上的代码进行构建
# 这里的 ARGS 参数可以直接写在 application-prod.yml 配置文件里，避免把密码登参数直接写在命令行中
# 挂载的宿主目录请先创建
# /usr/web/html/ 挂载的是前端资源目录
# /usr/config/lx-doc/ 挂载 lx-doc 启动的配置文件，比如 application-prod.yml 就放在这个目录下面
# /usr/nginx/config 放置nginx相关的配置
# /usr/logs/lx-doc 应用的日志
# /usr/attament/lx-doc 上传附件的存放路径
docker run -dit -p 9222:9222 -p 8090:8090 --privileged \
 -v /etc/localtime:/etc/localtime:ro \
 -v /usr/web/html/:/usr/web/html/ \
 -v /usr/config/lx-doc/:/usr/config/lx-doc/ \
 -v /var/log/nginx/:/var/log/nginx/ \
 -v /usr/nginx/config:/usr/nginx/config \
 -v /usr/logs/lx-doc:/usr/logs/lx-doc \
 -v /usr/attament/lx-doc:/usr/attament/lx-doc \
 -e ARGS="--spring.profiles.active=prod --spring.config.location=classpath:/,/usr/config/lx-doc/ --app.name=lx-doc" \
 -e TZ="Asia/Shanghai" \
--name lx-doc lx-doc:1.0

```

## 最后

- 如果您发现了本项目中的缺陷，可以提issue
- 如果您在部署的过程中有问题或者是其他的问题，可以联系我们





