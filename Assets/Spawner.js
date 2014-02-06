#pragma strict
var frequency : float;
var Child : Transform;
var activated : boolean = false;
var Timer: float = 0.0;
function Start () {

InvokeRepeating("Spawn", 0, frequency);

}



function Spawn (){
	if (activated == true);{
	Instantiate(Child, transform.position, Quaternion.identity);
	}
}