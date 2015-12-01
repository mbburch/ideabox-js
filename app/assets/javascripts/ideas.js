$(document).ready(function(){
  fetchIdeas()
  createIdea()
  deleteIdea()
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
      })
    }
  })
};

function renderIdea(idea){
  $('#all-ideas').prepend(
    "<div class='card blue-grey darken-2'>"
    + "<div class='card-content white-text'>"
    + "<div class='idea' data-id='"
    + idea.id
    + "'><span class='card-title center'>"
    + idea.title
    + "</span><p class='idea-body'>"
    + truncateBody(idea.body)
    + "</p><p class='idea-quality'><strong>Quality:</strong> "
    + idea.quality
    + "</p><div class='buttons'>"
    + "<button id='delete-idea' class='btn btn-default'>Delete</button>"
    + "</div></div></div></div>"
  )
};

function truncateBody(body) {
  if (body.length > 100) {
    return body.slice(0, 100) + '...'
  } else {
    return body
  }
};

function createIdea() {
  $('#create-idea').on('click', function(){

    var ideaTitle  = $('#title').val()
    var ideaBody   = $('#body').val()
    var ideaParams = {
      idea: {
        title: ideaTitle,
        body: ideaBody
      }
    }

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
        debugger
      }
    });
  });
};

function deleteIdea(){
  $('#all-ideas').delegate('#delete-idea', 'click', function(){
    debugger
    var $idea = $(this).closest('.idea')
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
    })
  })
}
