@tool
class_name Room
extends Area2D

# TODO: see if `area is Room` works in Godot 4, vs `area.is_in_group('room')`

## Room size in `TileMap` cells
@export var size := Vector2.ONE:
	get:
		return size
	set(value):
		for axis in [Vector2.AXIS_X, Vector2.AXIS_Y]:
			size[axis] = max(1, value[axis])
		_setup_extents()

var _tilemap: TileMap = null

@onready var collision_shape: CollisionShape2D = $CollisionShape2D

func setup(tilemap: TileMap):
	_tilemap = tilemap
	_setup_extents()

func _setup_extents():
	if _tilemap != null:
		# TODO: investigate 32 fudge factor
		var outSize := _tilemap.map_to_local(size)
		collision_shape.shape.size = outSize - Vector2(32, 32)
