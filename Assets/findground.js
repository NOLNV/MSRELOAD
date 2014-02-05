#pragma strict

var Shadow : Transform;

function Start () {

}



function Update () {
		var hit : RaycastHit;
		if (Physics.Raycast (transform.position, -Vector3.up, hit)) {
						
			Shadow.position = hit.point;
		}
}