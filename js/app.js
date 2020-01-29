// navbar collapse after selecting sections

$(function () {
    $('.nav-item').on('click', function () {
        $('.navbar-collapse').toggleClass('show');
    });
});

/**
 * Fetch data from Twitch
 */

var chart;

var fetchFromTwitch = async function (params) {
    var clientId = 'clvtdybpoqus52j3cbksl0sswgwqhu';

    var result = await $.get({
        url: 'https://api.twitch.tv/helix' + params,
        headers: {
            'Client-ID': clientId
        }
    }).then(function (data) {
        return data;
    });

    return result;
};

/**
 * Render top games
 */

var renderTopGames = async function () {
    var topGames = await fetchFromTwitch('/games/top?first=10');

    var gameHtml = '';

    for (var i = 0; i < topGames.data.length; i++) {
        var topGame = topGames.data[i];
        if (i == 0 || i == 1) {
            gameHtml += '<div class="col-12 col-sm-12 col-md-6 col-lg-6 top-10"><img src="' + topGame.box_art_url.replace('{width}', '200').replace('{height}', '267') + '"> <div class="top-10-title">' + topGame.name + '</div></div>';
        } else {
            gameHtml += '<div class="col-12 col-sm-12 col-md-3 col-lg-3 top-10"><img src="' + topGame.box_art_url.replace('{width}', '200').replace('{height}', '267') + '"> <div class="top-10-title">' + topGame.name + '</div></div>';
        }
    }

    $('.js-top-games').html(gameHtml);
    $('#top-games .js-loading').hide();
};

/**
 * Render top current streams
 */

var renderTopCurrentStreams = async function () {
    var topStreams = await fetchFromTwitch('/streams?first=10');

    var streamHtml = '';

    for (var i = 0; i < topStreams.data.length; i++) {
        var topStream = topStreams.data[i];
        if (i == 0 || i == 1) {
            streamHtml += '<div class="col-12 col-sm-12 col-md-6 col-lg-6 top-10"><img src="' + topStream.thumbnail_url.replace('{width}', '220').replace('{height}', '124') + '"> <div class="top-10-title">' + topStream.user_name + ' <br /><div class="streamer-viewer">Viewes: ' + topStream.viewer_count + '</div></div></div>';
        } else {
            streamHtml += '<div class="col-12 col-sm-12 col-md-6 col-lg-3 top-10"><img src="' + topStream.thumbnail_url.replace('{width}', '220').replace('{height}', '124') + '"> <div class="top-10-title">' + topStream.user_name + ' <br /><div class="streamer-viewer">Views: ' + topStream.viewer_count + '</div></div></div>';
        }
    }

    $('.js-top-streams').html(streamHtml);
    $('#top-streamers .js-loading').hide();
};

/**
 * Render chart
 */

var renderChart = function (data, gameName) {

    var chartStreamers = [];
    var chartViewerCounts = [];
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        chartStreamers.push(item.user_name);
        chartViewerCounts.push(item.viewer_count);
    }

    var ctx = document.getElementById('myChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: chartStreamers,
            datasets: [{
                label: 'Top streamers of ' + gameName,
                backgroundColor: ['rgba(255, 0, 0, 0.2)', 'rgba(255, 132, 0, 0.2)', 'rgba(255, 229, 0, 0.2)', 'rgba(157, 255, 0, 0.2)', 'rgba(17, 255, 0, 0.2)', 'rgba(0, 255, 204, 0.2)', 'rgba(0, 187, 255, 0.2)', 'rgba(0, 43, 255, 0.2)', 'rgba(136, 0, 255, 0.2)', 'rgba(255, 0, 251, 0.2)'],
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                data: chartViewerCounts
            }]
        },

        // Configuration options go here
        options: {}
    });

    return chart;
};

/**
 * Render Analytics
 */

var renderAnalytics = async function () {
    var topGames = await fetchFromTwitch('/games/top?first=10');

    var html = '';

    for (var i = 0; i < topGames.data.length; i++) {
        var topGame = topGames.data[i];
        html += '<option value="' + topGame.id + '">' + topGame.name + '</option>';
    }

    $('.js-analytics-dropdown').html(html);

    $('.js-analytics-dropdown').on('change', async function () {
        var topStreams = await fetchFromTwitch('/streams?first=10&game_id=' + $(this).val());
        renderChart(topStreams.data, $('.js-analytics-dropdown option:selected').text());
    });

    var topStreams = await fetchFromTwitch('/streams?first=10&game_id=' + topGames.data[0].id);
    renderChart(topStreams.data, topGames.data[0].name);

    $('#analytics .js-loading').hide();
};

/**
 * Smooth scroling
 * FROM: https://www.w3schools.com/howto/howto_css_smooth_scroll.asp#section2
 */

var scroling = function () {
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
};

renderTopGames();
renderTopCurrentStreams();
renderAnalytics();
scroling();
