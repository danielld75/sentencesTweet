$(document).ready(function () {
    var tweetLink = "https://twitter.com/intent/tweet?text=";
    var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
    var prefix = "https://cors-anywhere.herokuapp.com/";
    $.ajaxSetup({cache: false});

    function getQuote() {
        $.getJSON(prefix + quoteUrl, createTweet);
    }

    function createTweet(input) {
        var data = input[0];
        var quoteText = $(data.content).text().trim();
        var quoteAuthor = data.title;
        if (!quoteAuthor.length) {
            quoteAuthor = "Unknown Author";
        }
        var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

        if (tweetText.length > 140) {
            getQuote();
        } else {
            var tweet = tweetLink + encodeURIComponent(tweetText);
            $('.quote').text(quoteText);
            $('.author').text("Author: " + quoteAuthor);
            $('.tweet').attr('href', tweet);
        }
    }

    getQuote();
    $('.trigger').click(getQuote);

});
