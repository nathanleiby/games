extends Node
var Layers = { NONE = 0 }
# NOTE: This, like the tilemap settings, is another area where a stronger binding from editor config (lives in project.godot, here) to the code and autocompletion would be dope!
func _ready() -> void:
 var label := 'layer_names/2d_physics/layer_%d'
 for i in range(20):
  var layer_name: String = ProjectSettings.get_setting(label % (i + 1))

  if layer_name != '':
   Layers[layer_name.to_upper()] = 1 << i

var SelectedUnit = "selected-unit"
const Groups := {
	"SelectedUnit": "selected-unit", 
	"SelectedRoom": "selected-room",
}
