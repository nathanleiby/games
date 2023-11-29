# Bevy 0.12 Beginner Tutorial Series - Ep 4

purpose:

- schedules, and how they work with systems
- explicit system ordering
- implicit flush
- apply deferred
- SystemSets

Schedules include things we've seen like Startup, PostStartup, UIpdate
Main is "meta schedule" (but it is same as others like Startup, Update)
it iterates over a list of other schedules.

TODO: Is there a graph of the schedules somewhere?

```mermaid
td
  First -> PreUpdate
  PreUpdate -> StateTransition
```

Here's the source code pointed to in the lecture video:
https://github.com/bevyengine/bevy/blob/13f2749021175c6377e6efe99f17a4e129fd33f4/crates/bevy_app/src/main_schedule.rs

More on schedules:
https://bevy-cheatbook.github.io/programming/schedules.html

Relevant source from lecture:

In general, just want to use these:

- `Startup`
- `PostStartup`
- `FixedUpdate` (useful for physics)
- `Update`

--

Instead of using First or Last, use the explicit ordering system APIs.

How to order systems? Use the `before` and `after` methods.
They specifiy dependencies between systems.
Otherwise, Bevy will run them in parallel.

ex

```rust
app.add_systems(Update, (x1, x2).chain())
```

`chain` makes sure the systems in a tuple run sequentially.

--

The above is a solid start for many things.
However, some behaviors are scheduled into a queue to be run when possible (`commands`).
ex. entity creation, component insertion, entity despawn
They are flushed later, in the order they were added in the queue.

**Flush Points**

By default, all systems are flushed at end of each schedule (First, PreUpdate, Update, PostUpdate, ...)
So entities won't exist until next step of Main.
This is how Bevy works today. In future, might make more flush points based on user's specified explicit before/after.

concern: these can introduce risk of panics by accessing entities that don't exist yet.

**Apply Deferred**

`apply_deferred` means "flush". You can explicitly add it to a system to make it flush at that point

(add_shield_component, apply_deferred, despawn_entity)

Problem: This is continually a challenge.

Suggest using explicit ordering fns (before, after, apply_deferred) within a Plugin, but not across Plugins.

## System Sets

These can be used to group systems together.
They can also be helpful to specific conditional execution of a system.

Similarly to system ordering, you can use before/after/chain to order sytem sets.

### So: Bevy is **Parallel by default**, but ordered when needed.

future: we'll learn to decouple input handling with Events, simplifying system ordering.

tldr:
Scheduling is complex, but also you MUST understand it to use Bevy effectively.
Systems will have deps and you need to order those appropriately.
