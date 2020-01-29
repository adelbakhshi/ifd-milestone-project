
## Twitch Tops

This is a single page website displays the current ten most popular game channels and the top current live most viewed streamers on Twitch website. By selecting one of the top ten channels from the dropdown, the top current streamers of that channel will be displayed in the bar chat type. To produce the chart [Chart.js](https://www.chartjs.org/) is used which is a free open-source JavaScript library.

The deployed version can be viewed [here](https://adelbakhshi.github.io/ifd-milestone-project/).

### UX


The Twitch Tops is for users whit interest in gaming and the game streaming. Users can find out which games are more popular and find the top streamers of each game if they would like to follow them on Twitch.tv.


### User Stories

##### User story 1

 - As a user, I want to find out which games currently are the most
   popular ones in the Twitch network and find top streamers of the
   games.

 - This will help me to see the list of the top most viewed streamers and follow them on Twitch.


##### User story 2

 - As a brand owner I would like to find a list of top streamers with the number of views and subscribers.
 - This will help me to find the right streamer to sponsor and introduce my brand in their channel.

### Wireframes
Below is the wireframe I created in “**Balsamic Mockup 3**”. Except the Top 10 grids, the final result is the same as the sketch.

![Wireframe](https://github.com/adelbakhshi/ifd-milestone-project/blob/master/sketch/twitchtops.png?raw=true)

### Features
- **Loading**
To make sure when user open the website all the elements are loaded and in the correct position, 

- **Games**
The Games section is where the top current games channels are displayed by order. The live data is coming from the Twitch website and the channels or their order might change after each refresh.

- **Analytics**
In Analytics section, after selecting a game channel from dropdown, user can view the current top ten streamer of that channel in the bar chart. By hovering the mouse over each bar, the exact number of viewers will be shown.

- **Streamers**
The current top ten streamers of Twitch network (the thumbnail, the streamer ID and the number of views) are displayed by order in the Streamers section.

**- Navigation bar**
As user scroll the navigation bar remains to the top of the browser. It helps user to access any section without scrolling up or down. The smooth scrolling effect is added, so when user click on different section the scrolling is smooth rather than jumping to the selected section.


### Future Features

- Adding direct link to the channel, the streamer profile and the stream would help the user if they want to discover more about the channel, streamer and the live stream page on the Twitch website.

- Some of the Twitch API requires OAuth token which should be requested the token using backend programming languages such as PHP, Python and such. As this project only involves fronted skills only the public APIs from Twitch have been used. 

### Technologies Used

##### [Balsamic](https://balsamiq.com/)

- I used Balsamic Mockup 3 to create the wireframe.

##### [Visual Studio Code](https://code.visualstudio.com/)
- Visual Studio Code is used as my code editor.

##### HTML5
- HTML5 is used for structure and basic elements.

##### CSS3 - SASS
- I used CSS3 and SASS to add style to the structure and the elements.
- Node Js : I used Node Js to compile SASS files and the library I used is [node-sass](https://www.npmjs.com/package/node-sass) 

##### Bootstrap 4
- Bootstrap 4 is used for grid system

##### JavaScript
- ES5: I used JavaScript ES5 standards to write my JavaScript code
- The following JS libraries is used;
- jQuery: JQuery is used to simplify DOM manipulation
- chart.js: to create the bar chart
- Async/await: wait to receive whole data first and then show 

##### Git and GitHub
- Git is used for version control
- I used GitHub as a remote repository to store my project.


##### [Postman](https://www.getpostman.com/)
- I used Postman tool to test the APIs

### Testing

##### Testing user story 1

- Find the current top 10 games channels and to 10 current streamers on Twitch Network.
	- Open the website and the top 10 games channels are shown in the first section.
	- Click on the Streamers option on navigation. The page scrolls smoothly to the top 10 streamers section.


##### Testing user story 2
- User would like to find the top streamers of each game and compare the number of their views.

	- Click on Analytics on navigation bar. Select the game from the dropdown. The top 10 streamers will be shown by order in the bar chart. By holding mouse over each bar the exact number of views will be shown when hovered.


### Compatibility and Responsiveness

The cross-browser testing is done in  on Safari, Google Chrome, Mozilla Firefox, Microsoft Edge, Opera and it works as expected.

Google Chrome developer tool is used to test the responsiveness on the following devices size 
iPad / iPad Pro
iPhone 5/SE / iPhone X
iPhone 6/7/8 and Plus
Galaxy S5
Pixel 2 / Pixel 2 XL

**Known Issues**

- Sometimes the request to each APIs fails and requires to refresh the page. This could be improved

- The grids in the top 10 sections on the medium and large screens could be five column in two row to have a tidier look.


### Deployment

Visual Studio Code IDE is used as a code editor, Git is used for version control and GitHub as a remote repository. The site is hosted using Github Pages, uses the master branch.
The deployed website can be viewed [here](https://adelbakhshi.github.io/ifd-milestone-project/).

### Acknowledgements

- #### Code
- I used [this page](https://petetasker.com/using-async-await-jquerys-ajax/)  as a guid to use Async/Await function : 

- .destroy(): There was an issue with the chart that was holding the data from the previous selected option and mixing it with the next selection’s data. I found the solution for that [here](https://stackoverflow.com/questions/24785713/chart-js-load-totally-new-data) , by using ***.destroy()*** the old data will be wiped out to load new dataset 


