# Duck Race Game Rules

## Game Overview

Duck Race is a competitive racing game where 2-8 participants control duck avatars in a race to the finish line. Each race is time-limited, and the first duck to cross the finish line (or the duck furthest ahead when time expires) wins.

## Setup Rules

### Participant Registration

1. **Minimum Participants**: 2 ducks
2. **Maximum Participants**: 8 ducks
3. **Name Requirements**:
   - Each duck must have a unique name
   - Name length: 1-20 characters
   - Allowed characters: Letters, numbers, spaces, and basic punctuation
   - No duplicate names allowed in a single race

### Time Limit Selection

Players must choose one of the following time limits before starting:

| Time Limit | Duration | Best For |
|------------|----------|----------|
| Quick Race | 30 seconds | Fast-paced fun, quick rounds |
| Standard Race | 1 minute | Balanced gameplay |
| Extended Race | 2 minutes | Strategic racing |
| Marathon Race | 5 minutes | Endurance challenge |

## Racing Mechanics

### Movement System

1. **Base Speed**: Each duck has a random base speed assigned at race start
   - Range: 0.5x to 1.5x of standard speed
   - Remains constant throughout the race

2. **Speed Bursts**: Random acceleration events
   - Frequency: Every 1-3 seconds
   - Multiplier: 1.2x to 2.0x base speed
   - Duration: 0.5-1.5 seconds

3. **Position Updates**: Calculated 60 times per second for smooth animation

### Race Track

- **Track Length**: 100% of screen width (1000 units)
- **Lanes**: Each duck races in its own horizontal lane
- **Starting Line**: All ducks begin at position 0
- **Finish Line**: Position 1000 (100% progress)

### Obstacles (Future Feature)

Planned obstacles that will affect gameplay:
- **Puddles**: Slow ducks by 50% for 1 second
- **Wind Gusts**: Push ducks backward 5-10 units
- **Speed Boosts**: Increase speed by 100% for 2 seconds

## Winning Conditions

### Primary Win Condition
The first duck to reach 100% progress (position 1000) wins immediately.

### Time Expiration Win Condition
If the timer reaches 0:00 before any duck reaches the finish:
- The duck with the highest progress percentage wins
- In case of a tie (same position), the duck that reached that position first wins
- Tiebreaker is determined by timestamp of last position update

### Disqualification
Currently, there are no disqualification rules. Future versions may include:
- Going backward off the starting line
- Inactivity/disconnection (in multiplayer mode)

## Scoring System (Future Feature)

### Points Per Race
- 1st Place: 10 points
- 2nd Place: 6 points
- 3rd Place: 4 points
- 4th Place: 3 points
- 5th Place: 2 points
- 6th-8th Place: 1 point

### Achievements
- **Speed Demon**: Win a race in under 15 seconds
- **Photo Finish**: Win by less than 1% margin
- **Comeback King**: Win after being in last place at 50% mark
- **Perfect Race**: Win without any slowdown events
- **Marathon Champion**: Win a 5-minute race

## Game Modes

### Current: Single Race Mode
- One race at a time
- No persistent statistics
- Can restart with same or different participants

### Planned: Tournament Mode
- Best of 3, 5, or 7 races
- Cumulative scoring across races
- Champion declared at tournament end
- Bracket-style elimination (8-duck tournaments)

### Planned: Multiplayer Mode
- Real-time racing with online opponents
- Live leaderboard updates
- Chat functionality
- Spectator mode

## Fair Play Guidelines

### Randomization
- All random events use cryptographically secure random number generation
- Seeds are generated server-side to prevent manipulation
- Same random distribution for all ducks ensures fairness

### Transparency
- All duck speeds are visible to players
- Race progress is updated in real-time
- Timer is synchronized across all clients (in multiplayer)

### Anti-Cheating Measures (Planned)
- Server-side validation of all race results
- Movement speed limits to prevent speed hacking
- Position validation to prevent teleporting
- Automatic detection of suspicious patterns

## Race States

### 1. Setup State
- Players add duck names
- Time limit is selected
- "Start Race" button is enabled when minimum requirements are met

### 2. Countdown State (3 seconds)
- "3... 2... 1... GO!" countdown
- Ducks are positioned at starting line
- No movement allowed
- Builds anticipation

### 3. Racing State
- Ducks move according to speed mechanics
- Timer counts down
- Progress bars update in real-time
- Background music and sound effects play

### 4. Finish State
- Winner is declared
- Final positions are displayed
- Race statistics shown (time, average speed, etc.)
- Options: "Race Again" or "New Race" (different ducks)

## User Interface Rules

### During Setup
- Duck name input fields appear sequentially
- "Add Duck" button (max 8 ducks)
- "Remove Duck" button for each duck
- Time limit dropdown selector
- "Start Race" button (disabled until ≥2 ducks)

### During Race
- Duck avatars with names displayed
- Progress bars for each duck
- Current race timer (countdown)
- Current positions/rankings (1st, 2nd, 3rd, etc.)
- "Quit Race" option (with confirmation)

### After Race
- Winner announcement with animation
- Final standings with times
- Statistics: Average speed, top speed, etc.
- "Share Results" button (social media)
- "New Race" and "Same Ducks, Different Time" buttons

## Customization Options (Planned)

### Duck Appearance
- Color selection (8 preset colors)
- Hat/accessory options (10+ choices)
- Size variations (small, medium, large)
- Animation styles (waddle, slide, bounce)

### Track Themes
- Classic Pond
- Ocean Beach
- City Street
- Space Race
- Rainbow Road
- Seasonal themes (Winter, Spring, Summer, Fall)

## Accessibility Features

### Current
- Keyboard navigation support
- High contrast mode
- Scalable text sizes
- Screen reader compatibility

### Planned
- Color-blind friendly palettes
- Reduced motion mode (for motion sensitivity)
- Audio descriptions of race progress
- Customizable font sizes and styles

## Rules Updates

Game rules may be updated as new features are added. Major changes will be announced in:
- Release notes
- In-game notification system
- Project changelog

---

**Last Updated**: January 7, 2026
**Version**: 0.1.0
**Status**: Initial draft - Rules subject to change as game is developed

For questions about game rules, please open an issue on GitHub or check the main [README.md](../README.md).
