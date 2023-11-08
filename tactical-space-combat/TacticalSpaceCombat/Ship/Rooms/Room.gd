@tool
class_name Room
extends Area2D

var _area := 0

## Positions in `TileMap` coordinations for top-left and bottom-right
var topLeft := Vector2.ZERO
var bottomRight := Vector2.ZERO

# index for custom iterator, to iterate over rooms
var _iter_index := 0

# TODO: see if `area is Room` works in Godot 4, vs `area.is_in_group('room')`

## Room size in `TileMap` cells
@export var size := Vector2.ONE:
	# TODO: Ideally would be Vector2i
	get:
		return size
	set(value):
		for axis in [Vector2.AXIS_X, Vector2.AXIS_Y]:
			size[axis] = max(1, value[axis])
		_setup_extents()

var _tilemap: TileMap = null

@onready var collision_shape: CollisionShape2D = $CollisionShape2D
@onready var feedback: NinePatchRect = $Feedback

func _ready():
	connect("mouse_entered", _on_mouse_entered_exited.bind(true))
	connect("mouse_exited", _on_mouse_entered_exited.bind(false))
	
func _on_mouse_entered_exited(has_entered: bool):
	feedback.visible = has_entered
	if has_entered:
		add_to_group(Global.Groups.SelectedRoom)
	else:
		remove_from_group(Global.Groups.SelectedRoom)
		
func setup(tilemap: TileMap):
	_tilemap = tilemap
	_setup_extents()

func _setup_extents():
	if _tilemap != null:
		# TODO: investigate 32 fudge factor
		collision_shape.shape.size = _tilemap.map_to_local(size) - Vector2(32, 32)

		_area = int(size.x * size.y)
		var topLeftPx: Vector2 = position - collision_shape.shape.size / 2
		topLeft = _tilemap.local_to_map(topLeftPx)
		bottomRight = topLeft + size - Vector2.ONE
		
		feedback.position = collision_shape.position - (collision_shape.shape.size / 2)
		feedback.size = collision_shape.shape.size


# Custom Iterator
# This allows us to iterate through the "cells" (tiles) of the room

func _iter_init(_arg) -> bool:
	_iter_index = 0
	return __iter_is_running()

func _iter_next(_arg) -> bool:
	_iter_index += 1
	return __iter_is_running()

func _iter_get(_arg) -> Vector2:
	var offset := Utils.index_to_xy(int(size.x), _iter_index)
	return topLeft + offset

# should the iterator keep running?
func __iter_is_running() -> bool:
	return _iter_index < _area
