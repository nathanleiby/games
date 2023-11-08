extends Node2D

var DEFAULT_POLYGON := PackedVector2Array([Vector2.ZERO, Vector2.ZERO, Vector2.ZERO, Vector2.ZERO])

## if true, the player has an active selection
var _is_selecting := false

var _polygon := DEFAULT_POLYGON

func _draw():
	draw_polygon(_polygon, [self_modulate])

func _input(event: InputEvent):
	if not event is InputEventMouse:
		return

	var mouse_position := get_local_mouse_position()
	if event.is_action_pressed("left_click"):
		_is_selecting = true

		for index in range(_polygon.size()):
			# initial to 4 points on top of each other, where the mouse clicked
			_polygon.set(index, mouse_position)

		for unit in get_children():
			unit.is_selected = false

	elif _is_selecting and event is InputEventMouseMotion:
		_polygon[1] = Vector2(mouse_position.x, _polygon[0].y)
		_polygon[2] = Vector2(mouse_position.x, mouse_position.y)
		_polygon[3] = Vector2(_polygon[0].x, mouse_position.y)

	elif event.is_action_released("left_click"):
		select_units()
		_is_selecting = false
		_polygon = DEFAULT_POLYGON

	queue_redraw()

func select_units():
	# for unit in get_children():
	#     # TODO: does this work? avoids collider stuff
	#     # requires us to overlap the unit's center, which may be non-ideal..
	#     # ...could check for overlap with unit bounds.. which is basically collision
	#     # https://ask.godotengine.org/113635/how-to-check-if-a-point-is-in-a-polygon2d
	#     if Geometry2D.is_point_in_polygon(unit.global_position, _polygon):
	#         unit.is_selected = true

	var query := PhysicsShapeQueryParameters2D.new()
	var shape := ConvexPolygonShape2D.new()
	shape.points = _polygon

	query.shape = shape
	query.transform = global_transform
	query.collide_with_bodies = false
	query.collide_with_areas = true
	query.collision_mask = Global.Layers["UI"]

	for dict in get_world_2d().direct_space_state.intersect_shape(query):
		dict.collider.owner.is_selected = true
