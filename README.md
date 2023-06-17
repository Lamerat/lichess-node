![lichess-node](https://dev-fidweb.s3.amazonaws.com/fightscout-devUpload/d041cfee-a74e-4b14-85ab-16ec898c6b6e-lichess-node.png)

### Installation
```sh
npm i lichess-node
```

### Remarks
In library most Lichess.org/api endpoints who return streams, here come as single JSON with limit of results.

### Usage
```JavaScript
import Lichess from 'lichess-node'

const chess = new Lichess();

chess.puzzles.getTheDailyPuzzle()
  .then(res => console.log(res))
  .catch(e => console.log(e.message));
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
- Bot - only 1
- Challenges - __none__
- Bulk pairings - __none__
- Arena tournaments - only 2
- Swiss tournaments - __none__
- Simuls - all
- Studies - all
- Messaging - all
- Broadcasts - only 1
- Analysis - all
- External engine - only 5
- Opening Explorer - all
- Tablebase - all
