$(document).ready(function(){
  fetchIdeas()
});

function fetchIdeas(){
  $.ajax({
    type: 'GET',
    url:  '/api/v1/ideas',
    success: function(response){
      $.each(response, function(index, idea){
        renderIdea(idea)
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
    + "</p><p class='idea-quality'>Quality: "
    + idea.quality
    + "</p></div></div>"
  )
};

function truncateBody(body) {
  if (body.length > 100) {
    return body.slice(0, 100) + '...'
  } else {
    return body
  }
};
