#pragma strict

class DialogueNode {
	var title : String;
	var femText : String;
	var malText : String;
	var rewardFunc : String;
	var tag : String;
	var textTime : String;
	var dialogOptions : ArrayList;
	
	function DialogueNode( a : String, b : String, c : String, d : String, e : String, f : String) {
		title = a;
		tag = b;
		femText = c;
		malText = d;
		rewardFunc = e;
		textTime = f;
		dialogOptions = new ArrayList();
	}
	
	function AddToResponses( a: String, b : String, c : String) {
		dialogOptions.Add(new DialogOption(a, b, c));
		//Debug.Log(a + ": ADDED! to: " + title);
	}
}
