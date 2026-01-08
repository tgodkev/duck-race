# Duck Race Game

A fun, interactive duck racing game built with Next.js where players can compete against each other in timed races. Watch as adorable ducks race across the screen in this exciting multiplayer experience!

## Overview

Duck Race is a real-time racing game where participants are assigned duck avatars and compete to reach the finish line first. Players can customize their duck names and configure race durations to create the perfect racing experience.

## Features

- **Custom Participant Names**: Add unique names for each racing duck
- **Configurable Time Limits**: Set race durations from quick 30-second sprints to marathon 5-minute races
- **Real-time Racing Animation**: Watch ducks race across the screen with smooth animations
- **Responsive Design**: Play on desktop, tablet, or mobile devices
- **Dark Mode Support**: Comfortable viewing in any lighting condition
- **Winner Declaration**: Automatic winner announcement when the race concludes

## Tech Stack

- **Framework**: [Next.js 16.1.1](https://nextjs.org) with App Router
- **UI Library**: [React 19.2.3](https://reactjs.org)
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Font**: Geist font family by Vercel

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/duck-race.git
cd duck-race
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## How to Play

1. **Setup Phase**:
   - Enter names for each duck participant (2-8 ducks recommended)
   - Select a time limit for the race (30 seconds, 1 minute, 2 minutes, or 5 minutes)
   - Click "Start Race" to begin

2. **Racing Phase**:
   - Watch as ducks race across the screen
   - Each duck moves at varying speeds with random bursts
   - Race progress is displayed in real-time
   - Timer counts down to show remaining time

3. **Results**:
   - The first duck to cross the finish line wins
   - If time runs out, the duck closest to the finish wins
   - Winner is announced with celebration animation
   - Option to start a new race with same or different participants

## Configuration Options

### Race Time Limits
- **Quick Race**: 30 seconds - Fast-paced, high-energy racing
- **Standard Race**: 1 minute - Balanced gameplay
- **Extended Race**: 2 minutes - More strategic racing
- **Marathon Race**: 5 minutes - Epic endurance challenge

### Participant Settings
- **Minimum Ducks**: 2
- **Maximum Ducks**: 8
- **Name Length**: 1-20 characters per duck

## Project Structure

```
duck-race/
├── app/
│   ├── page.tsx          # Main game page
│   ├── layout.tsx        # Root layout with fonts and metadata
│   ├── globals.css       # Global styles and Tailwind imports
│   └── favicon.ico       # App icon
├── components/           # React components (to be created)
│   ├── DuckRacer.tsx    # Individual duck component
│   ├── RaceTrack.tsx    # Race track layout
│   ├── SetupForm.tsx    # Pre-race configuration form
│   └── Results.tsx      # Post-race results display
├── lib/                  # Utility functions (to be created)
│   └── raceLogic.ts     # Race mechanics and calculations
├── public/              # Static assets
│   ├── next.svg
│   └── vercel.svg
├── docs/                # Additional documentation
│   └── GAME_RULES.md   # Detailed game mechanics
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Development Roadmap

### Current Features (v0.1.0)
- Project setup and initial documentation

### Planned Features (v0.2.0)
- [ ] Duck setup form with name input
- [ ] Time limit selector
- [ ] Basic race track UI
- [ ] Duck racing animation
- [ ] Timer countdown display
- [ ] Winner declaration

### Future Enhancements (v0.3.0+)
- [ ] Duck customization (colors, accessories)
- [ ] Sound effects and background music
- [ ] Race replays
- [ ] Leaderboard and statistics
- [ ] Multiplayer mode with live updates
- [ ] Power-ups and obstacles
- [ ] Tournament brackets
- [ ] Save race history
- [ ] Social sharing of race results

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Duck emoji and animations inspired by classic racing games
- Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)
- Fonts provided by [Vercel](https://vercel.com/font)

## Support

If you encounter any issues or have questions:
- Open an issue on [GitHub](https://github.com/yourusername/duck-race/issues)
- Check the [docs](./docs) folder for detailed documentation

---

Made with ❤️ by the Duck Race Team. Happy racing!
