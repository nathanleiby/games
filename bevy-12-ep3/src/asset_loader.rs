use bevy::prelude::*;

#[derive(Resource, Debug, Default)]
pub struct SceneAssets {
    pub asteroid: Handle<Scene>,
    pub spaceship: Handle<Scene>,
    pub missiles: Handle<Scene>,
}

pub struct AssetLoaderPlugin;
impl Plugin for AssetLoaderPlugin {
    fn build(&self, app: &mut App) {
        // All other systems that depend on these assets must run AFTER this one, so that the assets are loaded
        app.init_resource::<SceneAssets>()
            .add_systems(Startup, load_assets);
    }
}

fn load_assets(mut scene_assets: ResMut<SceneAssets>, asset_server: Res<AssetServer>) {
    scene_assets.asteroid = asset_server.load("Asteroid.glb#Scene0");
    scene_assets.spaceship = asset_server.load("Spaceship.glb#Scene0");
    // TODO: add back later
    // scene_assets.missiles = asset_server.load("Missiles.glb#Scene0");
}
