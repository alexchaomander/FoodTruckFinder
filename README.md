Inspired by the Uber Coding Challenge, this web app provides a way to find nearby food trucks in San Francisco. 

The app is hosted on Github Pages [here](http://alexchao56.github.io/FoodTruckFinder/).

*Note: Because of strange behavior from the Google Maps API, markers may not load on the first access of the page. If so, please refresh the page. If problems persist, you can run it locally by first cloning this repository and running:*

`python -m SimpleHTTPServer 8080` and going to `localhost:8080`

**Functionality**

A user can do a general browse through the map selecting filters such as food categories or distance to help narrow their search. They can also input their location to visually see what food trucks are nearby to them. On-click of a food truck marker, it pulls up the name, the address, and the main type of food the truck is selling. 

**Technology**

Making use of the Google Maps API, the app was built primarily with HTML, CSS, and Javascript in particular jQuery. It is a static, single web page app that uses data available on [DataSF](http://www.datasf.org/): [Food
Trucks](https://data.sfgov.org/Permitting/Mobile-Food-Facility-Permit/rqzj-sfat). Since the data is not too large, and does not require the infrastructure of a database to manage (although one can be easily set up for this), I opted to save the data in a CSV format.

Data processing, especially food category generation was handled using R, a tool I'm most comfotable with to handle data manipulation tasks. Because of the limitations of the dataset, there could definitely have been more features like additional filters and reviews shown.

![alt tag](https://raw.githubusercontent.com/alexchao56/FoodTruckFinder/master/images/screenshot.png)


*Note for the reader:*

While my primariy interests are in data science and data engineering, one of the key aspects of those roles is the ability to be able to tell a story with the data. This can involve creating visualizations and tools that can help communicate whatever data is provided. Thus, even though web development and frontend work are not my main forte (I've actually only dabbled in these technologies in the past year so am still quite fresh!), they are skills worth having and developing and I'm glad I was able to showcase some of them through this app. 
