class_name Unit
extends Path2D

const COLORS := {"default": Color("323e4f"), "selected": Color("3ca370")}

@onready var area_unit: Area2D = $PathFollow2D/AreaUnit

func _ready():
	area_unit.modulate = COLORS.default
