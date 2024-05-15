# Node 实践～ TodoList（一）

::: tip 主要事项

- 1、草图原型
- 2、数据库建表

:::

## 一、草图原型

> 思如泉涌，一气呵成，字迹潦草。

![An image](/images/node/todo-list/todo-1.jpg)

## 二、数据库建表

> 原本计划 3 个表（user、todo、notes），想着后续做成 SaaS（Software as a Service）系统的目标，所以表的数量和字段结构又做了拓展。

::: warning 提示
V1.0 版本只围绕 3 个表（user、todo、notes）进行功能开发。
:::

## 1. **用户表（user）**

```sql
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '用户表ID',
    user_id VARCHAR(255) NOT NULL COMMENT '用户ID',
    username VARCHAR(255) NOT NULL COMMENT '用户名',
    password_hashed VARCHAR(255) NOT NULL COMMENT '哈希密码',
    email VARCHAR(255) NOT NULL COMMENT '电子邮件地址',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    permission_level INT COMMENT '权限级别',
    user_type VARCHAR(255) COMMENT '用户类型',
    subscription_plan VARCHAR(255) COMMENT '订阅计划',
    payment_info VARCHAR(255) COMMENT '支付信息'
);
```

## 2. **Todo 事项表（todo）**

```sql
CREATE TABLE todo (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Todo事项表ID',
    todo_id VARCHAR(255) NOT NULL COMMENT 'Todo事项ID',
    user_id INT NOT NULL COMMENT '关联的用户ID',
    todo_name VARCHAR(255) NOT NULL COMMENT '事项名称',
    progress INT COMMENT '进度',
    start_time TIMESTAMP COMMENT '开始时间',
    end_time TIMESTAMP COMMENT '完成时间',
    estimated_time INT COMMENT '预计时间',
    priority INT COMMENT '排序',
    status VARCHAR(255) NOT NULL COMMENT '状态',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    deadline TIMESTAMP COMMENT '截止时间',
    assignee INT COMMENT '负责人',
    reminder VARCHAR(255) COMMENT '提醒设置',
    attachments VARCHAR(255) COMMENT '附件',
    FOREIGN KEY (user_id) REFERENCES user(id)
);
```

## 3. **事项描述记录表（notes）**

```sql
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '事项描述表ID',
    desc_id VARCHAR(255) NOT NULL COMMENT '描述ID',
    todo_id INT NOT NULL COMMENT '关联的Todo事项ID',
    description TEXT COMMENT '描述内容',
    description_time TIMESTAMP COMMENT '描述时间',
    creator_name VARCHAR(255) NOT NULL COMMENT '创建者名称',
    comments TEXT COMMENT '评论/回复',
    attachments VARCHAR(255) COMMENT '附件',
    is_public BOOLEAN COMMENT '是否公开',
    FOREIGN KEY (todo_id) REFERENCES todo(id)
);
```

## 4. 团队表（team）

```sql
CREATE TABLE team (
    team_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '团队表ID',
    team_name VARCHAR(255) NOT NULL COMMENT '团队名称',
    team_members TEXT COMMENT '团队成员，可能是用户ID的列表',
    team_admins TEXT COMMENT '团队管理员，团队的管理员用户ID列表'
);
```

## 5. 日历表（calendar）

```sql
CREATE TABLE calendar (
    date DATE PRIMARY KEY COMMENT '日期',
    events TEXT COMMENT '与日期关联的事件列表'
);
```

## 6. 通知表（notifications）

```sql
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY COMMENT '通知表ID',
    user_id INT NOT NULL COMMENT '关联到用户表中的用户ID',
    content TEXT COMMENT '通知内容',
    is_read BOOLEAN COMMENT '是否已读',
    notification_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '通知时间',
    FOREIGN KEY (user_id) REFERENCES user(id)
);
```

## 三、表与表的关系

> V1.0 版本暂时只做下面 1、2 两点。

## 1. **user & todo**

> 用户表（user）与 Todo 事项表（todo）之间的关系

- 用户表的`id`与 Todo 事项表的`user_id`相关联，表示一个用户可以创建多个 Todo 事项。
- Todo 事项表的`user_id`是对用户表的`id`的外键引用。

## 2. **todo & notes**

> Todo 事项表（todo）与事项描述记录表（notes）之间的关系

- Todo 事项表的`id`与事项描述表的`todo_id`相关联，表示一个 Todo 事项可以有多个描述。
- 事项描述表的`todo_id`是对 Todo 事项表的`id`的外键引用。

## 3. user & notifications

> 用户表（user）与通知表（notifications）之间的关系

- 用户表的`id`与通知表的`user_id`相关联，表示一个用户可以有多个通知。
- 通知表的`user_id`是对用户表的`id`的外键引用。

## 4. team & user

> 团队表（team）与用户表（user）之间的关系

- 团队表的`team_id`与用户表的`team_members`和`team_admins`相关联，表示一个团队可以有多个成员和多个管理员。
- `team_members`和`team_admins`中包含的是用户表的`id`，表示这两个字段分别存储团队的成员和管理员的用户 ID。

## 四、截图

![An image](/images/node/todo-list/todo-database.png)

![An image](/images/node/todo-list/todo-database2.png)
