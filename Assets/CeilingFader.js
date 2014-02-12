#pragma strict

var player : GameObject;
var isFaded = false;
private var ren : MeshRenderer;
function Start () {
	ren = GetComponent(MeshRenderer);
}

function Update () {
	if(isFaded) {
		ren.enabled = false;
	} else if(!ren.enabled) {
		ren.enabled = true;
	}
}

function OnTriggerEnter(hit:Collider) {
	if(hit.gameObject == player) isFaded = true;
}

function OnTriggerExit(hit:Collider) {
	Debug.Log(hit.gameObject);
	if(hit.gameObject == player) isFaded = false;
}