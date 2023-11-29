use bevy::prelude::*;

const CAMERA_DISTANCE: f32 = 80.;

pub struct CameraPlugin;
impl Plugin for CameraPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(Startup, spawn_camera)
            .add_systems(Update, move_camera);
    }
}

fn spawn_camera(mut commands: Commands) {
    commands.spawn(Camera3dBundle {
        transform: Transform::from_xyz(0.0, CAMERA_DISTANCE, 0.).looking_at(Vec3::ZERO, Vec3::Z),
        ..default()
    });
}

// not part of the tutorial
fn move_camera(mut query: Query<(Entity, &Camera, &mut Transform)>, time: Res<Time>) {
    for (entity, camera, mut transform) in query.iter_mut() {
        // zoom in and out
        transform.translation.y =
            CAMERA_DISTANCE + time.elapsed_seconds().sin() * CAMERA_DISTANCE / 2.;
        info!("{:?} -- {:?} -- {:?}", entity, camera, transform);
    }
}
