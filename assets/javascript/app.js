$(document).ready(function() {

    

    $('#submit').on('click', function(event) {

        event.preventDefault();

        $('html,body').animate({
        scrollTop: $("#second").offset().top},
        'slow');

        var bandSearch = $('#bandName').val().trim();
        var bandQueryURL = "https:itunes.apple.com/search?term=" + bandSearch + "&limit=100";
        var json;

        $.ajax({
            url: bandQueryURL,
            method: "GET"
        }).done(function(response) {
            json = JSON.parse(response);
            console.log(json);

            var randomNumber = Math.floor((Math.random() * 100) + 1);

            var artistName = json.results[randomNumber].artistName;
            var albumName = json.results[randomNumber].collectionName;
            var songName = json.results[randomNumber].trackName;
            var coverArt = json.results[randomNumber].artworkUrl100;
            var audioFile = json.results[randomNumber].previewUrl;
            var songPrice = json.results[randomNumber].trackPrice;
            if (songPrice == '-1'){
                songPrice = 'Album Only';
            }
            var albumPrice = json.results[randomNumber].collectionPrice;

            $('#itunes').append('<tr><td>' + artistName + '</td><td>' + songName + '</td><td><img src="' + coverArt + '"alt="' + songName + ' Picture"/><td>' + albumName + '</td><td>' + songPrice + '</td><td>' + albumPrice + '</td><td><audio controls> <source src="' + audioFile + '"type="audio/x-m4a"></audio></td></tr>');

            var weatherSearch = $('#location').val().trim();

            var weatherQueryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + weatherSearch + '&units=imperial&mode=json&APPID=7c13bf011272646fc4a945352ad1a721';

            $.ajax({
                url: weatherQueryURL,
                method: 'GET'
            }).done(function(response) {
                console.log(response);
                var weatherIcon = response.weather[0].icon;
                var weatherPic = '<img height="75px" width="75px" src="http://openweathermap.org/img/w/' + weatherIcon + '.png"/>';
                var overCast = response.weather[0].description;
                var temp = response.main.temp;
                temp = Math.round(temp);

                $('#weather').html('<div class="col-md-6"><img height="100px" width="100px" src="http://openweathermap.org/img/w/' + weatherIcon + '.png"/></div><p class="weather-size"><strong>' + temp + '&#8457</strong></p><p class="weather-size">' + overCast + '</p></div>');

            }); // end itunes ajax call

        }); // end weather ajax call

    }); // end on submit button click

}); // end document ready