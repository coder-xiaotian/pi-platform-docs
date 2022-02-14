# 平台 API

平台API允许你读写数据（Pi servers与你的app、用户关联的数据）

## 概览

### 基础路径:

最新的平台API基础路径是`api.minepi.com/v2`

> **注意API版本:**
>
> 平台API目前的版本是v2.
> 我们尽可能不对一个API的版本做破坏性改动，只有做了破坏性改动才发布一个主版本。然而，如果有必要的话，我们可能会在没有通知的情况下(例如：安全或隐私问题修复)。

### 认证

平台API支持两种不同的认证机制。

#### Access token认证

有些API调用需要你提供用户的token去访问资源。它们通常与涉及用户的数据（例如：`/me`）。可以在请求headers中加上下面的header去访问：
```
Authorization: Bearer <user access token>
```

这样你的后端或前端就可以访问服务了。

#### 服务API密钥认证

有时候，一些API的调用必须由后端发起。
可以添加下面的header去访问:

```
Authorization: Key <your Server API Key>
```

> **注意: 服务API密钥仅仅用于后端**
>
> 你的服务API密钥必须放在服务端，绝对不能够发送到客户端（不要在客户端javascript代码中使用）。
> 在未来，在app中可能对你的服务API密钥做敏感操作，但是你的用户不能允许去操作。让用户去访问你的服务API密钥是一个**严重的安全漏洞**。


## API说明

### 认证

#### 访问用户数据:

获取用户数据。


```
GET /me
```

* 认证: **Access token**
* 返回类型: [UserDTO](#UserDTO)

验证通过前端SDK获得的数据(恶意用户可能会篡改请求并且将错误的数据发送给您)通过将用户的访问令牌发送到后端，并使用这个API去验证令牌有效性和用户身份。Access tokens是一个长且随机的字符串，如果token被破坏（被破坏的token不属于任何用户）请求将会失败（401 http错误码）

### 支付

路径: `/payments`。

#### 创建一个支付:

不要使用平台API创建支付。请使用客户端Javascript SDK创建支付。

#### 获取支付信息:

获取一个支付的信息。

```
GET /payments/{payment_id}
```

* 认证方法: **Server API Key**
* 返回类型: [PaymentDTO](#PaymentDTO)

#### 验证支付合法性:

服务端审批：标记一个支付是被审批的，使用户可以提交事务到区块链上。

```
POST /payments/{payment_id}/approve
```

* 认证方法: **Server API Key**
* 返回类型: [PaymentDTO](#PaymentDTO)

#### 完成支付:

服务端完成：通过向Pi Servers证明取得的txid是合法的，从而标记这个支付为完成，使用户可以关闭支付流程。

```
POST /payments/{payment_id}/complete
```

* 认证方法: **Server API Key**
* 返回类型: [PaymentDTO](#PaymentDTO)

请求体样例：

```
{
  "txid": "7a7ed20d3d72c365b9019baf8dc4c4e3cce4c08114d866e47ae157e3a796e9e7"
}
```

## 数据类型

### `UserDTO`

```typescript
{
  "uid": string, // An app-specific user identifier
  "username": string, // The user's Pi username. Requires the `username` scope.
}
```

### `PaymentDTO`

```typescript
{
  // Payment data:
  "identifier": string, // The payment identifier
  "user_uid": string, // The user's app-specific ID
  "amount": number, // The payment amount
  "memo": string, // A string provided by the developer, shown to the user
  "metadata": Object, // An object provided by the developer for their own usage
  "to_address": string, // The recipient address of the blockchain transaction
  "created_at": string, // The payment's creation timestamp
  
  // Status flags representing the current state of this payment
  "status": {
    "developer_approved": boolean, // Server-Side Approval
    "transaction_verified": boolean, // Blockchain transaction verified
    "developer_completed": boolean, // Server-Side Completion
    "cancelled": boolean, // Cancelled by the developer or by Pi Network
    "user_cancelled": boolean, // Cancelled by the user
  },
  
  // Blockchain transaction data:
  "transaction": null | { // This is null if no transaction has been made yet
    "txid": string, // The id of the blockchain transaction
    "verified": boolean, // True if the transaction matches the payment, false otherwise
    "_link": string, // A link to the operation on the Blockchain API
  },
};
```