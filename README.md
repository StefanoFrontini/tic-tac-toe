# Tic-tac-toe

## Links

- [Live Site URL](https://tic-tac-toe-artificial-intelligence.netlify.app/)

## Setup

```bash
# Install dependencies
$ npm install

# Run the dev server
$ npm run dev

# Build for production
$ npm run build
```

## Artificial Intelligence

The AI is based upon the Minimax algorithm.

### Game

- S<sub>0</sub>: initial state
- player(_s_): function that returns which player to move in state _s_
- actions(_s_): returns legal moves in state _s_
- result(_s_,_a_): returns state after action _a_ taken in state _s_ (transition model)
- terminal(_s_): checks if state _s_ is a terminal state
- utility(_s_): final numerical value for terminal state _s_

### Minimax algorithm

- player X is the max player(MAX)
- player O is the min player(MIN)

Given a state s:

- MAX picks action _a_ in actions(_s_) that produces highest value of MinValue(result(_s_, _a_))
- MIN picks action _a_ in actions(_s_) that produces smallest value of MaxValue(result(_s_, _a_))

```js
function maxValue(s) {
  if (terminal(s)) return utility(s);
  v = -Infinity;
  for (action of actions(s)) {
    v = Math.max(v, minValue(result(s, a)));
  }
  return v;
}

function minValue(s) {
  if (terminal(s)) return utility(s);
  v = Infinity;
  for (action of actions(s)) {
    v = Math.min(v, maxValue(result(s, a)));
  }
  return v;
}
```

## References

- [Harvard CS50's Artificial Intelligence with Python](https://youtu.be/5NgNicANyqM?si=CVGvTVtPhFL31PVT)
