import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your_publishable_key"); // Replace with actual key

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setMessage("");

    try {
      // Call your backend to create the PaymentIntent
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }), // amount in cents
      });
      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful! 🎉");
        // Further logic like storing appointment/payment details
      }
    } catch (err) {
      setMessage("Payment failed. Please try again.");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-3 rounded-md bg-white" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
};

const StripePayment = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Pay Consultation Fee</h3>
        <CheckoutForm amount={amount} />
      </div>
    </Elements>
  );
};

export default StripePayment;
