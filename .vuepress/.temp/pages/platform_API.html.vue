<template><h1 id="平台-api" tabindex="-1"><a class="header-anchor" href="#平台-api" aria-hidden="true">#</a> 平台 API</h1>
<p>平台API允许你读写数据（Pi servers与你的app、用户关联的数据）</p>
<h2 id="概览" tabindex="-1"><a class="header-anchor" href="#概览" aria-hidden="true">#</a> 概览</h2>
<h3 id="基础路径" tabindex="-1"><a class="header-anchor" href="#基础路径" aria-hidden="true">#</a> 基础路径:</h3>
<p>最新的平台API基础路径是<code>api.minepi.com/v2</code></p>
<blockquote>
<p><strong>注意API版本:</strong></p>
<p>平台API目前的版本是v2.
我们尽可能不对一个API的版本做破坏性改动，只有做了破坏性改动才发布一个主版本。然而，如果有必要的话，我们可能会在没有通知的情况下(例如：安全或隐私问题修复)。</p>
</blockquote>
<h3 id="认证" tabindex="-1"><a class="header-anchor" href="#认证" aria-hidden="true">#</a> 认证</h3>
<p>平台API支持两种不同的认证机制。</p>
<h4 id="access-token认证" tabindex="-1"><a class="header-anchor" href="#access-token认证" aria-hidden="true">#</a> Access token认证</h4>
<p>有些API调用需要你提供用户的token去访问资源。它们通常与涉及用户的数据（例如：<code>/me</code>）。可以在请求headers中加上下面的header去访问：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Authorization: Bearer &lt;user access token>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>这样你的后端或前端就可以访问服务了。</p>
<h4 id="服务api密钥认证" tabindex="-1"><a class="header-anchor" href="#服务api密钥认证" aria-hidden="true">#</a> 服务API密钥认证</h4>
<p>有时候，一些API的调用必须由后端发起。
可以添加下面的header去访问:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Authorization: Key &lt;your Server API Key>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p><strong>注意: 服务API密钥仅仅用于后端</strong></p>
<p>你的服务API密钥必须放在服务端，绝对不能够发送到客户端（不要在客户端javascript代码中使用）。
在未来，在app中可能对你的服务API密钥做敏感操作，但是你的用户不能允许去操作。让用户去访问你的服务API密钥是一个<strong>严重的安全漏洞</strong>。</p>
</blockquote>
<h2 id="api说明" tabindex="-1"><a class="header-anchor" href="#api说明" aria-hidden="true">#</a> API说明</h2>
<h3 id="认证-1" tabindex="-1"><a class="header-anchor" href="#认证-1" aria-hidden="true">#</a> 认证</h3>
<h4 id="访问用户数据" tabindex="-1"><a class="header-anchor" href="#访问用户数据" aria-hidden="true">#</a> 访问用户数据:</h4>
<p>获取用户数据。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>GET /me
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>认证: <strong>Access token</strong></li>
<li>返回类型: <a href="#UserDTO">UserDTO</a></li>
</ul>
<p>验证通过前端SDK获得的数据(恶意用户可能会篡改请求并且将错误的数据发送给您)通过将用户的访问令牌发送到后端，并使用这个API去验证令牌有效性和用户身份。Access tokens是一个长且随机的字符串，如果token被破坏（被破坏的token不属于任何用户）请求将会失败（401 http错误码）</p>
<h3 id="支付" tabindex="-1"><a class="header-anchor" href="#支付" aria-hidden="true">#</a> 支付</h3>
<p>路径: <code>/payments</code>。</p>
<h4 id="创建一个支付" tabindex="-1"><a class="header-anchor" href="#创建一个支付" aria-hidden="true">#</a> 创建一个支付:</h4>
<p>不要使用平台API创建支付。请使用客户端Javascript SDK创建支付。</p>
<h4 id="获取支付信息" tabindex="-1"><a class="header-anchor" href="#获取支付信息" aria-hidden="true">#</a> 获取支付信息:</h4>
<p>获取一个支付的信息。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>GET /payments/{payment_id}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>认证方法: <strong>Server API Key</strong></li>
<li>返回类型: <a href="#PaymentDTO">PaymentDTO</a></li>
</ul>
<h4 id="验证支付合法性" tabindex="-1"><a class="header-anchor" href="#验证支付合法性" aria-hidden="true">#</a> 验证支付合法性:</h4>
<p>服务端审批：标记一个支付是被审批的，使用户可以提交事务到区块链上。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>POST /payments/{payment_id}/approve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>认证方法: <strong>Server API Key</strong></li>
<li>返回类型: <a href="#PaymentDTO">PaymentDTO</a></li>
</ul>
<h4 id="完成支付" tabindex="-1"><a class="header-anchor" href="#完成支付" aria-hidden="true">#</a> 完成支付:</h4>
<p>服务端完成：通过向Pi Servers证明取得的txid是合法的，从而标记这个支付为完成，使用户可以关闭支付流程。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>POST /payments/{payment_id}/complete
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>认证方法: <strong>Server API Key</strong></li>
<li>返回类型: <a href="#PaymentDTO">PaymentDTO</a></li>
</ul>
<p>请求体样例：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{
  "txid": "7a7ed20d3d72c365b9019baf8dc4c4e3cce4c08114d866e47ae157e3a796e9e7"
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<h3 id="userdto" tabindex="-1"><a class="header-anchor" href="#userdto" aria-hidden="true">#</a> <code>UserDTO</code></h3>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token punctuation">{</span>
  <span class="token string-property property">"uid"</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token comment">// An app-specific user identifier</span>
  <span class="token string-property property">"username"</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token comment">// The user's Pi username. Requires the `username` scope.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="paymentdto" tabindex="-1"><a class="header-anchor" href="#paymentdto" aria-hidden="true">#</a> <code>PaymentDTO</code></h3>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token punctuation">{</span>
  <span class="token comment">// Payment data:</span>
  <span class="token string-property property">"identifier"</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token comment">// The payment identifier</span>
  <span class="token string-property property">"user_uid"</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token comment">// The user's app-specific ID</span>
  <span class="token string-property property">"amount"</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> <span class="token comment">// The payment amount</span>
  <span class="token string-property property">"memo"</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token comment">// A string provided by the developer, shown to the user</span>
  <span class="token string-property property">"metadata"</span><span class="token operator">:</span> Object<span class="token punctuation">,</span> <span class="token comment">// An object provided by the developer for their own usage</span>
  <span class="token string-property property">"to_address"</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token comment">// The recipient address of the blockchain transaction</span>
  <span class="token string-property property">"created_at"</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token comment">// The payment's creation timestamp</span>
  
  <span class="token comment">// Status flags representing the current state of this payment</span>
  <span class="token string-property property">"status"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">"developer_approved"</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span> <span class="token comment">// Server-Side Approval</span>
    <span class="token string-property property">"transaction_verified"</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span> <span class="token comment">// Blockchain transaction verified</span>
    <span class="token string-property property">"developer_completed"</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span> <span class="token comment">// Server-Side Completion</span>
    <span class="token string-property property">"cancelled"</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span> <span class="token comment">// Cancelled by the developer or by Pi Network</span>
    <span class="token string-property property">"user_cancelled"</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span> <span class="token comment">// Cancelled by the user</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
  <span class="token comment">// Blockchain transaction data:</span>
  <span class="token string-property property">"transaction"</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token punctuation">{</span> <span class="token comment">// This is null if no transaction has been made yet</span>
    <span class="token string-property property">"txid"</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token comment">// The id of the blockchain transaction</span>
    <span class="token string-property property">"verified"</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">,</span> <span class="token comment">// True if the transaction matches the payment, false otherwise</span>
    <span class="token string-property property">"_link"</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token comment">// A link to the operation on the Blockchain API</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div></template>
