(function() {
    'use strict';
    const movies = [];

    const renderMovies = function() {
        $('#listings').empty();

        for (const movie of movies) {
            const $col = $('<div>').addClass('col s6');
            const $card = $('<div>').addClass('card hoverable');
            const $content = $('<div>').addClass('card-content center');
            const $title = $('<h6>').addClass('card-title truncate');

            $title.attr({
                'data-position': 'top',
                'data-tooltip': movie.title
            });

            $title.tooltip({
                delay: 50
            }).text(movie.title);

            const $poster = $('<img>').addClass('poster');

            $poster.attr({
                src: movie.poster,
                alt: `${movie.poster} Poster`
            });

            $content.append($title, $poster);
            $card.append($content);

            const $action = $('<div>').addClass('card-action center');
            const $plot = $('<a>');

            $plot.addClass('waves-effect waves-light btn modal-trigger');
            $plot.attr('href', `#${movie.id}`);
            $plot.text('Plot Synopsis');

            $action.append($plot);
            $card.append($action);

            const $modal = $('<div>').addClass('modal').attr('id', movie.id);
            const $modalContent = $('<div>').addClass('modal-content');
            const $modalHeader = $('<h4>').text(movie.title);
            const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
            const $modalText = $('<p>').text(movie.plot);

            $modalContent.append($modalHeader, $movieYear, $modalText);
            $modal.append($modalContent);

            $col.append($card, $modal);

            $('#listings').append($col);

            $('.modal-trigger').leanModal();
        }
    };

    document.getElementById("search-button").addEventListener('click', getMovies);

    function getMovies(evt) {
      evt.preventDefault();
      let formValue = document.getElementById('search').value;

      if (formValue === "") {//give a toast lol
        Materialize.toast('You gotta input some stuff man!', 4000);
      }
      else {//search for some movies!
        let searchURL = `http://www.omdbapi.com/?s=${formValue}&r=json`;
        return fetch(searchURL)
        .then(function(res){
          return res.json();
        })
        .then(function(res){
          let array = res['Search'];
          for (var i = 0; i < array.length; i++) {
            let newObj = {
              id: array[i].imdbID,
              poster: array[i].Poster,
              title: array[i].Title,
              year: array[i].Year
            }
            movies.push(newObj);
          }
          renderMovies();
          document.getElementById('form').reset();
          movies.splice(0, movies.length);
          console.log(movies);
        })
      }
    }

    // function getJsonFromRemote(url) {
    //     return fetch(url)
    //         .then(function(res) {
    //             return res.json();
    //         })
    //         .then(function(res) {
    //           console.log(res);
    //         })
    // }
})();
