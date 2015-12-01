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
    "<div class='idea' data-id='"
    + idea.id
    + "'><h4 class='idea-title'>"
    + idea.title
    + "</h4><p class='idea-body'>"
    + idea.body
    + "</p><p class='idea-quality'>Quality: "
    + idea.quality
    + "</p>"
  )
};
