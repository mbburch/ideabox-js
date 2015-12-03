$(document).ready(function(){
  fetchIdeas();
  createIdea();
  searchIdeas();
  deleteIdea();
  thumbsUp();
  thumbsDown();
  editTitle();
  editBody();
});

function fetchIdeas(){
  $.ajax({
    type: 'GET',
    url:  '/api/v1/ideas',
    success: function(ideas){
      $.each(ideas, function(index, idea){
        renderIdea(idea)
      })
    }
  });
}

function renderIdea(idea){
  $('#all-ideas').prepend(
    "<div class='idea card grey darken-1' data-id='"
    + idea.id
    + "'>"
    + "<div class='card-content white-text center'>"
    + "<span contenteditable='true' class='card-title'>"
    + idea.title
    + "</span><p contenteditable='true' class='idea-body'>"
    + truncateBody(idea.body)
    + "</p><br><p class='idea-quality left'><strong>Quality:</strong> "
    + idea.quality
    + "</p><br><div class='row buttons'>"
    + "<button id='thumbs-up' class='btn-floating waves-effect waves-light left'><i class='material-icons' data-quality='"
    + idea.quality
    + "'>thumb_up</i></button>"
    + "<button id='thumbs-down' class='btn-floating waves-effect waves-light left'><i class='material-icons' data-quality='"
    + idea.quality
    + "'>thumb_down</i></button>"
    + "<button id='delete-idea' class='btn-floating waves-effect waves-light red darken-4 right'><i class='material-icons'>delete</i></button>"
    + "</div></div></div>"
  )
}

function truncateBody(body) {
  if (body.length > 100) {
    return body.replace(/^(.{100}[^\s]*).*/, '$1') + '...'
  } else {
    return body
  };
}

function createIdea() {
  $('#create-idea').on('click', function(event){
    event.preventDefault();
    var ideaParams = {
      idea: {
        title: $('#title').val(),
        body: $('#body').val()
      }
    };

    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas',
      data: ideaParams,
      success: function(idea){
        renderIdea(idea)
        clearForm()
      },
      error: function(idea){
        console.log('Does your idea have a title and body?')
      }
    });
  });
}

function clearForm(){
  $('#title').val('')
  $('#body').val('')
}

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
}

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
}

function thumbsUp() {
  $('#all-ideas').delegate('#thumbs-up', 'click', function () {
    var $idea = $(this).closest('.idea');
    var quality = event.target.dataset.quality;
    var ideaParams = {idea: { quality: upQuality(quality) }};

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + $idea.attr('data-id'),
      data: ideaParams,
      success: function(){
        $idea.find('.idea-quality').text('Quality: ' + ideaParams.idea.quality);
        $idea.attr('data-quality', ideaParams.idea.quality)
      },
      error: function(xhr){
        console.log(xhr.responseText)
      }
    });
  });
}

function upQuality(quality) {
  if (quality === 'swill') {
    return 'plausible';
  } else if (quality === 'plausible') {
    return 'genius';
  } else {
    return 'genius';
  };
}

function thumbsDown() {
  $('#all-ideas').delegate('#thumbs-down', 'click', function () {
    var $idea = $(this).closest('.idea');
    var quality = event.target.dataset.quality;
    var updated = downQuality(quality);
    var ideaParams = {idea: { quality: updated }};

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/' + $idea.attr('data-id'),
      data: ideaParams,
      success: function(){
        $idea.find('.idea-quality').text('Quality: ' + ideaParams.idea.quality);
        $idea.attr('data-quality', ideaParams.idea.quality)
      },
      error: function(xhr){
        console.log(xhr.responseText)
      }
    });
  });
}

function downQuality(quality) {
  if (quality === 'genius') {
    return 'plausible';
  } else if (quality === 'plausible') {
    return 'swill';
  } else {
    return 'swill';
  };
}

function editTitle() {
  $('#all-ideas').on('click', '.card-title', function() {
    var ideaElement = event.toElement
    $(this).attr('contenteditable', 'true')
    .focus()
    .keypress(function() {
      if (event.keyCode === 13) {
        var $idea = $(ideaElement.parentElement.parentElement);
        var $title = ideaElement.textContent;
        var ideaParams = {idea: { title: $title }}

        $.ajax({
          type: 'PUT',
          url: '/api/v1/ideas/' + $idea.attr('data-id'),
          data: ideaParams,
          success: function(){
            console.log("Success")
            $idea.find('.card-title').text(ideaParams.idea.title);
          },
          error: function(xhr){
            console.log(xhr.responseText)
          }
        });
      };
    });
  });
}

function editBody() {
  $('#all-ideas').on('click', '.idea-body', function() {
    var ideaElement = event.toElement
    $(this).attr('contenteditable', 'true')
    .focus()
    .keypress(function() {
      if (event.keyCode === 13) {
        var $idea = $(ideaElement.parentElement.parentElement);
        var $body = ideaElement.textContent;
        var ideaParams = {idea: { body: $body }}

        $.ajax({
          type: 'PUT',
          url: '/api/v1/ideas/' + $idea.attr('data-id'),
          data: ideaParams,
          success: function(){
            console.log("Success")
            $idea.find('.idea-body').text(ideaParams.idea.body);
          },
          error: function(xhr){
            console.log(xhr.responseText)
          }
        });
      };
    });
  });
}
