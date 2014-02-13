#pragma strict

class DialogueNode {
	var title : String;
	var femText : String;
	var malText : String;
	var rewardFunc : String;
	var tag : String;
	var textTime : String;
	var dialogOptions : Array;
	
	function DialogueNode( a : String, b : String, c : String, d : String, e : String, f : String) {
		title = a;
		femText = b;
		malText = c;
		rewardFunc = d;
		tag = e;
		textTime = f;
		dialogOptions = new Array();
	}
	
	function AddToResponses( a: String, b : String, c : String) {
		dialogOptions.push(new DialogOption(a, b, c));
	}
}
