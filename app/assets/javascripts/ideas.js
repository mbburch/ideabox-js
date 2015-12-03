$(document).ready(function(){
  fetchIdeas()
  createIdea()
  deleteIdea()
  searchIdeas()
  thumbsUp()
  thumbsDown()
  editIdea()
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
    + "</p><div class='row buttons'>"
    + "<button id='delete-idea' class='btn-floating waves-effect waves-light lime darken-2'><i class='material-icons'>delete</i></button>"
    + "<button id='edit-idea' class='btn-floating waves-effect waves-light lime darken-2'><i class='material-icons'>create</i></button>"
    + "<button id='thumbs-up' class='btn-floating lime darken-2'><i class='material-icons' data-quality='"
    + idea.quality
    + "'>thumb_up</i></button>"
    + "<button id='thumbs-down' class='btn-floating lime darken-2'><i class='material-icons' data-quality='"
    + idea.quality
    + "'>thumb_down</i></button>"
    + "</div></div></div>"
  )
};

function truncateBody(body) {
  if (body.length > 100) {
    return body.replace(/^(.{100}[^\s]*).*/, "$1") + '...'
  } else {
    return body
  };
};

function createIdea() {
  $('#create-idea').on('click', function(event){
    event.preventDefault();
    var ideaParams = {
      idea: {
        title: $('#title').val(),
        body: $('#body').val()
      }
    };

    clearForm()

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

function clearForm(){
  $('#title').val('')
  $('#body').val('')
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

function thumbsUp() {
  $("#all-ideas").delegate("#thumbs-up", 'click', function () {
    var $idea = $(this).closest(".idea");
    var quality = event.target.dataset.quality;
    var updated = upQuality(quality);
    var ideaParams = {idea: { quality: updated }};

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + $idea.attr('data-id'),
      data: ideaParams,
      success: function(){
        fetchIdeas()
        console.log("Quality Updated!")
      },
      error: function(xhr){
        console.log(xhr.responseText)
      }
    });
  });
}

function upQuality(quality) {
  if (quality === "swill") {
    return "plausible";
  } else if (quality === "plausible") {
    return "genius";
  } else {
    return "swill";
  };
}

function thumbsDown() {
  $("#all-ideas").delegate("#thumbs-down", 'click', function () {
    var $idea = $(this).closest(".idea");
    var quality = event.target.dataset.quality;
    var updated = downQuality(quality);
    var ideaParams = {idea: { quality: updated }};

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + $idea.attr('data-id'),
      data: ideaParams,
      success: function(){
        fetchIdeas()
        console.log("Quality Updated!")
      },
      error: function(xhr){
        console.log(xhr.responseText)
      }
    });
  });
}

function downQuality(quality) {
  if (quality === "genius") {
    return "plausible";
  } else if (quality === "plausible") {
    return "swill";
  } else {
    return "swill";
  };
}

function editIdea() {
  $("all-ideas").delegate("#edit-idea", 'click', function () {
    var $idea = $(this).closest(".idea");
    console.log($idea)
  })
}