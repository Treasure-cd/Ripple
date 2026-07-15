# COPY.md — Ripple

A plain-text guide to how Ripple talks. Drop this into the project root alongside `DESIGN.md` and `AGENTS.md`. Tell your agent to follow it when writing any user-facing copy: landing page, onboarding, empty states, buttons, errors, emails.

> **Note for the team:** this is a first draft based on what's known about the product so far. Adjust the "Product Snapshot" and "Audience" sections if any of the assumptions below are off — everything downstream (voice, vocabulary, examples) follows from those.

---

## 1. Product Snapshot

Ripple is a skill-swapping platform. Instead of paying cash for services, people trade skills using a credit system: teach someone guitar, earn credits; spend those credits to get help with your resume, a logo design, a workout plan, whatever you need.

The core idea worth protecting in copy: **value moves in a circle, not a straight line.** You don't have to trade *with* the person who helped you — you help someone, earn a credit, and that credit ripples out to whoever you spend it with next. That's the name. Don't lose it in generic "marketplace" language.

---

## 2. Audience

Assume the primary user is:
- Someone with a real skill (technical or not) but limited cash to spend on services
- Comfortable online, but not necessarily deep into crypto/Web3 jargon — **avoid language that makes this sound like a token economy**
- Motivated by community and reciprocity as much as by getting something "free"

Two user modes in almost every piece of copy: the person **offering** a skill, and the person **requesting** one. Good copy usually acknowledges both sides are the same people wearing different hats.

---

## 3. Voice

| Trait | Do | Don't |
|---|---|---|
| **Warm, not corporate** | "Teach what you know. Learn what you don't." | "Leverage your expertise to unlock peer-to-peer value exchange." |
| **Plain, not clever-for-its-own-sake** | "You've got 3 credits." | "Your Ripple Balance™ currently reflects 3 units of exchange value." |
| **Confident, not hypey** | "Swap skills. No cash needed." | "Revolutionize the way the world learns! 🚀" |
| **Human, not transactional** | "Say thanks with a credit." | "Remit compensation via the credit protocol." |

General rule: if a sentence would sound normal coming from a friend who's excited to tell you about the app, keep it. If it sounds like it belongs in a pitch deck, cut it.

---

## 4. Core Vocabulary

Use these terms consistently. Don't let synonyms drift across pages — an agent generating copy for different sections will invent synonyms unless told not to.

| Concept | Canonical term | Avoid |
|---|---|---|
| The unit of value | **Credit** | "coin," "point," "token" |
| Offering a skill | **Teaching** / **Offering** | "selling," "listing" |
| Requesting a skill | **Requesting** / **Learning** | "buying," "purchasing" |
| A completed trade | **Swap** | "transaction," "deal" |
| A user's skill listing | **Skill** | "gig," "service," "product" |
| The person on the other side | **Swap partner** | "client," "customer," "vendor" |

If the product introduces new mechanics later (e.g. a rating system, a waitlist, credit expiry), add them here immediately so the vocabulary stays locked.

---

## 5. Messaging Pillars

Three ideas to return to across the site. Every headline or hero section should map back to at least one.

1. **No cash required.** Skills are the currency. Say this plainly and early — it's the single biggest thing a new visitor needs to understand in the first five seconds.
2. **Everyone has something to teach.** Counter the instinct of "I don't have a skill worth trading." Copy should make niche/unusual skills feel welcome (spreadsheet wizardry counts as much as guitar lessons).
3. **The ripple effect.** Credits don't have to close the loop with the same person. Reinforce that helping someone now pays forward later, with someone else entirely.

---

## 6. Example Microcopy

Use these as tone reference, not verbatim copy to ship as-is.

**Hero headline (pick one direction, don't run all three):**
- "Trade skills. Skip the invoice."
- "What you know is worth something. Spend it."
- "Teach one thing. Learn anything."

**CTA buttons:**
- Primary: `Start swapping` (not "Get Started" — too generic for this product)
- Secondary: `See how it works`

**Empty states:**
- No skills listed yet: "Nothing here yet. What's something you're good at?"
- No swaps completed: "Your first swap is out there. Go teach something."

**Credit balance / low balance:**
- "You've got 2 credits — enough for a quick session."
- Low/zero balance: "You're out of credits. Teach something to earn more."

**Error / failed match:**
- "That swap request didn't go through. Try again in a moment."
- Avoid: "An error has occurred. Please contact support." (too cold for a peer product)

**Onboarding step labels:**
- "What can you teach?"
- "What do you want to learn?"
- "Set your first swap"

---

## 7. Do's and Don'ts

**Do:**
- Keep sentences short. Fragments are fine for headlines.
- Use "you" directly — this is a peer product, not an institution.
- Let credits feel earned, not like currency you're trying to make people spend faster (avoid urgency/FOMO language like "Credits expiring soon!" unless that's an actual product mechanic).

**Don't:**
- Don't use finance/crypto language (yield, wallet, staking, tokenomics).
- Don't use gig-economy language (client, vendor, rating stars as the headline metric) — this isn't Fiverr with a different currency.
- Don't oversell with exclamation points in body copy. One per page, max, and only in a genuinely celebratory moment (e.g. "Swap complete!").

---

## 8. How to Use

1. Keep this file at the project root.
2. When asking your agent to write copy, point it here explicitly: *"Write the empty-state copy for the skills dashboard, following COPY.md."*
3. Update Section 1 (Product Snapshot) and Section 4 (Vocabulary) first if the product evolves — everything else should follow from those two sections staying accurate.
