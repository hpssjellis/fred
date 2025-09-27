









Generate a JSON object that strictly adheres to the provided schema to represent a 3D point cloud of a sitting dog with a curled tail.

The entire output must be a single, valid JSON block.

- The top-level object must contain a key named "pointCloudData".
- "pointCloudData" must contain an array named "points".
- "points" must contain exactly 200 JSON objects.
- Each point object must have the keys "x", "y", and "z".
- Coordinates must be floats between -5.0 and 5.0.

Schema Example:
{
  "pointCloudData": {
    "points": [
      {"x": 0.0, "y": 0.0, "z": 0.0},
      ...
    ]
  }
}

Begin the JSON output now.
