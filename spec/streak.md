# Streak

App has ability to count how many days in row did user finish rosary prayer.
Streak number should be displayed on home page in header.
To store streak IndexedDB with navigator.storage.persist() is used.
For every day that prayer was made we insert into DB string with format `${year}-${month}-${day}` with leading zeros, e.g. 2025-01-01
To get current date we use users local timezone.
In case prayer is started on one day ind finished on another use day of the start to track streak (not date of prayer finish).
If someone just opened prayer on link for page different than first one and did not finish whole prayer do not count it towards streak.


## Calender

On clicking streak icon there should be page that shows calendar with dates that prayer happened highlighted.  
The calendar should display current month by be scrollable vertically for future and past months.  
Week should start with Monday.  
