# lichess-node
Lichess API node.js requests

### Installation
```sh
npm i lichess-node
```

### Usage
```JavaScript
import Lichess from "lichess-node"

const chess = new Lichess()

chess.puzzles.getTheDailyPuzzle()
  .then(res => console.log(res))
  .catch(e => console.log(e.message))
```

### Implemented methods
- Account - all
- Users - all
- Relations - all
- Games - only 3
- TV - all
- Puzzles - all
- Teams - few
- Board - __none__
- Bot - __none__
- Challenges - __none__
- Bulk pairings - __none__
- Arena tournaments - only 2
- Swiss tournaments - __none__
- Simuls - all
- Studies - all
- Messaging - all
- Broadcasts - only 1
- Analysis - all
- External engine - __none__
- Opening Explorer - all
- Tablebase - all


