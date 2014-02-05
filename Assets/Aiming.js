#pragma strict

var debuggyyy : Transform;

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

debuggyyy.position = targetmouse;



}
