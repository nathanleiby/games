extends Unit

# managed within `Units.gd`, where we handle mouse selection
var is_selected := false:
	set(value):
		is_selected = value
		if is_selected:
			add_to_group(Global.Groups.SelectedUnit)
			area_unit.modulate = COLORS.selected
		else:
			remove_from_group(Global.Groups.SelectedUnit)
			area_unit.modulate = COLORS.default
	get:
		return is_selected

@onready var area_select: Area2D = $PathFollow2D/AreaSelect

func _ready():
	self.is_selected = false
