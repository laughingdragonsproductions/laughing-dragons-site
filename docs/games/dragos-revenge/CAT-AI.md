# Rodent's Revenge Cat AI Recreation Guide

This document breaks down how to recreate the cat behavior from **Rodent's Revenge** in a modern game engine.

The best approach is to build the cats as **real-time grid-based enemies**, not turn-based enemies tied to player movement.

## 1. Cat Movement Is Real-Time

The mouse moves whenever the player presses a key.

The cats have their **own movement timer**.

Incorrect:

```text
player moves
→ cats move
```

Recommended:

```text
GAME LOOP

read player input
update mouse

for each cat:
    cat.timer += deltaTime

    if cat.timer >= cat.moveInterval:
        moveCat(cat)
        cat.timer -= cat.moveInterval
```

---

## 2. Cats Move in 8 Directions

The mouse moves in four directions:

```text
N
S
E
W
```

Cats can move in all eight neighboring directions:

```text
NW N NE
 W C E
SW S SE
```

Direction array:

```text
(-1,-1)   (0,-1)   (1,-1)
(-1, 0)             (1, 0)
(-1, 1)   (0, 1)   (1, 1)
```

---

## 3. Allow Diagonal Corner Cutting

This is one of the most important details.

Many modern pathfinding systems prevent diagonal movement when two orthogonal obstacles touch at a corner.

For a faithful recreation, **do not block that diagonal move merely because the two side tiles are blocked**.

Example:

```text
C █
█ .
```

The cat should still be allowed to move southeast into the open tile.

Your diagonal validation can simply be:

```text
if destinationTile is walkable:
    allow move
```

Do **not** require the horizontal and vertical side-neighbors to be clear.

---

## 4. Cats Cannot Pass Through Blocks

A cat can normally move onto:

- Empty floor
- The mouse's tile
- Other explicitly traversable floor tiles

A cat should not normally move onto:

- Movable blocks
- Immovable walls
- Outside the board

Example:

```text
function catCanEnter(x, y):

    if outsideBoard(x,y):
        return false

    tile = board[x][y]

    if tile == MOVABLE_BLOCK:
        return false

    if tile == WALL:
        return false

    return true
```

Cats do not push blocks themselves.

---

## 5. The Cat's Main Goal Is the Mouse

Each active cat should attempt to move along a shortest valid route toward the mouse.

Because the board is small and each movement step can be treated as equal cost, **breadth-first search (BFS)** is a good fit.

---

## 6. Treat Diagonal and Straight Steps as Equal Cost

Use:

```text
straight = 1
diagonal = 1
```

rather than:

```text
straight = 1
diagonal = 1.414
```

This creates the aggressive diagonal pursuit that fits Rodent's Revenge.

Example:

```text
Mouse
M . . .
. . . .
. . . .
. . . C
```

The cat can approach with three diagonal moves rather than six orthogonal moves.

---

## 7. Basic Pathfinding

Every time a cat's movement timer fires:

```text
path = findPath(cat.position, mouse.position)

if path exists:
    cat.position = path[1]
```

Recalculate often rather than giving the cat a long committed path.

---

## 8. Recalculate Frequently

Good times to recalculate include:

- Every cat movement tick
- Whenever the mouse changes squares
- Whenever a block moves
- Whenever a cat is pushed
- Whenever another relevant obstacle changes

For a small grid, recalculating every cat tick is usually inexpensive.

---

## 9. Suggested Cat AI

```text
function updateCat(cat, dt):

    if cat.state != ACTIVE:
        return

    cat.moveTimer += dt

    if cat.moveTimer < cat.moveInterval:
        return

    cat.moveTimer -= cat.moveInterval

    if isCatTrapped(cat):
        cat.state = TRAPPED
        return

    path = findPath8Way(cat.position, mouse.position)

    if path exists:
        next = path[1]

        if next == mouse.position:
            killMouse()
            return

        moveCat(cat, next)

    else:
        moveCatFallback(cat)
```

---

## 10. Fallback Behavior When No Path Exists

Use two basic modes:

```text
CHASE
WANDER
```

### CHASE

If the mouse can be reached:

```text
follow shortest path
```

### WANDER

If no route currently reaches the mouse, but the cat still has legal movement options:

```text
choose a random legal neighboring square
```

This keeps cats active instead of freezing whenever the mouse is temporarily unreachable.

---

## 11. Cat-vs-Cat Collision

A cat should not normally finish a move on another cat's square.

However, avoid treating other cats as permanent walls for the entire pathfinding system.

A useful approach:

1. Calculate the preferred route toward the mouse.
2. Check whether the preferred destination is occupied by another cat.
3. If occupied, try another good neighboring square.
4. If no alternative exists, wait for that movement tick.

This allows cats to swarm without stacking.

---

## 12. Choosing Between Equally Good Moves

Rank candidate squares by path distance to the mouse.

