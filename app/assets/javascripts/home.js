$(document).ready(function(){
  var story = new Story()
  var homeChapter = new Chapter("home", ['You are on the way to the lunch room',
                                         'Everyone trades bits and pieces from their lunches.',
                                         'What kind of trades will you make?'])
  story.addChapter(homeChapter);


  var displayNextLine = function() {
    var storyElement = document.getElementById('story-line');
    storyElement.innerHTML = story.getNextLine();
  }

  var storyButton = document.getElementById('continue-button');
  storyButton.addEventListener('click', displayNextLine)

});
