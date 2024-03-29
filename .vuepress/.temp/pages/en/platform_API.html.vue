<template><h1 id="platform-api" tabindex="-1"><a class="header-anchor" href="#platform-api" aria-hidden="true">#</a> Platform API</h1>
<p>The platform API allows you to read and write data to the Pi Servers related with your app deployed on the
Pi App Platform, and your app's users.</p>
<h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview" aria-hidden="true">#</a> Overview</h2>
<h3 id="base-path" tabindex="-1"><a class="header-anchor" href="#base-path" aria-hidden="true">#</a> Base path:</h3>
<p>The latest version of the Platform API is available at <code>api.minepi.com/v2</code>.</p>
<blockquote>
<p><strong>Note about API versioning:</strong></p>
<p>The platform API is currently in v2.
As much as possible, we will not make any breaking changes to a version of an API, and only release breaking changes as
new major versions. However, we might make breaking changes to an existing version without notice, if those are
necessary (e.g security or privacy fixes).</p>
</blockquote>
<h3 id="authorization" tabindex="-1"><a class="header-anchor" href="#authorization" aria-hidden="true">#</a> Authorization</h3>
<p>The Platform API supports two different authorization mechanisms.</p>
<h4 id="access-token-authorization" tabindex="-1"><a class="header-anchor" href="#access-token-authorization" aria-hidden="true">#</a> Access token authorization</h4>
<p>Some API calls require that you provide a user's access token to access the resource. They are generally related with
a user's data (e.g: <code>/me</code>). Those endpoints can be accessed using the following Authorization header:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Authorization: Bearer &lt;user access token>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Those endpoints can be indifferently accessed from your backend / server app, or from your frontend / client app.</p>
<h4 id="server-api-key-authorization" tabindex="-1"><a class="header-anchor" href="#server-api-key-authorization" aria-hidden="true">#</a> Server API Key authorization</h4>
<p>For various reasons, some API calls must be made from your backend / server app.
Those endpoints can be accessed using the following Authorization header:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Authorization: Key &lt;your Server API Key>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><blockquote>
<p><strong>Warning: Server API keys are for servers only</strong></p>
<p>Your Server API Key <strong>must</strong> be kept on your server, and must not be sent to clients (do not use it in your
client javascript code).
In the future, your server API key might enable sensitive operations on your app itself that your users should
not be allowed to perform. Letting users access your server API key is a <strong>serious security breach</strong>.</p>
</blockquote>
<h2 id="api-reference" tabindex="-1"><a class="header-anchor" href="#api-reference" aria-hidden="true">#</a> API Reference</h2>
<h3 id="authentication" tabindex="-1"><a class="header-anchor" href="#authentication" aria-hidden="true">#</a> Authentication</h3>
<h4 id="access-a-user-s-resource" tabindex="-1"><a class="header-anchor" href="#access-a-user-s-resource" aria-hidden="true">#</a> Access a user's resource:</h4>
<p>Retrieve the user's information.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>GET /me
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Authorization method: <strong>Access token</strong></li>
<li>Response type: <a href="#UserDTO">UserDTO</a></li>
</ul>
<p>Verify the data obtained with the frontend SDK (a malicious user could tamper with the requests and
send you wrong data) by sending the user’s access token to your backend and using this API endpoint
to verify the token validity and the user’s identity.</p>
<p>Access tokens are long, random strings, and the request will fail (401 HTTP error code) if the token
has been tampered with (a tampered token would
not belong to any real user).</p>
<h3 id="payments" tabindex="-1"><a class="header-anchor" href="#payments" aria-hidden="true">#</a> Payments</h3>
<p>Base path: <code>/payments</code>.</p>
<h4 id="create-a-payment" tabindex="-1"><a class="header-anchor" href="#create-a-payment" aria-hidden="true">#</a> Create a payment:</h4>
<p>Do not create payments using the Platform API. Use the client-side Javascript SDK for this purpose.</p>
<h4 id="get-a-payment" tabindex="-1"><a class="header-anchor" href="#get-a-payment" aria-hidden="true">#</a> Get a payment:</h4>
<p>Get information about a payment.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>GET /payments/{payment_id}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Authorization method: <strong>Server API Key</strong></li>
<li>Response type: <a href="#PaymentDTO">PaymentDTO</a></li>
</ul>
<h4 id="approve-a-payment" tabindex="-1"><a class="header-anchor" href="#approve-a-payment" aria-hidden="true">#</a> Approve a payment:</h4>
<p>Server-side approval: mark a payment as approved, enabling the user to submit the transaction to the blockchain.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>POST /payments/{payment_id}/approve
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Authorization method: <strong>Server API Key</strong></li>
<li>Response type: <a href="#PaymentDTO">PaymentDTO</a></li>
</ul>
<h4 id="complete-a-payment" tabindex="-1"><a class="header-anchor" href="#complete-a-payment" aria-hidden="true">#</a> Complete a payment:</h4>
<p>Server-side completion: mark a payment as completed by proving to the Pi Servers that your app has obtained the
payment's txid, enabling the user to close the payment flow.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>POST /payments/{payment_id}/complete
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>Authorization method: <strong>Server API Key</strong></li>
<li>Response type: <a href="#PaymentDTO">PaymentDTO</a></li>
</ul>
<p>Example request body:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{
  "txid": "7a7ed20d3d72c365b9019baf8dc4c4e3cce4c08114d866e47ae157e3a796e9e7"
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="resource-types" tabindex="-1"><a class="header-anchor" href="#resource-types" aria-hidden="true">#</a> Resource types</h2>
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
