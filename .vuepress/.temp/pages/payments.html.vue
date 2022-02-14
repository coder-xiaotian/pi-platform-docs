<template><h1 id="支付接口" tabindex="-1"><a class="header-anchor" href="#支付接口" aria-hidden="true">#</a> 支付接口</h1>
<p>支付接口是对区块链交易的封装，当用户在app中点击提交按钮去支付时，它确保了你的app、区块链和Pi Servers都是同步的。</p>
<p>这样简化了开发者与区块链之间交易细节，屏蔽掉了很多直接与区块链交互的技术细节。</p>
<h2 id="支付流程" tabindex="-1"><a class="header-anchor" href="#支付流程" aria-hidden="true">#</a> 支付流程</h2>
<p>支付请求创建后, 会走3个主要的阶段:</p>
<ol>
<li>创建支付和服务端审批</li>
<li>用户交互和区块链事务</li>
<li>服务端完成</li>
</ol>
<p><img src="@source/imgs/payment_flow.png" alt="Payment flow"></p>
<p><strong>阶段 I - 创建支付和服务端审批</strong></p>
<ol>
<li>
<p><code>createPayment</code>: 由你的app前端发起支付。支付流UI打开，但在你的app服务端验证支付前不能与之交互。</p>
</li>
<li>
<p><code>onReadyForServerApproval</code>: JS SDK已经获得了支付id（PaymentID）</p>
</li>
<li>
<p>将PaymentID传给你的app后端。这部分实现由你来完成。</p>
</li>
<li>
<p>服务端审批: 你的app服务通过调用Pi Servers的<code>/approve</code>接口验证这笔支付。这决定了用户是否能够提交这笔交易到区块链上。</p>
</li>
</ol>
<p><strong>阶段 II - 用户交互和区块链事务</strong></p>
<p>在这个阶段，支付对话框变成可交互并且允许用户确认交易，确认提交到区块链。</p>
<p>这个阶段你不需要做任何事，所有的一切都交给Pi Apps平台和Pi钱包来做。</p>
<p>在区块链事务提交后，支付流程不会结束。
在回到你的app前，你需要通过服务端去确认这笔支付。</p>
<p><strong>阶段 III - 服务端完成</strong></p>
<ol start="5">
<li>
<p><code>onReadyForServerCompletion</code>: JS SDK发送区块链事务id（TxID）到你的app前端。TxID在服务端完成阶段会用到。</p>
</li>
<li>
<p>app前端发送TxID到app后端，这部分由你来实现。</p>
</li>
<li>
<p>服务端完成: 你的app服务通过Pi Servers的<code>/complete</code>接口确认这笔支付已完成。这使您能够检查区块链事务是否实际发生，并让Pi知道这一点你知道的。</p>
</li>
<li>
<p>支付流程关闭。再次回到你的app页面。
你的app前端和后端可以交换数据，并给用户展示一个确认洁面。这个实现取决于你。
Your app's server and your app's frontend can exchange data, and
update the app interface to show a confirmation screen to the user.
This implementation is your responsibility.</p>
</li>
</ol>
<blockquote>
<p><strong>用户可能对你的app撒谎</strong>
用户可能运行一个被<code>hack</code>的SDK，假装用户做了一个支付。如果在服务端完成阶段的API调用返回一个非200的错误码，请不要在你服务端将这笔支付标记为完成，并且不要交付任何用户买的东西。</p>
</blockquote>
</template>
