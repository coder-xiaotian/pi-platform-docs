# 前端 Javascript SDK

JS SDK是面向前端开发的SDK，你可以在HTML页面或者单页面应用中使用它，最终部署到Pi浏览器中。

想要使SDK正常工作，你需要在开发者网站上定义你的Pi App (在Pi浏览器中访问
develop.pi).

**这个SDK不是给服务端NodeJS应用使用的。**


## 安装

在你需要使用Pi Apps SDK的页面添加下面的`script`标签：

```html
<script src="https://sdk.minepi.com/pi-sdk.js"></script>
<script>Pi.init({ version: "2.0" })</script>
```

这样你就可以通过全局对象`window.Pi`使用SDK了。

## 使用

### 用户验证

只用通过了用户验证你才可以做和用户相关联的操作（例如：读取用户信息、用户发起一个支付请求），
用户第一次使用你的Pi App时，会在他们眼前出现一个授权弹框，让他们授权你的app可以共享他们的数据。

```javascript
// 认证用户, 并且获取到支付权限:
const scopes = ['payments'];

// 这个回调的更多细节在关于支付的文档，下面有提供链接:
function onIncompletePaymentFound(payment) { /* ... */ };

Pi.authenticate(scopes, onIncompletePaymentFound).then(function(auth) {
  console.log(`Hi there! You're ready to make payments!`);
}).catch(function(error) {
  console.error(error);
});
```

### 支付请求
使用`createPayment`方法为当前用户发起一个支付请求。
用户会看到一个来自Pi钱包的弹框提示，要求他们授权并提交这个交易到Pi区块链上。

```javascript

Pi.createPayment({
  // 要支付的π数量:
  amount: 3.14,
  // 支付备注 - 会展示给用户:
  memo: "...", // 例如: "Digital kitten #1234",
  // 由开发者提供的元数据 - 供开发者（你）使用:
  metadata: { /* ... */ }, // 例如: { kittenId: 1234 }
}, {
  // 你需要实现的回调 - 更多系列在下面的文档链接中:
  onReadyForServerApproval: function(paymentId) { /* ... */ },
  onReadyForServerCompletion: function(paymentId, txid) { /* ... */ },
  onCancel: function(paymentId) { /* ... */ },
  onError: function(error, payment) { /* ... */ },
});

```

以上代码块只是 **简单例子** 使你对如何使用SDK有一个直观的感受。

为了确保涉及到的相关方（你的app，你的server，Pi servers和Pi区块链）是同步的，
支付需要经过**服务器端审批**流程和**服务器端完成**流程。

请参考:
* [完整的支付文档](./payments.md) 去学习支付流程。
* [平台API文档](./platform_API.md) 去学习服务端怎么确认支付。
* Demo App (开发中!) 