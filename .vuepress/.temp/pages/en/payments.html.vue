<template><h1 id="payments" tabindex="-1"><a class="header-anchor" href="#payments" aria-hidden="true">#</a> Payments</h1>
<p>Payments are wrappers around blockchain transactions, which enable your app,
the Pi blockchain, and the Pi Servers to be all synchronized when the user
submits a blockchain transaction to pay for something in your app.</p>
<p>They enable you, the developer of the app, to have full confidence that the
user has actually made the transaction, while not having to
bother with the technicalities involved when interacting with the Pi blockchain.</p>
<h2 id="the-payment-flow" tabindex="-1"><a class="header-anchor" href="#the-payment-flow" aria-hidden="true">#</a> The Payment flow</h2>
<p>After they're created, payments go through 3 major phases:</p>
<ol>
<li>Payment creation and Server-Side Approval</li>
<li>User interaction and blockchain transaction</li>
<li>Server-Side Completion</li>
</ol>
<p><img src="@source/en/imgs/payment_flow.png" alt="Payment flow"></p>
<p><strong>Phase I - Payment creation and Server-Side Approval</strong></p>
<ol>
<li>
<p><code>createPayment</code>: Your app's frontend creates the payment. The Payment Flow UI opens, but cannot be interacted with until the payment is approved by your server.</p>
</li>
<li>
<p><code>onReadyForServerApproval</code>: The JS SDK has obtained the payment identifier (PaymentID) and is passing it to your app for Server-Side approval.</p>
</li>
<li>
<p>Your app's frontend sends the PaymentID to your app's server. This implementation is your responsibility.</p>
</li>
<li>
<p>Server-Side Approval: Your app's server approves the payment with Pi Servers through the <code>/approve</code> API call. This enables the user to submit the blockchain transaction.</p>
</li>
</ol>
<p><strong>Phase II - User interaction and blockchain transaction</strong></p>
<p>At this stage, the payment dialog becomes interactive and enables the
user to confirm the transaction, sign it, and submit it to the Pi blockchain.</p>
<p>You do not have anything to do at this stage, everything is handled by the Pi
Apps Platform and the Pi Wallet.</p>
<p>After the blockchain transaction is submitted, the payment flow will not close.
You need to acknowledge the payment through Server-Side completion before your
app is visible again.</p>
<p><strong>Phase III - Server-Side Completion</strong></p>
<ol start="5">
<li>
<p><code>onReadyForServerCompletion</code>: The JS SDK passes the blockchain transaction identifier (TxID) to your app's frontend. You need this value for the Server-Side Completion flow.</p>
</li>
<li>
<p>Your app's frontend sends the TxID to your app's server. This implementation is your responsibility.</p>
</li>
<li>
<p>Server-Side Completion: Your app's server acknowledges the payment with Pi Servers through the <code>/complete</code> API call. This enables you to check whether the blockchain transaction has actually happened, and to let Pi know that
you're aware of it.</p>
</li>
<li>
<p>The payment flow closes. Your app is now visible to the user again.
Your app's server and your app's frontend can exchange data, and
update the app interface to show a confirmation screen to the user.
This implementation is your responsibility.</p>
</li>
</ol>
<blockquote>
<p><strong>The user might be lying to your app!</strong></p>
<p>Users might be running a hacked version of the SDK, pretending that they
have made a payment. If the API call for Server-Side completion
returns a non-200 error code, <strong>do not</strong> mark the payment as complete on your
side, and <strong>do not</strong> deliver whatever the user was trying to buy.</p>
</blockquote>
</template>
