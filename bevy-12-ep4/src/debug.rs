use bevy::prelude::*;

pub struct DebugPlugin;
impl Plugin for DebugPlugin {
    fn build(&self, app: &mut App) {
        // app.add_systems(Update, print_position);
    }
}

// fn print_position(query: Query<(Entity, &Asteroid, &Transform)>) {
//     for (entity, _, transform) in query.iter() {
//         info!(
//             "Entity: {:?} Transform: {:?}",
//             entity, transform.translation
//         );
//     }
// }
