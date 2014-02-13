#pragma strict
import System.Text.RegularExpressions; // http://wiki.unity3d.com/index.php?title=SimpleRegex#JavaScript_-_SimpleRegex.js

public var scriptFile : TextAsset; // https://docs.unity3d.com/Documentation/ScriptReference/TextAsset.html

private var nodesHash : Hashtable;
private var nodesArray: ArrayList;

private var nodeRegex = "::\\s\\w+\\s(?:\\[.*\\])?\\r?\\n?(?:\\|[^\\|]*\\|)+\\r?\\n?(?:(?:(?:\\[\\[[^\\]]+\\]\\])\\r\\n)+)?"; //shit long and shit hard, dont tocuh or get punched
private var passageTitleRegex = "^::\\s(\\w+)\\s";
private var tagRegex = "(?:\\[(.*)\\])?\\r?\\n?";
private var femMessageRegex = "\\|([^\\|]*)\\|";
private var malMessageRegex = "\\|([^\\|]*)\\|";
private var rewardFuncRegex = "\\|([^\\|]*)\\|";
private var textTimeRegex = "\\|(\\d+\\.\\d+f)\\|";
private var dialogOptionsRegex = "\\[\\[[^\\|]+\\|\\w+\\]\\]";
private var responseTextRegex = "^\\[\\[([^\\(\\|]+)\\(?";
private var responseFuncRegex = "(?:(.*)\\))?\\|";
private var responseTitleRegex = "(\\w+)\\]\\]";

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
		Debug.Log(textTime.Groups[6].ToString());*/
		
		var key = title.Groups[1].ToString();
		nodesHash[key] = nodesArray.Add(new DialogueNode(
											title.Groups[1].ToString(),
											tag.Groups[2].ToString(),
											femMessage.Groups[3].ToString(),
											malMessage.Groups[4].ToString(),
											rewardFunc.Groups[5].ToString(),
											textTime.Groups[6].ToString())
										);
		for(item in dialogOptions) {
			var dialog = item.ToString();
			//Debug.Log(dialog);
			var resText = Regex.Match(dialog, responseTextRegex);
			var resFunc = Regex.Match(dialog, responseTextRegex + responseFuncRegex);
			var resTitle = Regex.Match(dialog, responseTextRegex + responseFuncRegex + responseTitleRegex);
			/*Debug.Log(resText.Groups[1].ToString());
			Debug.Log(resFunc.Groups[2].ToString());
			Debug.Log(resTitle.Groups[3].ToString());
			Debug.Log(resText.Groups[1].Length);*/
			var obj : DialogueNode = nodesArray[nodesHash[key]];
			obj.AddToResponses(resText.Groups[1].ToString(), resFunc.Groups[2].ToString(), resTitle.Groups[3].ToString());
		}
	}
}

function Update () {

}