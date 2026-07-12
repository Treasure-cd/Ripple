## How database looks like.

Ripple is an app that works as a place you can earn and spend knowledge credits.
Users have:
    - Id
    - Name
    - Cached balance (cummulative of all their credits gotten from the ledger)
    - Social Links

Skills
Skills have:
    - Id
    - Name
    - category (Programming, Design, Language)

UserSkills
UserSkills have:
    - Id
    - User ID
    - Intent
    - Proficiency Level
    - Hourly Rate

Transactions have:
    - Transaction ID
    - Session ID
    - Sender ID
    - Reciever ID
    - Amount
    - Status (Pending, Completed, Cancelled)
    - Created at

Sessions have:
    - Session ID
    - User Skill ID
    - Learner ID
    - Teacher's ID
    - Scheduled at
    - Credits cost
    - Status
    - Created At
    - Completed At

Reviews have:
    - User Id
    - Rating
    - Created At


How do we know what a session is?
    - Defualt is 1 hour per credit, but editable per user.
    - The learner selects a time.
    - It is only marked as completed when a user clicks so.


Skill verification works like this:
    - For Programming, your github.
    - When github is authenticated, it pings it to return the top languages. 
    - If the top languages are equal to the languaages the put in the skill, all programming skills are verified.
    - For non-programming skills, the community funds the ability for you to be known as a good teacher. So people judge you by aggregate of your stars alone.