# 应用商店打包（uni-app）

## 一、安卓打包

::: tip 安卓打包流程

- 1）HBuilderX ==> 发行 ==> 原生 App-云打包；
- 2）Android（apk 包） ==> **使用公共测试证书** ==> 打包；
- 3）等待打包完成，根据目录提示，找到生成的 apk 包。

:::

::: danger Android 证书
本文使用的是“公共测试证书”，如果需要使用“自有证书”，请查看「[如何生成证书](https://ask.dcloud.net.cn/article/35777)」。
:::

::: tip 提示
Android 平台打包发布 apk 应用，需要使用数字证书（.keystore 文件）进行签名，用于表明开发者身份。

Android 证书的生成是自助和免费的，不需要审批或付费。

可以使用 JRE 环境中的 keytool 命令生成。
:::

> 1）选择“云打包”

![An image](/images/app/build-1.png)

> 2）选择“安卓”、“**使用公共测试证书**”、“打包”

![An image](/images/app/build-2.png)

> 3）打包校验

![An image](/images/app/build-3.png)

> 4）打包中

![An image](/images/app/build-4.png)

> 5）打包完成：找到对应的 apk 目录

![An image](/images/app/build-5.png)

## 二、iOS 打包

::: tip iOS 打包流程

- 1）HBuilderX ==> 发行 ==> 原生 App-云打包；
- 2）iOS（ipa 包） ==> **iOS IDP/IEP 证书（输入：证书私钥密码、证书 profile 文件、私钥证书）** ==> 打包；
- 3）等待打包完成，根据目录提示，找到生成的 ipa 包。

:::

::: danger iOS IDP/IEP 证书
一定要有证书！！！ 请查看「[如何申请证书](https://ask.dcloud.net.cn/article/152)」。
:::

> 选择 iOS 打包

![An image](/images/app/build-6.png)

- [apple-developer](https://apps.apple.com/cn/app/apple-developer/id640199958)
- [使用 Apple Developer App 注册、验证和续订](https://developer.apple.com/cn/support/app-account/)
- [uniapp 原生 App-云打包](https://www.easemob.com/news/5554)
- [https://www.appuploader.net/](https://www.appuploader.net/)

## 三、注意事项

> iOS 证书收费 688 元/年。

## 四、其他打包方式

> Taro、Cordova

### 1）Taro

- [Taro 文档](https://docs.taro.zone/docs/)
- [React Native 端开发流程](https://nervjs.github.io/taro-docs/docs/react-native/)

### 2）Cordova

- [cordova 打包 ios 到上架 AppStore 全过程记录(无敌详细)](https://cloud.tencent.com/developer/article/1951627)
