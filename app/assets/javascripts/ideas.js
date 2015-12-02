$(document).ready(function(){
  fetchIdeas()
  createIdea()
  deleteIdea()
  searchIdeas()
});

function fetchIdeas(){
  var newestIdeaID = parseInt($('.idea').last().attr('data-id'))

  $.ajax({
    type: 'GET',
    url:  '/api/v1/ideas',
    success: function(response){
      $.each(response, function(index, idea){
        if (isNaN(newestIdeaID) || idea.id > newestIdeaID){
          renderIdea(idea)
        }
      });
    }
  });
};

function renderIdea(idea){
  $('#all-ideas').prepend(
    "<div class='idea card grey darken-1' data-id='"
    + idea.id
    + "'>"
    + "<div class='card-content white-text'>"
    + "<span class='card-title center'>"
    + idea.title
    + "</span><p class='idea-body'>"
    + truncateBody(idea.body)
    + "</p><p class='idea-quality'><strong>Quality:</strong> "
    + idea.quality
    + "</p><div class='buttons'>"
    + "<button id='delete-idea' class='btn-floating waves-effect waves-light lime darken-2 left'><i class='material-icons'>delete</i>/button>"
    + "<button id='thumbs-up' class='btn-floating lime darken-2'><i class='material-icons'>thumb_up</i></button>"
    + "<button id='thumbs-down' class='btn-floating lime darken-2'><i class='material-icons'>thumb_down</i></button>"
    + "</div></div></div>"
  )
};

function truncateBody(body) {
  if (body.length > 100) {
    return body.slice(0, 100) + '...'
  } else {
    return body
  };
};

function createIdea() {
  $('#create-idea').on('click', function(event){
    event.preventDefault();
    var ideaTitle  = $('#title').val();
    var ideaBody   = $('#body').val();
    var ideaParams = {
      idea: {
        title: ideaTitle,
        body: ideaBody
      }
    };

    $('#title').val('')
    $('#body').val('')

    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas',
      data: ideaParams,
      success: function(idea){
        fetchIdeas()
      },
      error: function(idea){
        console.log('Does your idea have a title and body?')
      }
    });
  });
};

function deleteIdea(){
  $('#all-ideas').delegate('#delete-idea', 'click', function(){
    var $idea = $(this).closest('.idea');
    $.ajax({
      type: 'DELETE',
      url: '/api/v1/ideas/' + $idea.attr('data-id'),
      success: function(){
        $idea.remove()
      },
      error: function(){
        $idea.remove()
        console.log('Idea was already deleted.')
      }
    });
  });
};

function searchIdeas() {
  $('#search').keyup(function(){
    var searchFor = $('#search').val().toLowerCase();

    $('.idea').each(function(index, idea) {
      var title = $(idea).find('.card-title').text().toLowerCase();
      var body  = $(idea).find('.idea-body').text().toLowerCase();
      var match = (title + body).indexOf(searchFor) !== -1;
      $(idea).toggle(match);
    });
  });
};
