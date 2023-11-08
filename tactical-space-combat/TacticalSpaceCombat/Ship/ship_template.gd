@tool

extends Node2D

@onready var tilemap: TileMap = $TileMap
@onready var rooms: Node2D = $Rooms

# NOTE: Would be super cool if the editor could expose these as enums somehow
# vs needing to deal with mapping IDs in code
#
# (Perhaps not possible if dynamically instantiated vs coding-time values)
# (Could create editor magic autocomplete by peeking in tres file, ShipTileSet.tres? `[sub_resource type="TileSetAtlasSource" id="TileSetAtlasSource_08cda"]`)
# (maybe a lib script that bootstraps globals by reading the tres file? and fails if things missing)

const LAYER := 0 # tilemap ID
const TERRAIN_SET := 0 # terrain set ID
const TERRAIN := 0 # terrain ID. this terrain is a member of the above terrain set


func _ready() -> void:
	if Engine.is_editor_hint():
		_ready_editor_hint()
	else:
		_not_ready_editor_hint()

func _ready_editor_hint():
	for room in rooms.get_children():
		room.setup(tilemap)

func _not_ready_editor_hint():
	for _room in rooms.get_children():
		var room: Room = _room as Room
		room.setup(tilemap)

		var points := []
		for point in room:
			print(room.name, " ", point)
			tilemap.set_cell(LAYER, point)
			points.append(point)

		tilemap.set_cells_terrain_connect(LAYER, points, TERRAIN_SET, TERRAIN)
