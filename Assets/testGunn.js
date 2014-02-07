#pragma strict

var crosshair: Transform;
var Gunshots: ParticleSystem;
var owner: Transform;
var ROF: float = 0.1;
var nextshot: float = 0.0;
var gunfire: ParticleSystem;
var damage: int;

var isEquipped = false;

function Start () {

}

function Update () {
	if(isEquipped) {
		transform.position = owner.position;
		transform.LookAt(crosshair);
		
		if (Input.GetButton("Fire1") && Time.time > nextshot){
			Gunshots.Emit(1);
			audio.Play();
			nextshot = Time.time + ROF;
			gunfire.Emit(1);
		}
	} else {
	}
}
function OnParticleCollision (other : GameObject) {
		other.collider.SendMessage("ApplyDamage", damage); 
}

//This is so bad having it in this module I bet. Gotta move this to gunHolder.js
function OnTriggerEnter(other : Collider) {
	var gunHolder = owner.GetComponent(gunHolder);
	if (gunHolder.hasEquipped == false) {
		gunHolder.hasEquipped = true;
		gunHolder.Gun = gameObject;
		isEquipped = true;
	}
}