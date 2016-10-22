function Chapter(name, narrative) {
  this.name = name,
  this.narrative = narrative;
  this.currentLineNumber = 0
}

Chapter.prototype.reset = function() {
  this.currenLineNumber = 0;
}

Chapter.prototype.isCompleted = function() {
  return this.currentLineNumber === this.narrative.length - 1;
}

Chapter.prototype.currentLine = function() {
  return this.narrative[this.currentLineNumber]
}
