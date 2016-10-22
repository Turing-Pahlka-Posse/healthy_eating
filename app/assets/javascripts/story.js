function Story() {
  this.chapters =  []
  this.currentChapter = 0
}

Story.prototype.addChapter = function(chapter) {
  this.chapters.push(chapter);
}

Story.prototype.advance = function() {
  if (this.chapters[this.currentChapter].isCompleted()) {
    this.chapters[this.currentChapter].reset();
    this.currentChapter++ //need to guard against end of story (last chpt)
  } else {
    this.chapters[this.currentChapter].currentLineNumber++;
  }
}

Story.prototype.currentLine = function() {
  return this.chapters[this.currentChapter].currentLine();
}

Story.prototype.getNextLine = function() {
  this.advance();
  return this.currentLine();
}
