extends Node
var Layers = { NONE = 0 }
func _ready() -> void:
 var label := 'layer_names/2d_physics/layer_%d'
 for i in range(20):
  var layer_name: String = ProjectSettings.get_setting(label % (i + 1))
  
  if layer_name != '':
   Layers[layer_name.to_upper()] = 1 << i
