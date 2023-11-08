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
		
		if _ui_unit_feedback != null:
			_ui_unit_feedback.visible = value
	get:
		return is_selected

@onready var area_select: Area2D = $PathFollow2D/AreaSelect

func _ready():
	self.is_selected = false

var _ui_unit_feedback: NinePatchRect

func setup(ui_unit: ColorRect):
	_ui_unit_feedback = ui_unit.get_node("Feedback")
	ui_unit.get_node("Icon").modulate = COLORS.default
	
	ui_unit.connect("gui_input", _on_ui_unit_gui_input)
	
func _on_ui_unit_gui_input(event: InputEvent):
	if event.is_action_pressed("left_click"):
		self.is_selected = true
		

