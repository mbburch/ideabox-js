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
    "<div class='card blue-grey darken-1'>"
    + "<div class='card-content white-text'>"
    + "<div class='idea' data-id='"
    + idea.id
    + "'><span class='card-title center'>"
    + idea.title
    + "</span><p class='idea-body'>"
    + idea.body
    + "</p><p class='idea-quality'>Quality: "
    + idea.quality
    + "</p></div></div>"
  )
};
