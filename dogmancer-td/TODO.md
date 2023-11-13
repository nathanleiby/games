# TODOs

## Game Implementation

- [ ] game map
  - [..] simple obstacles
  - [ ] first level layout
- [ ] tower
  - [x] place a tower
  - [ ] attack enemy
  - [ ] tear down a built tower
  - [ ] verify legal build position
  - [ ] preview build position, then confirm
  - [ ] die to enemy(?)
- [x] base
- [x] enemy
  - [..] hard coded path
  - [ ] pathfind to base
  - [ ] stats: health, damage
- [x] hero
  - [x] action: movement
  - [x] action: build tower
  - [ ] action: attack
- [ ] economy
  - [x] spend money to build tower
  - [x] gain money when defeat an enemy
  - [ ] gain money when win a wave
- [ ] game loop
  - [..] wave
    - [ ] build phase vs combat phase
    - [ ] have timer to enter combat phase
      - [ ] (press button) to start earlier
    - [..] spawn enemies
    - [..] show progress toward Nth wave
  - [ ] levels
    - [ ] on level win, choose upgrades (rogue-like)
- [ ] mvp multiplayer .. 2nd hero and control it
- [ ] full game structure
  - [ ] home screen (new game, settings)
    - [ ] fun: art easter eggs depending on your game progress
  - [ ] lobby
    - [ ] allow other players to join
    - [ ] choose character
  - [ ] game
  - [ ] game over
    - [ ] win
      - [ ] celebration screen
      - [ ] save record of run
    - [ ] lose

## Player experience

- [ ] spawn enemies where they cannot immediately be killed
- [ ] deal with collisions between enemies?

## Productivity

- [ ] Simplify creation of levels .. use tiled editor and import? level data file?
- [ ] (fun) Procedurally generate levels

## Other

- how best to propagate state (e.g. spent 1 coin, change gameState and UI label text)?
  - For now, (1) creating a global gamestate (2) adding a hook to fully refresh UI as needed when gameState changes
  - Could build UI layer in react/etc and update that state, but that seems like overkill for now
- `Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/excalibur.js?v=6db1205f' does not provide an export named 'default'` .. can I use `ex.Foo` syntax or deprecated?
