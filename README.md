# My Places React App

This is a React-based single page app (CREATE-REACT-APP) which allows the user to select spots on a map and add & edit the following information for the selected map location:

- title
- description
- information whether the selected location is open or closed

The app uses [**Google Maps API**](https://www.npmjs.com/package/@react-google-maps/api) for the map implementation and it also uses the [**Google Maps Geocoding API**](https://www.npmjs.com/package/react-geocode) to resolve address information for the selected map location, assuming that such data is available. If the user chooses a location that doesn't have any address information available based on the location coordinates (e.g. a spot in the water), the app won't allow the user to create a marker for that location.


The saved locations are shown in the map view as markers and the app also has a list view, where the user can view the details of all saved places. The user can also edit the data of the saved places and remove any of the saved places in the list view.

The data is persisted in the browser's local storage.

All React components in the app are custom made and the styling of these components is made with plain CSS.

The color theme for the app is created using the Coolors color theme generator. You can check the theme here: [**https://coolors.co/0d1321-7b6d8d-c9e4ca-87bba2-40531b**](https://coolors.co/0d1321-7b6d8d-c9e4ca-87bba2-40531b)


## Running the project

You need to have the **Node.js** runtime in order to run the app in development mode on your local machine. Just run the the following script to launch the server:

```npm start```

Open [**http://localhost:3000**](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## Deployment

The app is deployed to **Heroku** from the main branch. The deployment will be done automatically whenever the Git repository is updated. You can find the app here: [**https://myplaces2022.herokuapp.com/**](https://myplaces2022.herokuapp.com/)

