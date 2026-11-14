# Streak

App has ability to count how many days in row the user started rosary prayer.
Streak number should be displayed on home page in header.
To store streak IndexedDB with navigator.storage.persist() is used.
For every day that prayer was started we insert into DB string with format `${year}-${month}-${day}` with leading zeros, e.g. 2025-01-01
To get current date we use users local timezone.
Count a prayer day immediately when the first step (step 0) of a valid rosary prayer is opened. Completing the prayer is not required.
Opening or reloading later steps, including the finished page, does not count towards the streak.
Each local date counts only once, even if the first step is opened or reloaded multiple times that day.
If a prayer starts before midnight and continues into the next day, only the day on which step 0 was opened counts; later steps and completion do not add another day.


## Calender

On clicking streak icon there should be page that shows calendar with dates that prayer happened highlighted.  
The calendar should display current month by be scrollable vertically for future and past months.  
Week should start with Monday.  
