# Bevy 0.12 Beginner Tutorial Series - Ep 2

Followed this tutorial:
https://www.youtube.com/watch?v=R-u1EY9fOJQ&list=PL2wAo2qwCxGDp9fzBOTy_kpUTSwM1iWWd&index=2&t=1147s&ab_channel=ZymartuGames

Learnings:

- When refactoring a plugin to another file.. can use "cmd+." for quick fix add add `mod x` to your main file
- 1 unit is 1 meter in almost all 3d systems. important to use this standard since used in physics and more
- putting movement into the Update loop is fragile. it's not a fixed physics timestep. We can solve via Bevy's time resource (delta time)
