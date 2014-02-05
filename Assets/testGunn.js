#pragma strict

var crosshair: Transform;
var Gunshots: ParticleSystem;
var owner: Transform;
var ROF: float = 0.1;
var nextshot: float = 0.0;
var gunfire: ParticleSystem;

function Start () {

}

function Update () {
	
	transform.position = owner.position;
	
	transform.LookAt(crosshair);
	
	if (Input.GetButton("Fire1") && Time.time > nextshot){
		Gunshots.Emit(1);
		audio.Play();
		nextshot = Time.time + ROF;
		gunfire.Emit(1);
	}
}