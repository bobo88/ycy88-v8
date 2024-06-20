# Express 的日志干崩了我的阿里云服务器？

最近上线了【Express 实现需要认证的接口】这个功能，一不留神竟然把我的阿里云服务器干崩了。真是尴尬 😅！

我想也没有做啥出格的事情啊，难道是我花钱的服务器太低端，最近用户量太大？

我赶紧去阿里云服务器控制台看了下，发现 CPU 占用率达到了 **95%** 左右。几个网址都打不开了，主域名、二级域名集体下线。

去服务器上自助检测，查看了下日志，发现是 Express 应用的日志文件 IO 操作超时导致的问题。修改代码，重新部署上线，目前暂时一切正常。

## 一、查看 CPU 使用情况

![An image](/images/node/cpu-1.png)

## 二、设置监控报警操作

![An image](/images/node/cpu-2.png)

![An image](/images/node/cpu-3.png)

![An image](/images/node/cpu-4.png)

## 三、注释坑人的日志代码

![An image](/images/node/cpu-5.png)

![An image](/images/node/cpu-6.png)

## 四、再次查看 CPU 和磁盘的使用情况

![An image](/images/node/cpu-7.png)

![An image](/images/node/cpu-8.png)

![An image](/images/node/cpu-9.png)

- [【公众号】Express 的日志干崩了我的阿里云服务器？](https://mp.weixin.qq.com/s?__biz=MzkyNTcxMjQyOA==&mid=2247483828&idx=1&sn=5fbe127190a007f5bfbbd0c04d706fef&chksm=c1c328f7f6b4a1e1173742e41c35369f6e636df2bfc62a53a804f2b45fa5e1673aae5d976019&token=708508268&lang=zh_CN#rd)
