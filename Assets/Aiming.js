#pragma strict

var debuggyyy : Transform;
var camerapoint : Transform;
var Midpoint : Vector3;
var currentposition : Vector3;

var targetmouse: Vector3;
var point: Vector3;


function Start () {

}

function Update () {

	//get position
	currentposition = transform.position;


	
	var hit : RaycastHit;
	if (Physics.Raycast (Camera.main.ScreenPointToRay(Input.mousePosition),  hit)) {
						
	targetmouse = hit.point;
	}
	
	point = targetmouse;
	point.y = currentposition.y;
	
transform.LookAt(point);

Midpoint =((currentposition - point) * 0.5f) + point;
camerapoint.transform.position = transform.position;

// camerapoint.transform.position = Vector3.MoveTowards(camerapoint.transform.position, Midpoint, .03);

debuggyyy.position = targetmouse;



}
