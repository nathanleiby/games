extends Node2D

const UIUnit = preload("res://TacticalSpaceCombat/UI/ui_unit.tscn")

@onready var ship_player: Node2D = $ShipPlayer
@onready var ui_units: VBoxContainer = $UI/Units

func _ready():
	_ready_units()

func _ready_units():
	for unit in ship_player.units.get_children():
		var ui_unit: ColorRect = UIUnit.instantiate()
		ui_units.add_child(ui_unit)

		# associate the unit with its UI component, so it can update the UI's state
		unit.setup(ui_unit)
