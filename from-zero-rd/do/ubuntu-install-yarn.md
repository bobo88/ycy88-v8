# Ubuntu 官方推荐的 Yarn 安装方式

## 1. 安装 Yarn 的最新版本

```bash
# 导入 GPG 密钥和设置仓库源
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# 更新 apt 包源并安装 Yarn
sudo apt update
sudo apt install yarn
```

## 2. 验证安装

```bash
yarn --version
```
