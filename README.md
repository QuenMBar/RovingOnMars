# PROJECT 2

## Project Requirements

Build a React single page application from scratch
Apply your knowledge of components, props and state management
Incorporate client-side routing
Use data from external APIs
Persist data in a mock up backend

Project needs

1. React app with multiple pages or renders
2. Api
3. db.json

## User Stories

### Mars rover app

- The user should be able to chose between multiple tabs with different rovers on it
- The user should be able to, on each tab, filter between cameras and dates
- The user should be able to see the location of photo
- The user should be able to favorite photos and they'll go on home page

### Stretch

- The user should be able to see the photo of the day on home page
- The user should be able to see notifications of upcoming events
- The user should be able to the weather at rover
- The user should be able to see how close near earth objects will be for the next several days

## Wire Frame

![mockUp](./assets/WireFrame%20Poject%202.jpg)

## APIS

| Api                   | Example                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Mars Rover Photos     | https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY                  |
| APOD                  | https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY                                                       |
| DONKI                 | https://api.nasa.gov/DONKI/notifications?startDate=2014-05-01&endDate=2014-05-08&type=all&api_key=DEMO_KEY |
| Asteroids - NeoWs     | https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY           |
| InSight: Mars Weather | https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0                               |

## JSON Server

Using an json server to persist the favorites of users between refreshes
