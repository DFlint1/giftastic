// Initial array of crazy weather
        var weathers = ["tornadoes", "hurricane weather", "Tsunamis", "Lightning", "Hail Storms", "Firenadoes", "Dust Devils", "Electrical Storms", "Droughts", "Freezing Rain", "F5 tornadoes", "Blizzards"];

        // displayWeatherInfo function re-renders the HTML to display the appropriate content
        function displayWeatherInfo() {

            var weather = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + weather + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";
            // console.log(queryURL);

            // Creating an AJAX call for the specific weather button being clicked
            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                .done(function(response) {
                    // console.log(response);
                    for (var i = 0; i < response.data.length; i++) {

                        // Creating a div to hold the weather
                        var weatherDiv = $("<div class='weather'>");

                        // Storing the rating data
                        // var rating = response.Rated;
                        var rating = response.data[i].rating;

                        // Creating an element to have the rating displayed
                        var pOne = $("<p>").text("Rating: " + rating);

                        // Displaying the rating
                        weatherDiv.append(pOne);


                        // Retrieving the URL for the image
                        var weatherImage = response.data[i].images.fixed_height.url;

                        // Creating an element to hold the image
                        var weatherImage = $('<img>').attr('src', weatherImage);

                        // Appending the image
                        weatherDiv.append(weatherImage);

                        // Putting the entire weather above the previous weather
                        $("#weathers-view").prepend(weatherDiv);
                    }
                })

        }

        // Function for displaying weather data
        function renderButtons() {

            // Deleting the weather prior to adding new weather
            // (this is necessary otherwise you will have repeat buttons)
            $("#buttons-view").empty();

            // Looping through the array of weather
            for (var i = 0; i < weathers.length; i++) {

                // Then dynamicaly generating buttons for each weather in the array
                // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                var a = $("<button>");
                // Adding a class of weather to our button
                a.addClass("weather");
                // Adding a data-attribute
                var noSpace = weathers[i].replace(/\s+/g, '+').toLowerCase();
                a.attr("data-name", noSpace);

                // Providing the initial button text
                a.text(weathers[i]);
                // Adding the button to the buttons-view div
                $("#buttons-view").append(a);
            }
        }

        // This function handles events where a weather button is clicked
        $("#add-weather").on("click", function(event) {
            event.preventDefault();
            // This line grabs the input from the textbox
            var weather = $("#weather-input").val().trim();

            // Adding movie from the textbox to our array
            weathers.push(weather);

            // Calling renderButtons which handles the processing of our weather array
            renderButtons();
        });

        // Adding a click event listener to all elements with a class of "weather"
        $(document).on("click", ".weather", displayWeatherInfo);{
            $("img").animate({
                // height: '+=5px',
                // width:  '+=5px',
            })
        }
        // =============================================
  //       // Adding a function to pause gifs from giphy
  //       $("img").on("click", function() {

  //        var state === $(this).data("weatherImage");
  //        }
                    
  //         if (state==='still') {
  //           $(this).attr("src", "data-animate")
  //           state.attr('animate');

  //         else
  //           $(this).attr("src", "data-state")
  //           state.attr('still');

  // }



        // Calling the renderButtons function to display the intial buttons
        renderButtons();
      
  