If several candidate moves are equally good, choose randomly among them.

```text
bestDistance = infinity
candidates = []

for direction in 8Directions:

    next = cat + direction

    if !catCanEnter(next):
        continue

    distance = pathDistance(next, mouse)

    if distance < bestDistance:
        bestDistance = distance
        candidates.clear()
        candidates.add(next)

    else if distance == bestDistance:
        candidates.add(next)

move random candidate
```

A little randomness prevents multiple cats from appearing perfectly synchronized.

---

## 13. Cat / Mouse Collision

Collision should be based on grid occupancy.

After a cat moves:

```text
if cat.x == mouse.x &&
   cat.y == mouse.y:

    mouseDies()
```

Also check after mouse movement:

```text
if mouse enters cat square:
    mouseDies()
```

---

## 14. Blocks Can Push Cats

A useful Rodent's Revenge behavior to reproduce is allowing the mouse to push a block into a cat when the cat has an empty tile behind it.

Example:

```text
M B C .
```

After pushing right:

```text
. M B C
```

Conceptually:

```text
Mouse → Block → Cat → Empty
```

becomes:

```text
Empty → Mouse → Block → Cat
```

This means block pushing should support a short chain reaction.

---

## 15. Do Not Push Cats Through Obstacles

Example:

```text
M B C █
```

The push should fail because the cat has nowhere to go.

Pseudo-logic:

```text
if target == BLOCK:

    beyondBlock = nextTile

    if beyondBlock == CAT:

        beyondCat = nextTile

        if beyondCat is empty:
            move cat
            move block
            move mouse

        else:
            movement fails
```

---

## 16. Trapped Cats

A trapped cat should stop hunting the player.

Check all eight neighboring directions:

```text
NW N NE
 W C E
SW S SE
```

If the cat has no legal movement square, it is trapped.

```text
cat.state = TRAPPED
```

Remember that diagonal openings count. A cat is not trapped if it can escape diagonally through an open destination square.

---

## 17. Cats Can Be Trapped as a Group

Adjacent cats may form a trapped cluster.

Example:

```text
████
█CC█
████
```

Both cats should count as trapped.

Instead of testing each cat independently, flood-fill touching cats into a cluster and inspect the cluster's outside boundary.

If none of the cats in the cluster can move to an external legal tile, the whole cluster is trapped.

Example:

```text
█████
█CCC█
█████
```

Trapped.

But:

```text
█████
█CCC.
█████
```

Not trapped.

---

## 18. Do Not Convert Individual Cats Immediately

When one cat is trapped but other cats remain active, the trapped cat should stay in its trapped state.

Example:

```text
Cat A = trapped
Cat B = active
Cat C = active
```

No cheese conversion yet.

When all current cats are trapped:

```text
Cat A = trapped
Cat B = trapped
Cat C = trapped
```

then convert them together:

```text
A → cheese
B → cheese
C → cheese
```

---

## 19. Recommended Cat States

Minimum state set:

```text
ACTIVE
TRAPPED
CHEESE
```

Optional more explicit version:

```text
ACTIVE
TRAPPED_WAITING
TRANSFORMING
CHEESE
```

Basic logic:

```text
for cat in cats:

    if cat is physically trapped:
        cat.state = TRAPPED
    else:
        cat.state = ACTIVE


if every living cat.state == TRAPPED:
    transformAllCatsToCheese()
```

---

## 20. A Cat Can Become Untrapped

Do not permanently mark a cat trapped.

If the player moves a surrounding block and creates an opening:

```text
TRAPPED → ACTIVE
```

Reevaluate trapping whenever:

- A block moves
- A cat moves
- A cat is pushed

Or simply reevaluate every update.

---

## 21. Trapped Cat Visual State

Useful visual states:

```text
ACTIVE
    animated moving cat

TRAPPED
    waiting / sitting / sleeping cat

CHEESE
    cheese tile
```

Keeping the trapped state visually distinct makes the puzzle state much easier to read.

---

## 22. Cat Speed

Treat exact timing as a tuning value rather than a hard historical constant.

A useful starting point:

```text
early levels:
0.70–0.80 seconds per tile

medium:
0.45–0.60 seconds per tile

hard:
0.25–0.40 seconds per tile
```

Then tune against the gameplay feel you want.

---

## 23. Keep Animation Speed Separate From AI Speed

Use separate values:

```text
catMoveInterval
catAnimationFrameInterval
```

Example:

```text
AI:
one square every 0.65 seconds

animation:
new sprite every 0.12 seconds
```

This prevents high-difficulty cats from animating unnaturally fast.

---

## 24. Additional Cat Spawning

If you recreate the original timer pressure, additional cats can appear as time progresses.

Example:

```text
spawnTimer

if spawnTimer >= nextCatThreshold:
    spawnAdditionalCat()
```

Newly spawned cats should count toward the all-cats-trapped condition.

