// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: purple; icon-glyph: magic;
let widget = new ListWidget()
let gradient = new LinearGradient()
gradient.colors = [new Color("#063175"), new Color("#8296b5"), new Color("#063175")]
gradient.locations = [1, 0.5, 0.0]
widget.backgroundGradient = gradient

let request = new Request("https://random-word-api.herokuapp.com/word")
request.allowInsecureRequest = true

var word = await request.loadJSON()
word = word[0]


var defRequest = new Request("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)

defRequest.allowInsecureRequest = true
while (defRequest == undefined) {
  defRequest = new Request("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
}
var json = await defRequest.loadJSON()
console.log(json[0])

while (json[0] == undefined) {
  let newWordRequest = new Request("https://random-word-api.herokuapp.com/word")  

  newWordRequest.allowInsecureRequest = true
  word = await newWordRequest.loadJSON()
  word = word[0]
  let newDefRequest = new Request("https://api.dictionaryapi.dev/api/v2/entries/en/" +       word)  

  newDefRequest.allowInsecureRequest = true  
  json = await newDefRequest.loadJSON()
}

var definition = json[0].meanings[0].definitions[0].definition
var pOS = json[0].meanings[0].partOfSpeech

var wordTitle = widget.addText(word)
wordTitle.minimumScaleFactor = 0.5
wordTitle.textColor = Color.white()
wordTitle.font = Font.boldRoundedSystemFont(25)
widget.addSpacer(5)
var defTitle = widget.addText(definition)
defTitle.minimumScaleFactor = 0.5// 
defTitle.font =
Font.regularMonospacedSystemFont(20)
defTitle.textColor = Color.white()

widget.addSpacer(5)
let stack = widget.addStack()
let pOSTitle = stack.addText(pOS)
pOSTitle.minimumScaleFactor = 0.5
pOSTitle.font = Font.italicSystemFont(15)
pOSTitle.textColor = Color.white()
stack.addSpacer(20)

Script.setWidget(widget)
