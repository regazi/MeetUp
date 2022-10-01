The Meet@ app is a react PWA designed to agregate local events for users.

FEATURE 1: Filter events by city.

SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.
Given user hasn’t searched for any city
When the user opens the app
Then the user should see a list of all upcoming events

SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
Given the main page is open
When user starts typing in the city textbox
Then the user should see a list of cities (suggestions) that match what they’ve typed

SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
Given the user was typing “Berlin” in the city textbox
And the list of suggested cities is showing
When the user selects a city (e.g., “Berlin, Germany”) from the list
Then their city should be changed to that city (i.e., “Berlin, Germany”)
And the user should receive a list of upcoming events in that city

FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS
As a user, I should be able to toggle the visibility of event details so that I can maximize the number of events that can fit on-screen and the speed at which I can sort through them.
Scenario 1: An event element is collapsed by default
Given
Event list component is in default state
When
The user opens list of events
Then
The individual event elements should be collapsed

Scenario 2: User can expand an event to see its details
Given
Event list component is in default state
When
The user selects an event
Then
The event element should expand to reveal event details
Scenario 3: User can collapse an event to hide its details
Given
An event is currently expanded/selected
When
The user deselects/clicks off the event
Then
The event element should collapse
FEATURE 3: SPECIFY NUMBER OF EVENTS
As a user, I should be able to select the number of events that will be displayed for me so that I can account for slow internet and limit information overload.
Scenario 1: When user hasn’t specified a number, 32 is the default number
Given
The user has not specified a number of results to display
When
The component mounts
Then
The component should display a max of 32 results
Scenario 2: User can change the number of events they want to see
Given
The user has specified a number of results to display
When
The component mounts/rerenders
Then
The component should display the specified number of results
FEATURE 4: USE THE APP WHEN OFFLINE
As a user, I should be able to view events offline so that I can double-check event dates/browse, without depending on an internet connection..
Scenario 1: Show cached data when there’s no internet connection
Given
The user's device is not connected to the internet but they have loaded the application before and have an account.
When
The app is opened
Then
The user should see their saved events and the last-loaded events from the events component
Scenario 2: Show error when user changes the settings (city, time range)
Given
The users device is not connected to the internet
When
The user tries to change a setting/profile information
Then
The app should not allow it and alert user to the lack of internet connection
FEATURE 5: DATA VISUALIZATION
As a user, I should be able to view metrics (in an easy-to-undertand form) on the number of events in each city so that I can more efficiently plan trips.
Scenario 1: Show a chart with the number of upcoming events in each city
Given
The user has enable geo-location or specified a target locality
When
The chart component is mounted
Then
The chart should display a graph of the number of and nature of events within a set time-frame
