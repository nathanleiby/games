use std::ops::Range;

use bevy::prelude::*;
use rand::prelude::*;

use crate::{
    asset_loader::SceneAssets,
    collision_detection::Collider,
    movement::{Acceleration, MovingObjectBundle, Velocity},
    schedule::InGameSet,
};

// Keep the asteroids slightly away from where the spaceship spawns and in the inner part of the screen
const SPAWN_RANGE_X: Range<f32> = -25.0..25.0;
const SPAWN_RANGE_Z: Range<f32> = 0.0..25.0;

const SPAWN_TIME_SECONDS: f32 = 1.0;

const VELOCITY_SCALAR: f32 = 5.0;
const ACCELERATION_SCALAR: f32 = 1.0;

const RADIUS: f32 = 2.0;

// This is a "marker struct". No data, just tags the entity as an asteroid
#[derive(Component, Debug)]
pub struct Asteroid;

#[derive(Resource, Debug)]
pub struct SpawnTimer {
    timer: Timer,
}

fn spawn_asteroid(
    mut commands: Commands,
    mut spawn_timer: ResMut<SpawnTimer>,
    time: Res<Time>,
    scene_assets: Res<SceneAssets>,
) {
    // advance the timer
    spawn_timer.timer.tick(time.delta());
    if !spawn_timer.timer.just_finished() {
        return;
    }

    let mut rng = rand::thread_rng();

    let translation = Vec3::new(
        rng.gen_range(SPAWN_RANGE_X),
        0.0,
        rng.gen_range(SPAWN_RANGE_Z),
    );

    let mut random_unit_vector =
        || Vec3::new(rng.gen_range(-1.0..1.0), 0.0, rng.gen_range(-1.0..1.0)).normalize_or_zero();
    let velocity = random_unit_vector() * VELOCITY_SCALAR;
    let acceleration = random_unit_vector() * ACCELERATION_SCALAR;

    commands.spawn((
        MovingObjectBundle {
            velocity: Velocity::new(velocity),
            acceleration: Acceleration::new(acceleration),
            collider: Collider::new(RADIUS),
            model: SceneBundle {
                scene: scene_assets.asteroid.clone(),
                transform: Transform::from_translation(translation),
                ..default()
            },
        },
        Asteroid,
    ));
}

pub struct AsteroidPlugin;
impl Plugin for AsteroidPlugin {
    fn build(&self, app: &mut App) {
        app.insert_resource(SpawnTimer {
            timer: Timer::from_seconds(SPAWN_TIME_SECONDS, TimerMode::Repeating),
        })
        .add_systems(
            Update,
            // these SystemSets are arbitrary starting point. We put spawn_asteroid in the EntityUpdates set
            // we don't chain() b/c spawning and rotatinng aren't dependent on each other
            (spawn_asteroid, rotate_asteroids).in_set(InGameSet::EntityUpdates),
        );
    }
}

const ROTATE_SPEED: f32 = 2.5;
fn rotate_asteroids(mut query: Query<&mut Transform, With<Asteroid>>, time: Res<Time>) {
    for mut transform in query.iter_mut() {
        transform.rotate_local_z(time.delta_seconds() * ROTATE_SPEED);
    }
}
