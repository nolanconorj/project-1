$(document).ready(function() {

    $('#submit').on('click', function(event) {

        event.preventDefault();

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
            var albumPrice = json.results[randomNumber].collectionPrice;

            $('#itunes').append(artistName);
            $('#itunes').append(albumName);
            $('#itunes').append(songName);
            $('#itunes').append(songPrice);
            $('#itunes').append(albumPrice);

            $('#itunes').append('<audio controls autoplay> <source src="' + audioFile + '"type="audio/x-m4a"></audio>');

            $('#itunes').append('<img src="' + coverArt + '"alt="' + songName + ' Picture"/>');

            var weatherSearch = $('#location').val().trim();
            weatherSearch = 'Hoboken,us';

            var weatherQueryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + weatherSearch + '&units=imperial&mode=json&APPID=7c13bf011272646fc4a945352ad1a721';

            $.ajax({
                url: weatherQueryURL,
                method: 'GET'
            }).done(function(response) {
                console.log(response);
                var weatherIcon = response.weather[0].icon;
                var weatherPic = '<img src="http://openweathermap.org/img/w/' + weatherIcon + '.png"/>';
                $('#weather').append(weatherPic);

                var overCast = response.weather[0].description;
                var temp = response.main.temp;
                temp = Math.round(temp);
                $('#weather').append(overCast);
                $('#weather').append('<p>' + temp + '&#8457</p>');




            }); // end itunes ajax call

        }); // end weather ajax call

    }); // end on submit button click

}); // end document ready