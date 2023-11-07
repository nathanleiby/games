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
	print("_setup_extents")
	if _tilemap != null:
		#print("-> Setup extents!")
		# collision_shape.shape.get_rect().size = 0.5 * _tilemap.map_to_local(size)	
		# collision_shape.shape.size = 0.5 * _tilemap.map_to_local(size)	
		#print(_tilemap.map_to_local(size))
		
		#print("before = ", collision_shape.shape.size)
		# TODO: investigate 32 fudge factor
		var outSize := _tilemap.map_to_local(size)
		print("size = ", size, " ... outSize = ", outSize)
		collision_shape.shape.size = outSize - Vector2(32, 32)
		#print("after = ", collision_shape.shape.size)
