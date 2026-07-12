# README: The Money Detective Assignment

For this assignment, I used Claude as a "money detective" to analyze my bank statement. Instead of asking one big question, I built the solution through prompt iteration:

1. First attempt was vague — just asked for income, expenses, duplicates, and balance with no clear rules.
2. I rewrote it with specific instructions: categorize expenses, rank top spenders by total (not one transaction), define a duplicate as same amount + same payee within 3 days, and reconcile the final balance against the statement.
3. I added a self-verification step, asking the AI to recalculate independently and flag mismatches. This actually caught a real Rs. 480 discrepancy before the final answer was given.

The AI then wrote and ran actual Python code on my statement to produce the income total, expense categories, duplicate flags, top spenders, and a verified remaining balance.
