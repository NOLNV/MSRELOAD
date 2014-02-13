#pragma strict

var offset : Vector3;
var text : String = "";

private var gText : GUIText;
private var textsList : String[] = ["This stinks...", "Bugger.", "Bloody hell!", "Could have gone better.", "At least it isn't Thursday", "Hockey?", "Come get some", "My mace will tear you apart", "Where'd I leave my pampons?", "It's time to smash heads and chew bubblegum, and I'm all outta gum.", "That'll teach you", "Son of a gun", "Nah", "Make like a banana and GTFO"];
private var nextTime : float = Mathf.Infinity;

function Start () {
	gText = GetComponentInChildren(GUIText);
	nextTime = Time.time + 4.0f;
	textsList[0] = "My position is: " + transform.position;
}

function Update () {
	gText.transform.position = Camera.main.WorldToViewportPoint(transform.position + offset);
	if(nextTime < Time.time) {
		text = RandomText();
		gText.text = text;
		nextTime = Time.time + 0.07f * text.Length + 1.0f; // http://www.proz.com/forum/subtitling/170722-reading_speed_in_different_countries.html#1506281
	}
}

function RandomText() : String {
	var i : int = Random.Range(0, textsList.Length);
	return textsList[i];
}