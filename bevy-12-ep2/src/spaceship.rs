use bevy::prelude::*;

use crate::movement::Velocity;

const STARTING_TRANSLATION: Vec3 = Vec3::new(0.0, 0.0, 0.0);
const STARTING_VELOCITY: Vec3 = Vec3::new(0.0, 0.0, 1.0);

// # TODO: what is a Bundle vs an Entity?
// One thought: You can have a bundle of bundles (tree), so entity is ref to the top-most one
// Another thought (from Copilot): Bundle is a collection of components, Entity is a collection of bundles
// Another thought: Bundle is a collection of components, Entity is a collection of components
// Another thought: Bundle is a collection of components, Entity is a collection of components, and a bundle is a collection of components
// Another thought: Bundle is a collection of components, Entity is a collection of components, and a bundle is a collection of components, and a bundle is a collection of components
// Another thought: recursion might be causing chatgpt to stop autocompleting here
// Another thought:

#[derive(Bundle)]
struct SpaceshipBundle {
    velocity: Velocity,
    model: SceneBundle,
}

pub struct SpaceshipPlugin;
impl Plugin for SpaceshipPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(Startup, spawn_spaceship);
    }
}

fn spawn_spaceship(mut commands: Commands, asset_server: Res<AssetServer>) {
    let handle = asset_server.load("spaceship.glb#Scene0");
    commands.spawn(SpaceshipBundle {
        velocity: Velocity {
            value: STARTING_VELOCITY,
        },
        model: SceneBundle {
            scene: handle,
            transform: Transform::from_translation(STARTING_TRANSLATION),
            ..default()
        },
    });
}
