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

renderTopGames();
 