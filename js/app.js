/**
 * Fetch data from Twitch
 */

var fetchFromTwitch = async function(params) {
    var clientId = 'clvtdybpoqus52j3cbksl0sswgwqhu';

    var result = await $.get({
        url: 'https://api.twitch.tv/helix'+params,
        headers: { 
            'Client-ID': clientId 
        }
    }).then(function(data) {
        return data;
    });

    return result;
};

/**
 * Render top games
 */

var renderTopGames = async function() {
    var topGames = await fetchFromTwitch('/games/top?first=10');

    var gameHtml = '';

    for (var i = 0; i < topGames.data.length; i++) {
        var topGame = topGames.data[i];
        if (i == 0 || i == 1) {
            gameHtml += '<div class="col-6 col-sm-6 col-md-6 col-lg-6"><img src="'+topGame.box_art_url.replace('{width}', '285').replace('{height}', '380')+'">'+topGame.name+'</div>';
        } else {
            gameHtml += '<div class="col-6 col-sm-6 col-md-3 col-lg-3"><img src="'+topGame.box_art_url.replace('{width}', '285').replace('{height}', '380')+'">'+topGame.name+'</div>';
        }
    }

    $('.js-top-games').html(gameHtml);
    $('#top-games .js-loading').hide();
};

/**
 * Render top current streams
 */

var renderTopCurrentStreams = async function() {
    var topStreams = await fetchFromTwitch('/streams?first=10');

    var streamHtml = '';

    for (var i = 0; i < topStreams.data.length; i++) {
        var topStream = topStreams.data[i];
        if (i == 0 || i == 1) {
            streamHtml += '<div class="col-6 col-sm-6 col-md-6 col-lg-6"><img src="'+topStream.thumbnail_url.replace('{width}', '440').replace('{height}', '248')+'">'+topStream.user_name+' - '+topStream.viewer_count+'</div>';
        } else {
            streamHtml += '<div class="col-6 col-sm-6 col-md-3 col-lg-3"><img src="'+topStream.thumbnail_url.replace('{width}', '440').replace('{height}', '248')+'">'+topStream.user_name+' - '+topStream.viewer_count+'</div>';
        }
    }

    $('.js-top-streams').html(streamHtml)
    $('#top-streamers .js-loading').hide();
};

/**
 * Render chart
 */

var renderChart = function(data, gameName) {

    var chartStreamers = [];
    var chartViewerCounts = [];
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        chartStreamers.push(item.user_name);
        chartViewerCounts.push(item.viewer_count);
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: chartStreamers,
            datasets: [{
                label: 'Top streamers of '+gameName,
                // backgroundColor: ['red', 'blue'],
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
}

/**
 * Render Analytics
 */

var renderAnalytics = async function() {
    var topGames = await fetchFromTwitch('/games/top?first=10');
        
    var html = '';
    
    for (var i = 0; i < topGames.data.length; i++) {
        var topGame = topGames.data[i];
        html += '<option value="'+topGame.id+'">'+topGame.name+'</option>';
    }
    
    $('.js-analytics-dropdown').html(html);
    
    $('.js-analytics-dropdown').on('change', async function() {
        var topStreams = await fetchFromTwitch('/streams?first=10&game_id='+$(this).val());
        renderChart(topStreams.data, $('.js-analytics-dropdown option:selected').text());
    });
    
    var topStreams = await fetchFromTwitch('/streams?first=10&game_id='+topGames.data[0].id);
    renderChart(topStreams.data, topGames.data[0].name);

    $('#analytics .js-loading').hide();
};

renderTopGames();
renderTopCurrentStreams();
renderAnalytics();
 