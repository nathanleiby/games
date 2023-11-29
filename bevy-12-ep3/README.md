# Bevy 0.12 Beginner Tutorial Series - Ep 3

Followed this tutorial:
https://www.youtube.com/watch?v=R-u1EY9fOJQ&list=PL2wAo2qwCxGDp9fzBOTy_kpUTSwM1iWWd&index=2&t=1147s&ab_channel=ZymartuGames

Learnings:

- `With` used to constrain for only components that match. One pattern is to use marker Component, to fetch only entities with that Component.
  - can use `With` to have "multiple constraints" (AND query)
  - multiple matches (OR query)
  - `Without` also exists to exclude entities with a component, e.g. to match all moving bodies the player
- Can grab a single entity with `single()` or `single_mut()` -- it will panic if there's not exactly one entity that matches the query
- Can use a 3rd party plugin for Physics, such as:
  - [bevy_rapier](https://github.com/dimforge/bevy_rapier)
  - https://github.com/Jondolf/bevy_xpbd
