# 第三方登录

> 第三方登录是基于 **OAuth2.0** 的授权机制，允许用户通过第三方平台的认证实现登录，无需重新注册。本指南将详细介绍设置、流程、注意事项以及技术实现细节，配以代码示例。

## **一、微信登录**

### 1. **设置**

#### **前提条件**：

1. 注册微信开放平台开发者账号（[微信开放平台](https://open.weixin.qq.com/)）。
2. 创建应用，获取 `AppID` 和 `AppSecret`。
3. 配置**授权回调地址**。

#### **参数说明**：

- **AppID**：应用唯一标识。
- **AppSecret**：应用密钥，用于换取 `access_token`。
- **Redirect URI**：授权成功后的回调地址。

![An image](/images/from-zero/rd/weixin-1.jpg)
![An image](/images/from-zero/rd/weixin-2.jpg)
![An image](/images/from-zero/rd/weixin-3.jpg)
![An image](/images/from-zero/rd/weixin-4.jpg)

### 2. **流程**

1. 前端引导用户访问授权页面，用户授权后获取 `code`。
2. 后端使用 `code` 向微信服务器换取 `access_token` 和 `openid`。
3. 使用 `access_token` 和 `openid` 获取用户基本信息。
4. 将用户信息写入本地数据库（如新用户需注册）。

### 3. **注意事项**

- 微信接口分为 **网页应用授权**（`snsapi_login`）和 **公众号内授权**（`snsapi_userinfo`）。选择合适的 scope。
- 需防止**CSRF 攻击**，在请求中设置 `state`。
- 授权回调地址必须与微信平台配置的地址一致。

### 4. **技术实现细节**

#### （1）获取授权 `code`

前端重定向到授权页面：

```javascript
const appId = "your-app-id";
const redirectUri = encodeURIComponent("https://your-callback-url.com");
const scope = "snsapi_userinfo"; // snsapi_login 适用于网页应用
const state = "random-string"; // 防止CSRF
window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
```

#### （2）后端通过 `code` 获取 `access_token` 和 `openid`

```go
func getWeChatAccessToken(code string) (string, string, error) {
    appID := "your-app-id"
    appSecret := "your-app-secret"
    url := fmt.Sprintf("https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code", appID, appSecret, code)

    resp, err := http.Get(url)
    if err != nil {
        return "", "", err
    }
    defer resp.Body.Close()

    var result struct {
        AccessToken string `json:"access_token"`
        OpenID      string `json:"openid"`
    }
    json.NewDecoder(resp.Body).Decode(&result)

    return result.AccessToken, result.OpenID, nil
}
```

#### （3）获取用户基本信息

```go
func getWeChatUserInfo(accessToken, openID string) (map[string]interface{}, error) {
    url := fmt.Sprintf("https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s", accessToken, openID)
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var userInfo map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&userInfo)

    return userInfo, nil
}
```

## **二、微博（新浪）登录**

### 1. **设置**

#### **前提条件**：

1. 注册新浪微博开放平台开发者账号（[新浪微博开放平台](https://open.weibo.com/)）。
2. 创建应用，获取 `AppKey` 和 `AppSecret`。
3. 配置**授权回调地址**。

#### **参数说明**：

- **AppKey**：应用唯一标识。
- **AppSecret**：应用密钥，用于换取 `access_token`。
- **Redirect URI**：授权成功后的回调地址。

### 2. **流程**

1. 前端引导用户访问授权页面，用户授权后获取 `code`。
2. 后端使用 `code` 向微博服务器换取 `access_token`。
3. 使用 `access_token` 获取用户基本信息。
4. 将用户信息写入本地数据库（如新用户需注册）。

![An image](/images/from-zero/rd/weibo-1.jpg)
![An image](/images/from-zero/rd/weibo-2.jpg)

### 3. **注意事项**

- 授权回调地址必须与微博平台配置的地址一致。
- 需防止**CSRF 攻击**，在请求中设置 `state`。
- Access Token 有效期有限，需设计 token 续期机制。

### 4. **技术实现细节**

#### （1）获取授权 `code`

前端重定向到授权页面：

```javascript
const clientId = "your-app-key";
const redirectUri = encodeURIComponent("https://your-callback-url.com");
const state = "random-string"; // 防止CSRF
window.location.href = `https://api.weibo.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;
```

#### （2）后端通过 `code` 获取 `access_token`

```go
func getWeiboAccessToken(code string) (string, error) {
    clientID := "your-app-key"
    clientSecret := "your-app-secret"
    redirectURI := "https://your-callback-url.com"

    url := "https://api.weibo.com/oauth2/access_token"
    data := url.Values{}
    data.Set("client_id", clientID)
    data.Set("client_secret", clientSecret)
    data.Set("grant_type", "authorization_code")
    data.Set("code", code)
    data.Set("redirect_uri", redirectURI)

    resp, err := http.PostForm(url, data)
    if err != nil {
        return "", err
    }
    defer resp.Body.Close()

    var result struct {
        AccessToken string `json:"access_token"`
    }
    json.NewDecoder(resp.Body).Decode(&result)

    return result.AccessToken, nil
}
```

#### （3）获取用户基本信息

```go
func getWeiboUserInfo(accessToken string) (map[string]interface{}, error) {
    url := fmt.Sprintf("https://api.weibo.com/2/users/show.json?access_token=%s", accessToken)
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    var userInfo map[string]interface{}
    json.NewDecoder(resp.Body).Decode(&userInfo)

    return userInfo, nil
}
```

## 三、QQ

> TODO

## 四、GitHub

> TODO

## 五、Gitee

> TODO

::: tip 提示
**备注：其他平台如 QQ、GitHub、Gitee 的流程基本一致，仅需替换授权接口和用户信息接口。**
:::
