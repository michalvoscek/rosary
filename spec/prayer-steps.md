# Prayer Steps

This is the single canonical definition of the rosary prayer flow. All components and pages refer to this structure.

## Total Steps: 73

```
--- Start (steps 0–6) ---
0    Sign of the Cross
1    Apostles' Creed
2    Our Father
3–5  3 × Hail Mary
6    Glory Be

--- Decade 1 (steps 7–19) ---
7    Our Father + Mystery 1
8–17 10 × Hail Mary
18   Glory Be
19   Fatima Prayer

--- Decade 2 (steps 20–32) ---
20   Our Father + Mystery 2
21–30 10 × Hail Mary
31   Glory Be
32   Fatima Prayer

--- Decade 3 (steps 33–45) ---
33   Our Father + Mystery 3
34–43 10 × Hail Mary
44   Glory Be
45   Fatima Prayer

--- Decade 4 (steps 46–58) ---
46   Our Father + Mystery 4
47–56 10 × Hail Mary
57   Glory Be
58   Fatima Prayer

--- Decade 5 (steps 59–71) ---
59   Our Father + Mystery 5
60–69 10 × Hail Mary
70   Glory Be
71   Fatima Prayer

72   Hail Holy Queen
```

## Decade Block Size

Each decade is a **13-step block**:
1. Our Father + Mystery announcement
2–11. 10 × Hail Mary
12. Glory Be
13. Fatima Prayer

## Decade Index Calculation

```ts
const currentDecade = Math.max(0, Math.min(4, Math.floor((step - 7) / 13)));
```

## Hail Mary Counting

Within a decade, Hail Mary steps show the count:  
**"Zdravas Mária (1/10)"** through **"Zdravas Mária (10/10)"**

## Switching cards

Every prayer is inside card. Moving to next the card can be done by swiping up or down on mobile devices. When user swipes, card should follow his finger. After releasing card, if:
 - threshold was not crossed: card should move back to its original position
 - threshold was crossed: card should move at constant speed in direction that threshold was crossed causing switch. Swipe up brings next card. Swipe down brings previous card.
Speed of card after release is constant called SPEED_AFTER_RELEASE defined in pixels per second in code
On the desktop it is sufficient to use single scroll step to swap card. But multiple scrolls in row are grouped into single switch animation. The speed of the card after scroll is also defined by the SPEED_AFTER_RELEASE constant. Scroll down goes to next card and scroll up to previous card.
During animation the next card should be comming from bottom at constant distance from the previous, and previous card should come from top also at constant distance from outgoing card. Speed of incoming card should always equal to the speed of the original card.
Top of incomming card should be at "scrolling area height" distance from top of outgoing car
Switching animation should be smooth and should adapt to device maximum refresh rate e.g. 120Hz display should have animation in 120 FPS.
