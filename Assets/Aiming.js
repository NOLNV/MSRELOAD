#pragma strict

var debuggyyy : Transform;
var camerapoint : Transform;
var currentposition : Transform;

private var targetmouse: Vector3;
private var point: Vector3;

var DEBUG = true; 
private var LayerFilter = 1 << 10; LayerFilter = ~LayerFilter; //Ignore player mask

function Start () {
}

function Update () {	//TODO: Edge cases
	//get hits trough all surfaces
	var hits = getRaycastArray();
	//set the mouse cursor to the first in the list
	targetmouse = hits[0].point;
	//iterate through all hits
	for(var hit in hits) {
		//set up line of sight raycast variables
		var losHit : RaycastHit;
		var losDir : Vector3 = hit.point - currentposition.position;
		if (DEBUG == true) { Debug.DrawRay(currentposition.position, losDir, Color.green);}
		
		//Objects tagged with "Enemy" take precedence
		if( hit.collider.CompareTag(Tags.enemy) ) {
			if(Physics.Raycast(currentposition.position, losDir, losHit, Mathf.Infinity, LayerFilter)) {
				if(losHit.collider.CompareTag(Tags.enemy)) {
					targetmouse = losHit.point;
					break; //Breaks the loop
				}
			}
		}
		
		//if another hit is closer to the player's y coordinate, use that instead.
		if( compare(currentposition.position.y, targetmouse.y, hit.point.y) ) {
			if(Physics.Raycast(currentposition.position, losDir, losHit, Mathf.Infinity, LayerFilter)) {
				targetmouse = losHit.point;
			}
		}
	}
	
	point = targetmouse;
	point.y = transform.position.y;
		
	transform.LookAt(point);
	
	camerapoint.transform.position = transform.position;
	debuggyyy.position = targetmouse;



}

function compare(a:float, b:float, c:float) {
	var distance1 = Mathf.Abs(b - a);
	var distance2 = Mathf.Abs(c - a);
	return distance1 > distance2;
}

function getRaycastArray() {	//TODO: Ignore self
	var hits : RaycastHit[];
	hits = Physics.RaycastAll(Camera.main.ScreenPointToRay(Input.mousePosition), Mathf.Infinity, LayerFilter);
	if (DEBUG) {
		for(var hit in hits) {
			//Safely add more debuggyyys
		}
	}
	return hits;
}