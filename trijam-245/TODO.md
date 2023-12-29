# Todo

## Tasks

### v2

- [x] fix jumping to work in new world
- [x] change collider over feet https://excaliburjs.com/docs/colliders/#compositecollider
- [x] sheep don't jump after crossing the fence
- [x] change `Sheep: N` text on blackboard

### Backlog

- [ ] Core game loop
  - [x] Add a sheep
  - [x] Add a wall
  - [x] Sheep moves right
  - [x] Spacebar to jump
  - [x] Sheep reaches destination? +1 sheep count
  - [ ] end game condition
    - [ ] press "go to sleep" button
    - [x] reach N sheep
    - [x] fade screen
- [ ] improve gameplay
  - [ ] variety of sheep types
  - [ ] tune spawn timing
- [ ] Art
  - [x] Add music
    - https://opengameart.org/content/a-lucid-dream
    - https://opengameart.org/content/sleep-hypnosis
    - https://opengameart.org/content/dream-2
    - https://opengameart.org/content/sleep-talking-loop-fantasy-rpg-sci-fi
  - [ ] Sound FX
    - [ ] on spawn
    - [x] on jump
    - [x] on cross finish line
    - [ ] on end game ..
      - https://opengameart.org/content/sleep-inn
  - [x] Use left and right facing image for sheep
  - [x] Add background -- frame in sleep dreamy ness
  - [ ] Add start game screen
    - [x] MVP: Excalibur play

## Bugs

- [x] 2 stacked ship on finish line start sinking :D -> this.kill()
- [x] Sheep turn around when touching top of fence
- [..] Sheep can get stuck and stop moving
  - This could prevent game from being finishable, since we stop spawning more sheep
  - minimal workaround added (set vel.x in update loop)
- [ ] stacked sheep - can prevent jumping. can lead to jittery UX. can get you stuck

## Things to try:

- animating a sprite
- use a color pallete for nicer visual design
  - ex. https://lospec.com/palette-list/pear36
  - https://gdquest.mavenseed.com/lessons/project-setup-974f4032d290f7c6
- parallax background
