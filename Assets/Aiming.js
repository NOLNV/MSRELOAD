#pragma strict

var debuggyyy : Transform;
var camerapoint : Transform;
var Midpoint : Vector3;
var currentposition : Vector3;
var targetmouse: Vector3;
var point: Vector3;
var distance1 = 0f;
var distance2 = 0f;
var DEBUG = false; //TODO: Encapsulate debuggyy in if statement

function Start () {
}

function Update () {	//TODO: Edge cases
	//get position
	currentposition = transform.position;
	//get hits trough all surfaces
	var hits = getRaycastArray();
	//set the mouse cursor to the last in the list
	targetmouse = hits[hits.Length-1].point;
	//iterate through all hits
	for(var hit in hits) {
		//if another hit is closer to the player's y coordinate, use that instead.
		if( compare(currentposition.y, targetmouse.y, hit.point.y) ) {
			//TODO: Check for Line of Sight
			targetmouse = hit.point;
		}
	}
	/*
	var hit : RaycastHit;
	if (Physics.Raycast (Camera.main.ScreenPointToRay(Input.mousePosition),  hit)) {
						
	targetmouse = hit.point;
	}*/
	
	point = targetmouse;
	point.y = currentposition.y;
		
	transform.LookAt(point);

	Midpoint =((currentposition - point) * 0.5f) + point;
	camerapoint.transform.position = transform.position;

	// camerapoint.transform.position = Vector3.MoveTowards(camerapoint.transform.position, Midpoint, .03);

	debuggyyy.position = targetmouse;



}

function compare(a:float, b:float, c:float) {
	distance1 = Mathf.Abs(b - a);
	distance2 = Mathf.Abs(c - a);
	return distance1 > distance2;
}

function getRaycastArray() {	//TODO: Ignore self
	var hits : RaycastHit[];
	hits = Physics.RaycastAll(Camera.main.ScreenPointToRay(Input.mousePosition));
	if (DEBUG) {
		for(var hit in hits) {
			//Safely add more debuggyyys
		}
	}
	return hits;
}