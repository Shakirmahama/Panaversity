# README: The Payment Reconciliation Assignment

For this assignment, I asked the AI to reconcile farewell dinner payments where each contributor used a different nickname, emoji, or shorthand across records.

1. I gave the AI the raw CSV **and** a private identity-mapping key (e.g. "A.Khan is Ahsan Khan, not Ali Khan") — rules a script can't infer on its own, only I could supply them.
2. I asked it to **combine multiple payments per person** first, then compare against the expected Rs. 1,000/person, rather than checking each raw row in isolation — this is what caught that "Sara 😊" and "S.Ahmed" were the same person paying twice.
3. I asked for a **self-verification step**: sum of combined totals vs. sum of raw payments had to match before trusting the result.
4. I asked for a **follow-up list** at the end, not just a total — so the output pointed to exactly who needed a real-world conversation (Sara Ahmed, overpaid by Rs. 500) instead of just flagging a books mismatch.

**Result:** Rs. 10,500 collected vs. Rs. 10,000 expected — the Rs. 500 gap was fully traced to one duplicate/overpayment, verified two independent ways.