---

## 25. Recommended BFS Pathfinder

```text
function findCatPath(start, goal):

    queue = [start]
    cameFrom[start] = NONE

    while queue not empty:

        current = queue.popFront()

        if current == goal:
            return reconstructPath()

        for dir in DIRECTIONS_8:

            neighbor = current + dir

            if outsideBoard(neighbor):
                continue

            if neighbor already visited:
                continue

            if neighbor != goal &&
               !catCanEnter(neighbor):
                continue

            # IMPORTANT:
            # no diagonal corner restriction

            cameFrom[neighbor] = current
            queue.pushBack(neighbor)

    return NO_PATH
```

---

## 26. Exact Neighbor Directions

```text
DIRECTIONS = [
    (-1,-1),
    ( 0,-1),
    ( 1,-1),

    (-1, 0),
    ( 1, 0),

    (-1, 1),
    ( 0, 1),
    ( 1, 1)
]
```

Then:

```text
function validCatNeighbor(x, y):

    if outsideMap(x,y):
        return false

    if tile[x][y] == BLOCK:
        return false

    if tile[x][y] == WALL:
        return false

    return true
```

Notice what is deliberately absent:

```text
if moving diagonally:
    check side tiles
```

Do not add that if you want diagonal corner squeezing.

---

## 27. Cat State Machine

```text
               ┌─────────────┐
               │   ACTIVE    │
               └──────┬──────┘
                      │
                physically trapped
                      │
                      ▼
               ┌─────────────┐
               │   TRAPPED   │
               └──────┬──────┘
                      │
       ┌──────────────┴──────────────┐
       │                             │
 opening appears             all cats trapped
       │                             │
       ▼                             ▼
    ACTIVE                    TRANSFORMING
                                     │
                                     ▼
                                   CHEESE
```

---

## 28. Recommended Frame Update Order

```text
1. READ INPUT

2. TRY MOUSE MOVEMENT
   - empty → move
   - block → attempt push
   - cat → mouse dies
   - trap → mouse dies
   - sinkhole → sinkhole behavior

3. UPDATE BOARD CHANGES

4. UPDATE EACH CAT TIMER

5. FOR EACH CAT WHOSE TIMER FIRED
   - determine state
   - if active, calculate target move
   - move
   - check mouse collision

6. RECHECK CAT TRAPPING

7. IF ALL CATS TRAPPED
   - transform all current cats into cheese

8. UPDATE CAT SPAWN CLOCK

9. UPDATE HAZARDS

10. RENDER
```

---

## 29. Recommended First-Pass Implementation

```text
function catTick(cat):

    if catIsTrapped(cat):
        cat.state = TRAPPED
        return

    cat.state = ACTIVE

    path = bfs8Way(
        cat.position,
        mouse.position,
        allowCornerCutting = true
    )

    if path exists:

        target = path[1]

        if target == mouse.position:
            killMouse()
            return

        if !occupiedByCat(target):
            cat.position = target

        else:
            target = chooseNextBestNeighbor(cat)

            if target exists:
                cat.position = target

    else:

        validMoves = get8WayValidMoves(cat)

        if validMoves not empty:
            cat.position = random(validMoves)
```

Global trap handling:

```text
function updateTrapStates():

    trappedCount = 0

    for cat in cats:

        if catIsTrappedOrInTrappedCluster(cat):
            cat.state = TRAPPED
            trappedCount++

        else:
            cat.state = ACTIVE

    if trappedCount == cats.count:
        convertAllCatsToCheese()
```

---

# Five Rules That Matter Most

If you only focus on five behaviors, make them these:

1. **Cats move on timers independent of player input.**
2. **Cats move in all eight directions.**
3. **Diagonal cats can squeeze between corner-touching blocks.**
4. **Trapped cats wait; they do not individually become cheese.**
5. **When every current cat is trapped, they all become cheese together.**

Those rules do most of the work in making the cat behavior feel like Rodent's Revenge rather than generic grid enemy AI.

---

# Sources / Reference Material

- Rodent's Revenge recreation discussion:
  https://groups.google.com/g/puzzlescript/c/bTU8OWEeK0o

- HonestGamers review mentioning diagonal cat movement:
  https://www.honestgamers.com/1431/pc/rodents-revenge/review.html

- Open-source Rodent's Revenge-inspired remake:
  https://github.com/pierreyoda/o2r

- Cat implementation in that remake:
  https://github.com/pierreyoda/o2r/blob/master/src/entities/Cat.cpp

- Pathfinder implementation:
  https://github.com/pierreyoda/o2r/blob/master/src/map/TiledMapPathfinder.cpp

- General game reference:
  https://en.wikipedia.org/wiki/Rodent%27s_Revenge

---

## Implementation Note

The original 1991 source code is not publicly established in the references above, so this guide separates strongly documented observable behavior from practical implementation choices intended to reproduce the original feel.
