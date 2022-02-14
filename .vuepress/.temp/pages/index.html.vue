<template><h1 id="前端-javascript-sdk" tabindex="-1"><a class="header-anchor" href="#前端-javascript-sdk" aria-hidden="true">#</a> 前端 Javascript SDK</h1>
<p>JS SDK是面向前端开发的SDK，你可以在HTML页面或者单页面应用中使用它，最终部署到Pi浏览器中。</p>
<p>想要使SDK正常工作，你需要在开发者网站上定义你的Pi App (在Pi浏览器中访问
develop.pi).</p>
<p><strong>这个SDK不是给服务端NodeJS应用使用的。</strong></p>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<p>在你需要使用Pi Apps SDK的页面添加下面的<code>script</code>标签：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://sdk.minepi.com/pi-sdk.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">Pi<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">version</span><span class="token operator">:</span> <span class="token string">"2.0"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这样你就可以通过全局对象<code>window.Pi</code>使用SDK了。</p>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<h3 id="用户验证" tabindex="-1"><a class="header-anchor" href="#用户验证" aria-hidden="true">#</a> 用户验证</h3>
<p>只用通过了用户验证你才可以做和用户相关联的操作（例如：读取用户信息、用户发起一个支付请求），
用户第一次使用你的Pi App时，会在他们眼前出现一个授权弹框，让他们授权你的app可以共享他们的数据。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 认证用户, 并且获取到支付权限:</span>
<span class="token keyword">const</span> scopes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'payments'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 这个回调的更多细节在关于支付的文档，下面有提供链接:</span>
<span class="token keyword">function</span> <span class="token function">onIncompletePaymentFound</span><span class="token punctuation">(</span><span class="token parameter">payment</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

Pi<span class="token punctuation">.</span><span class="token function">authenticate</span><span class="token punctuation">(</span>scopes<span class="token punctuation">,</span> onIncompletePaymentFound<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">auth</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hi there! You're ready to make payments!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="支付请求" tabindex="-1"><a class="header-anchor" href="#支付请求" aria-hidden="true">#</a> 支付请求</h3>
<p>使用<code>createPayment</code>方法为当前用户发起一个支付请求。
用户会看到一个来自Pi钱包的弹框提示，要求他们授权并提交这个交易到Pi区块链上。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
Pi<span class="token punctuation">.</span><span class="token function">createPayment</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// 要支付的π数量:</span>
  <span class="token literal-property property">amount</span><span class="token operator">:</span> <span class="token number">3.14</span><span class="token punctuation">,</span>
  <span class="token comment">// 支付备注 - 会展示给用户:</span>
  <span class="token literal-property property">memo</span><span class="token operator">:</span> <span class="token string">"..."</span><span class="token punctuation">,</span> <span class="token comment">// 例如: "Digital kitten #1234",</span>
  <span class="token comment">// 由开发者提供的元数据 - 供开发者（你）使用:</span>
  <span class="token literal-property property">metadata</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 例如: { kittenId: 1234 }</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// 你需要实现的回调 - 更多系列在下面的文档链接中:</span>
  <span class="token function-variable function">onReadyForServerApproval</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">paymentId</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">onReadyForServerCompletion</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">paymentId<span class="token punctuation">,</span> txid</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">onCancel</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">paymentId</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">onError</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> payment</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ... */</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>以上代码块只是 <strong>简单例子</strong> 使你对如何使用SDK有一个直观的感受。</p>
<p>为了确保涉及到的相关方（你的app，你的server，Pi servers和Pi区块链）是同步的，
支付需要经过<strong>服务器端审批</strong>流程和<strong>服务器端完成</strong>流程。</p>
<p>请参考:</p>
<ul>
<li><RouterLink to="payments.html">完整的支付文档</RouterLink> 去学习支付流程。</li>
<li><RouterLink to="platform_API.html">平台API文档</RouterLink> 去学习服务端怎么确认支付。</li>
<li>Demo App (开发中!)</li>
</ul>
</template>
