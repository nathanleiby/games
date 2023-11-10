Game implementation

- [ ] game map
  - [ ] simple obstacles
- [ ] tower
  - [ ] place a tower
  - [ ] verify legal build position
  - [ ] preview build position, then confirm
- [x] base
- [x] enemy
  - [ ] hard coded path
  - [ ] pathfind to base
- [x] hero
  - [x] action: movement
  - [x] action: build tower
  - [ ] action: attack
- [ ] economy
  - [ ] spend money to build tower
- [ ] game loop
  - [ ] wave
    - [ ] build phase vs combat phase
    - [ ] spawn enemies
    - [ ] earn $ (defeating enemies or completing wave)
    - [ ] show progress toward Nth wave
  - [ ] between waves
    - [ ] choose upgrades (drafted)
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

Other

- how best to propagate state (e.g. spent 1 coin, change gameState and UI label text)?
- `Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/excalibur.js?v=6db1205f' does not provide an export named 'default'` .. can I use `ex.Foo` syntax or deprecated?
