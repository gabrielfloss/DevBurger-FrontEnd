import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_51QFjPf04Mn8IDnAqqRsxYyJW00tq8lKk2hrqI08pkvmLYh43oHRAELXGjXEBUXLtyYfFMaec0QhEUW9Z3qdnVMrr008uqZI6vp"
);

export default stripePromise;