# UI Data Display Map

This document maps the fields in `data/mock.ts` to the two UI surfaces that matter here:

- `src/components/List.tsx`
- `src/routes/user.$id.tsx`

The app is a skills-and-knowledge barter platform, so the UI should emphasize:

- what a person can offer
- what a person wants to learn
- how strong or active they are in the system

## Data available in `mock.ts`

Each user currently has:

- `id`
- `name`
- `bio`
- `location`
- `availability`
- `profileImage`
- `skills`
- `interests`
- `credits`
- `rating`
- `reputation`
- `previousExchanges`
- `contactDetails`

## What `List.tsx` should display

`List.tsx` is the browse/discovery view. It should help a user quickly decide who looks like a good barter match.

### Recommended content per card

- `name`
- `skills` as visible chips or tags
- `interests` as secondary tags or a "learning" section
- `credits` as a small balance badge or stat
- profile action, such as "View Profile"

### Why these fields matter

- `name` identifies the person.
- `skills` show what they can teach or trade.
- `interests` show what they want to learn, which is the most important signal for barter matching.
- `credits` give a quick sense of activity, value, or exchange capacity in the platform.

### What the list should prioritize visually

- Primary: `name`
- Secondary: `skills`
- Tertiary: `interests` and `credits`

### Matching behavior

The current component already filters by selected skills. That is a good discovery pattern, but the card should still display the full trade context:

- show the selected-skill match clearly if a user matches the filter
- keep a fallback state when no skills are selected or no matches exist
- avoid hiding `interests`, because in this app they are useful for finding exchange opportunities

## What `user.$id.tsx` should display

`user.$id.tsx` is the detailed profile view. It should show everything available about one user and support a decision to connect, trade, or learn from them.

### Recommended content on the detail page

- full `name`
- `credits`
- all `skills`
- all `interests`
- a profile summary section explaining what the person offers and what they want
- a clear trade or contact call to action

### Recommended page structure

1. Profile header
   - `name`
   - `credits`
2. Offered skills
   - full list of `skills`
3. Learning interests
   - full list of `interests`
4. Exchange context
   - a short section that frames the user as a possible barter partner
5. Action area
   - connect, trade, or view exchange options

### Why the detail page should show more than the list

The list page is for scanning. The detail page is for deciding.

- `skills` answer "What can this person offer?"
- `interests` answer "What does this person want in return?"
- `credits` can support trust, readiness, or exchange balance

## Best-fit interpretation for this app

Because the app supports trade by barter for skills and knowledge, the strongest UI emphasis should be:

- on `skills` as the supply side
- on `interests` as the demand side
- on `credits` as an exchange indicator

That means:

- `List.tsx` should act like a marketplace browser
- `user.$id.tsx` should act like a full partner profile

## Data gap note

The current mock data now supports stronger matching and trust signals. If the product later needs even more detail, the next useful additions would be:

- `completedTrades`
- `responseTime`
- `language`
- `portfolioLinks`

Those would improve both the list view and the profile page, but they are optional for the current dataset.
