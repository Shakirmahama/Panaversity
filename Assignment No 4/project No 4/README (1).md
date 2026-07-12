# README: The Duplicate Photo & File Organizer Assignment

For this assignment, I asked the AI to scan a messy downloads folder for duplicate photos and organize the rest, without touching the original files.

1. First step was **detection only** — I explicitly said "don't delete, rename, or move any files yet" and asked for a full report before any action. This kept the AI from acting on assumptions before I confirmed the groupings were correct.
2. The AI used **perceptual hashing (pHash)** instead of exact file matching — this caught near-duplicates (like an edited copy) that a simple checksum comparison would have missed, and grouped them with a Hamming-distance threshold.
3. Once I approved, I asked for the **remaining non-duplicate files** to be sorted into type-based folders (Documents, PDFs, Archives, Videos, Others), sorted newest-first — a separate, controlled step rather than bundling detection and action together.
4. I asked it to **verify folder integrity** after each write step (checksum before/after) to prove the original folder was truly left untouched — not just trust the code's own claim.
5. Finally, I asked for the flagged duplicate groups to be **copied (not moved)** into a review folder, so I can eyeball each group myself before deciding what to actually delete.

**Result:** 20 non-duplicate files organized into 5 type-based folders, 8 duplicate photos grouped into 3 review folders — all copies, zero changes to the original source folder, verified by checksum.
