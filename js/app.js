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

    $('.js-top-games').html(gameHtml)
         
};

/**
 * Render top current streams
 */

var renderTopCurrentStreams = async function() {
    var topStreams = await fetchFromTwitch('/streams?first=10');
    console.log(topStreams);
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
         
};

renderTopGames();
renderTopCurrentStreams();
 