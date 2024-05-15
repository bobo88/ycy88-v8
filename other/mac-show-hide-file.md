# MAC 显示隐藏文件夹

## 一、显示

平时构建环境需要配置 .env 文件夹时，mac 默认是隐藏的。 输入代码

```shell
defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
```

即可显示。

## 二、隐藏

如果隐藏的话就继续

```shell
defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
```
