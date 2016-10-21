document.addEventListener('DOMContentLoaded', function(){
  var story = document.getElementById('story-line');
  var storyButton = document.getElementById('continue-button');
  var clickCount = 0;

  storyButton.addEventListener('click', function(){
    clickCount += 1;
    if (clickCount === 1){
      story.innerHTML = 'Everyone trades bits and pieces from their lunches.';
    } else {
      story.innerHTML = 'What kind of trades will you make?';
    }
  });
});
