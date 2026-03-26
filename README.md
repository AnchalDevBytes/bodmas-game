# BODMAS Bus Jam - Math Game

### Concept

This is an interactive math game designed to teach the **BODMAS/PEMDAS** priority rules. Using the visual interpretation of a "Bus Jam," operations act as passengers. The "BODMAS Bus" only accepts the passenger (operation) that has the highest mathematical priority.

### Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6)
- **Backend:** PHP (Handles score processing logic)

### Logic Implementation

The game uses a `priority` object in JavaScript to assign weights to operations:

- Division (/) : 4
- Multiplication (\*) : 3
- Addition (+) : 2
- Subtraction (-) : 1

The game dynamically generates equations and validates the user's click against the highest available weight in the current mathematical expression.
