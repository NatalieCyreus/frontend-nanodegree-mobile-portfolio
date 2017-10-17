# Website Performance Optimization portfolio project

I have optimized this online portfolio for speed! In particular, optimized the critical rendering path and made this page render as quickly as possible by applying the techniques I've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884) by Udacity.


## How to view the page and pagespeed

1. Download the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder/dist
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit [localhost:8080](http://localhost:8080/)
1. Make your local server accessible remotely, in a new tab in the console write: 

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) 


## Part 1: Optimize PageSpeed Insights score for index.html

I have optimized index.html to achieves a PageSpeed score of at least 90 for Mobile and Desktop.

Optimizations Found by [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

- Avoid landing page redirects
- Eliminate render-blocking JavaScript and CSS in above-the-fold content
- Optimize images
- Minify CSS
- Minify JavaScript
- Prioritize visible content



## Part 2: Optimize Frames per Second in pizza.html

#### 1. I have optimized views/pizza.html, by modifying views/js/main.js until frames per second rate is 60 fps or higher when scrolling. 

- In the console you can view the average time to generate last 10 frames.

- I made changes to the function `updatePositions()` that moves the sliding background pizzas based on scroll position. The variable `scrollTop` was declared and given a value inside a `for` loop. I moved out `scrollTop` from the `for` loop. 

		  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	  
		  for (var i = 0; i < items.length; i++) {
		  var phase = Math.sin((scrollTop / 1250) + (i % 5));
		  items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
		}
		
- I added `transform: translateZ(0);` and `backface-visibility: hidden;` to `.move` in `src/views/css/style.css `


#### 2. I have optimized the time to resize pizzas to less than 5 ms, using the pizza size slider on the views/pizza.html page. 

- Resize time is shown in the browser developer tools.
 
 
To change the pizza slices size it used the function `resizePizzas` with 3 function inside to change the size: 

1. `changeSliderLabel(size)`
2. `determineDx (elem, size)`
3. `changePizzaSizes(size)`


I removed `determineDx` and added the needed functionalities to `changePizzaSizes`.   

 
-  `changePizzaSizes(size)` iterated through pizza elements on the page and changes their widths. It did so by calling `determineDx`. 
 
-  `determineDx` 
	-  	used a switch statement, `sizeSwitcher` to change the slider value to a percent width together with some calculations inside the `determineDx`.
	- The function returned `var dx`. Wich was a calculation of the variables `newSize` - `oldSize` * `windowWidth`. 
	- It was basicly doing a lot of unnessesary calculations and returning a value from the swich statement that would easily be calculated directly inside the `changePizzaSizes`.

-  The `changePizzaSizes` had a `for` loop that declared a new `dx` variable with the value of the function `determineDx` (that returned a second `var dx`)
-  The functions made a lot of unuseful calculations that wasn't used in the end, or unnessesary to solve the final calculation. 

		  function changePizzaSizes(size) {
    	for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
	      var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
	      var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
	      document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
	    }
	  	}
	  	
	- The swich statement was removed from `determineDx` and into `changePizzaSizes`. 
	- The `for` loop that itterated `document.querySelectorAll(".randomPizzaContainer").length` inside the `for` loop in each new variable declaration was moved into one variable outside of the `for` loop: 

			var randomPizza = document.querySelectorAll(".randomPizzaContainer");
		    for (var i = 0; i < randomPizza.length; i++) {
		      randomPizza[i].style.width = newwidth + '%';
		    }

- I removed the `div id="pizza0"` and `div id="pizza1"` from the `pizza.html` document. Because they had not the same diemensions as the `pizzaElementGenerator` instances. And instead of changing the diemensions on those 2 divs, I removed them and created 2 new instanses of the `pizzaElementGenerator` class, by changing the for loop to count from 0 instead of 2. This also decreased the length of the `pizza.html`. 


		for (var i = 0; i < 100; i++) {
			var pizzasDiv = document.getElementById("randomPizzas");
			pizzasDiv.appendChild(pizzaElementGenerator(i));
		}
 
I changed the number of background pizzas to at least 24 (3 full lines of 8 background pizzas). I dynamically calculate the number of pizzas needed to fill the screen, based on browser window resolution.

I calculated the number of rows using the height property of the screen divided by `s`, and then multiply `row` * `cols`.
I declared a new `iHeight` and `row` and `rows` to calculate. Then I declared `elem` before the for loop instead of inside it. 	
var iHeight = window.screen.height;
	var row = iHeight/s;
	var rows = row * cols;
	var elem;

	window.addEventListener('scroll', updatePositions);
	
	// Generates the sliding pizzas when the page loads.
	document.addEventListener('DOMContentLoaded', function() {
		var cols = 8;
		var s = 256;
		var iHeight = window.screen.height;
		var row = iHeight/s;
		var rows = row * cols;
		var elem;
		var movingPizzas = document.getElementById('movingPizzas1');
		for (var i = 0; i < rows; i++) {
			elem = document.createElement('img');
			elem.className = 'mover';
			elem.src = "images/pizza.png";
			elem.style.height = "100px";
			elem.style.width = "73.333px";
			elem.basicLeft = (i % cols) * s;
			elem.style.top = (Math.floor(i / cols) * s) + 'px';
			movingPizzas.appendChild(elem);
		}
		updatePositions();
	});



### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `views/css/bootstrap-grid.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Web Tooling and Automation
Gulp was used to automatically perform optimizations. Images were optimized and JS, CSS and HTML were minified. The gulp packages can be found in `src/node_modules`. 

#### To run gulp 
If you make any changes in `src`, run gulp to save those changes to the `dist` files. The `gulp` command leads to a function in `gulpfile.js` that involves all the functions to minify the `src` files to the `dist`   
 
Make sure you have Node.js and npm installed on your computer. 

- Follow the steps on this site to download or view if its already installed [www.npmjs.com/get-npm](https://www.npmjs.com/get-npm?utm_source=house&utm_medium=homepage&utm_campaign=free%20orgs&utm_term=Install%20npm)
- When you have all instalations needed, in the terminal write: 

  ```bash
  $> cd /path/to/your-project-folder/src
  $> gulp
  ```

 