extends Node2D

@export var blockScene: PackedScene

@onready var _ball := $Ball
@onready var _blocks := $Blocks
@onready var _timeLabel := $UI/TimeLabel
@onready var _gameOverVBox := $UI/VBoxContainer
@onready var _gameOverOverlay := $UI/GameOverOverlay

@onready var start_time := Time.get_ticks_msec()

# key game-play toggles
const SCROLL_RATE := 1.5
const SPAWN_RATE_S := 2.2
const force_multiplier := 150 # TODO: explore movement



const RIGHT_PX := 1152
const BOTTOM_PX := 648
const BLOCK_WIDTH := 256
const BLOCK_HEIGHT := 32
func _ready():
	# needed after restarting scene
	get_tree().paused = false
	
	$SpawnTimer.wait_time = SPAWN_RATE_S
	
func get_input():
	if Input.is_action_pressed("move_right"):
		_ball.apply_force(Vector2.RIGHT * force_multiplier)
	elif Input.is_action_pressed("move_left"):
		_ball.apply_force(Vector2.LEFT * force_multiplier)

func _process(delta):
	get_input()
	
	var seconds_elapsed_total := (Time.get_ticks_msec() - start_time) / 1000
	var minutes := seconds_elapsed_total / 60
	var seconds := seconds_elapsed_total % 60
	_timeLabel.text = "%d:%02d" % [minutes, seconds]

func _physics_process(delta):
	# Make blocks move up
	for child in _blocks.get_children():
		var block := child as Block
		block.position += Vector2.UP * SCROLL_RATE
		
		if block.position.y < -32:
			block.queue_free()
			# dealloc after it leaves screen .. does this happen anyway?
		
	# die if Ball is out of bounds (top, bottom)
	if _ball.position.y < 0 or _ball.position.y > BOTTOM_PX:
		gameOver()



func gameOver():
	_gameOverVBox.show()
	_gameOverOverlay.show()
	get_tree().paused = true	

func _on_spawn_timer_timeout():
	# spawn new blocks
	var newBlock := blockScene.instantiate()
	var randX := randi_range(0 + BLOCK_WIDTH / 2,RIGHT_PX - BLOCK_WIDTH /2 ) 
	newBlock.position = Vector2(randX, BOTTOM_PX + BLOCK_HEIGHT)
	
	_blocks.add_child(newBlock)
	


func _on_restart_button_pressed():
	get_tree().reload_current_scene()
	
