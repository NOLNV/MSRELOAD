#pragma strict

public var dialogueController : DialogueController;
public var customGuiStyle : GUIStyle;

private var buttons : ArrayList;
private var numButtons : int = 0;

function Start () {
	buttons = new ArrayList();
}

function OnGUI() {
	if(numButtons>0){
	GUI.Box (Rect (10,10,100,90), "Loader Menu");
		for(var i = 0; i < numButtons; i++) {
			var butt : String = buttons[i];
			if(GUI.Button(Rect (20,40*(i+1),800,20), butt, customGuiStyle)) {
				dialogueController.RespondByNum(i);
			}
		}
	}
}

function Clear() {
	numButtons = 0;
	buttons.Clear();
}

function Add(text : String) {
	if(numButtons>4) return;
	
	numButtons = numButtons+1;
	buttons.Add(text);
	
}