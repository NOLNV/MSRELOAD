#pragma strict
import System.Text.RegularExpressions; // http://wiki.unity3d.com/index.php?title=SimpleRegex#JavaScript_-_SimpleRegex.js

public var dialogueInterface : GameObject;

public var scriptFile : TextAsset; // https://docs.unity3d.com/Documentation/ScriptReference/TextAsset.html

public var player : GameObject;
public var npcActor1 : GameObject;
public var npcActor2 : GameObject;
public var npcActor3 : GameObject;

private var playerActor : ActorController;
private var actor1 : ActorController;
private var actor2 : ActorController;
private var actor3 : ActorController;

private var dialogueBox : DialogueBox;

private var nodesHash : Hashtable;
private var nodesArray: ArrayList;

private var nodeRegex = "::\\s\\w+\\s(?:\\[.*\\])?\\r?\\n?(?:\\|[^\\|]*\\|)+\\r?\\n?(?:(?:(?:\\[\\[[^\\]]+\\]\\])\\r?\\n?)+)?"; //shit long and shit hard, dont tocuh or get punched
private var passageTitleRegex = "^::\\s(\\w+)\\s";
private var tagRegex = "(?:\\[(.*)\\])?\\r?\\n?";
private var femMessageRegex = "\\|([^\\|]*)\\|";
private var malMessageRegex = "\\|([^\\|]*)\\|";
private var rewardFuncRegex = "\\|([^\\|]*)\\|";
private var textTimeRegex = "\\|(\\d+\\.\\d+f)\\|";
private var dialogOptionsRegex = "\\[\\[[^\\|]+\\|\\w+\\]\\]";
private var responseTextRegex = "^\\[\\[([^@\\|]+)@?";
private var responseFuncRegex = "(?:([^@\\|]+)@?)?\\|";
private var responseTitleRegex = "(\\w+)\\]\\]";

private var dialogueInProgress = false;
private var currentNode : DialogueNode;

function Start () {
	nodesHash = new Hashtable();
	nodesArray = new ArrayList();
	//Debug.Log(scriptFile.text);
	var matches = Regex.Matches(scriptFile.text, nodeRegex);
	for(node in matches) {
		var str 			= node.ToString();
		var title 			= Regex.Match(str, passageTitleRegex);
		var tag 			= Regex.Match(str, passageTitleRegex + tagRegex);
		var femMessage 		= Regex.Match(str, passageTitleRegex + tagRegex + femMessageRegex);
		var malMessage 		= Regex.Match(str, passageTitleRegex + tagRegex + femMessageRegex + malMessageRegex);
		var rewardFunc 		= Regex.Match(str, passageTitleRegex + tagRegex + femMessageRegex + malMessageRegex + rewardFuncRegex);
		var textTime 		= Regex.Match(str, passageTitleRegex + tagRegex + femMessageRegex + malMessageRegex + rewardFuncRegex + textTimeRegex);  // If you look at this closely you can see pinochio
		var dialogOptions 	= Regex.Matches(str, dialogOptionsRegex);
		
		/*Debug.Log(title.Groups[1].ToString());
		Debug.Log(tag.Groups[2].ToString());
		Debug.Log(femMessage.Groups[3].ToString());
		Debug.Log(malMessage.Groups[4].ToString());
		Debug.Log(rewardFunc.Groups[5].ToString());
		Debug.Log(textTime.Groups[6].ToString());//*/
		
		var key = title.Groups[1].ToString();
		var obj = new DialogueNode(
									title.Groups[1].ToString(),
									tag.Groups[2].ToString(),
									femMessage.Groups[3].ToString(),
									malMessage.Groups[4].ToString(),
									rewardFunc.Groups[5].ToString(),
									textTime.Groups[6].ToString()
									);
		for(item in dialogOptions) {
			var dialog = item.ToString();
			var resText = Regex.Match(dialog, responseTextRegex);
			var resFunc = Regex.Match(dialog, responseTextRegex + responseFuncRegex);
			var resTitle = Regex.Match(dialog, responseTextRegex + responseFuncRegex + responseTitleRegex);
			/*Debug.Log(resText.Groups[1].ToString());
			Debug.Log(resFunc.Groups[2].ToString());
			Debug.Log(resTitle.Groups[3].ToString());
			Debug.Log(resText.Groups[1].Length);//*/
			obj.AddToResponses(resText.Groups[1].ToString(), resFunc.Groups[2].ToString(), resTitle.Groups[3].ToString());
		}
		nodesHash[key] = nodesArray.Add(obj);
	}
	
	playerActor = player.GetComponentInChildren(ActorController);
	if (npcActor1)
		actor1 = npcActor1.GetComponentInChildren(ActorController);
	if (npcActor2)
		actor2 = npcActor2.GetComponentInChildren(ActorController);
	if (npcActor3)
		actor3 = npcActor3.GetComponentInChildren(ActorController);
		
	dialogueBox = dialogueInterface.GetComponentInChildren(DialogueBox);
	dialogueBox.dialogueController = gameObject.GetComponent(DialogueController);
}

function Awake() {
}

function Update () {
	if(Input.GetKeyDown(KeyCode.G)){
		actor1.Say("HELLO!");
		StartDialogue();
	}
	if(dialogueInProgress) {
		if(Input.GetKeyDown(KeyCode.Alpha1)) {Respond(currentNode.dialogOptions[0]);}
		if(Input.GetKeyDown(KeyCode.Alpha2)) {Respond(currentNode.dialogOptions[1]);}
		if(Input.GetKeyDown(KeyCode.Alpha3)) {Respond(currentNode.dialogOptions[2]);}
	}
}
function Respond(respond : DialogOption) {
	dialogueBox.Clear();
	dialogueInProgress = false;
	proceedDialogue(respond.target);
}

function RespondByNum(i : int) {
	dialogueBox.Clear();
	dialogueInProgress = false;
	var respond : DialogOption = currentNode.dialogOptions[i];
	proceedDialogue(respond.target);
}
function StartDialogue() {
	proceedDialogue("Start");
}

function proceedDialogue(nodeTitle : String) {
	var node = getNode(nodeTitle);
	if(node) {
		var actor : ActorController = getActor(node.tag);
		if(actor) {
			actor.Say(getText(node.femText, node.malText));
			currentNode = node;
			dialogueInProgress = true;
			for(var i = 0; i < node.dialogOptions.Count; i++) {
				//fff get some kind of UI..
				var options : DialogOption = node.dialogOptions[i];
				dialogueBox.Add(options.response);
				//Debug.Log("PRESS " + (1+i) + " TO CHOOSE: " + options.response);
			}
		}
	}
}

function getText(femText, malText) : String {
	return femText;
}

function getActor(actor : String) : ActorController {
	if(actor == "player") return playerActor;
	if(actor == "actor1") return actor1;
	if(actor == "actor2") return actor1;
	if(actor == "actor3") return actor1; 
	return null;
}

function getNode(node : String) : DialogueNode {
	var obj : DialogueNode = nodesArray[nodesHash[node]];
	return obj;
}





