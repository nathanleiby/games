class_name Utils
#extends Node

# TODO: can it work without extends?

## Converts `offset` coordinates to a integer index.
static func xy_to_index(width: int, offset: Vector2) -> int:
    return int(offset.x + offset.y * width)

## Converts an integer index to `offset` coordinates.
static func index_to_xy(width: int, index: int) -> Vector2:
    return Vector2(index % width, index / width)
