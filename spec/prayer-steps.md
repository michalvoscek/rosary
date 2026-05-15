# Prayer Steps

This is the single canonical definition of the rosary prayer flow. All components and pages refer to this structure.

## Total Steps: 78

```
0    Sign of the Cross
1    Apostles' Creed
2    Our Father
3-5  3 × Hail Mary
6    Glory Be

--- Decade 1 (steps 7–20) ---
7    Mystery 1 Announcement
8    Our Father
9-18 10 × Hail Mary
19   Glory Be
20   Fatima Prayer

--- Decade 2 (steps 21–34) ---
21   Mystery 2 Announcement
22   Our Father
23-32 10 × Hail Mary
33   Glory Be
34   Fatima Prayer

--- Decade 3 (steps 35–48) ---
35   Mystery 3 Announcement
36   Our Father
37-46 10 × Hail Mary
47   Glory Be
48   Fatima Prayer

--- Decade 4 (steps 49–62) ---
49   Mystery 4 Announcement
50   Our Father
51-60 10 × Hail Mary
61   Glory Be
62   Fatima Prayer

--- Decade 5 (steps 63–76) ---
63   Mystery 5 Announcement
64   Our Father
65-74 10 × Hail Mary
75   Glory Be
76   Fatima Prayer

77   Hail Holy Queen
```

## Decade Block Size

Each decade is a **14-step block**:
1. Mystery announcement
2. Our Father
3–12. 10 × Hail Mary
13. Glory Be
14. Fatima Prayer

## Decade Index Calculation

```ts
const currentDecade = Math.max(0, Math.min(4, Math.floor((step - 7) / 14)));
```

## Hail Mary Counting

Within a decade, Hail Mary steps show the count:  
**"Zdravas Mária (1/10)"** through **"Zdravas Mária (10/10)"**
