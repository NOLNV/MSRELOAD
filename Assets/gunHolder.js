#pragma strict

var canPickup = true;
var owner: Transform;
var Gun: GameObject;

// I wish we could hide these
var hasEquipped = false;
var OldGun: GameObject;
var nextPickup: float = 0.0f;

function Start () {
	//If the gun is already set, we can turn the bools the other way.
	if(Gun) {
		//I think we're alone now
		hasEquipped = true;
		//There doesn't seem to be anyone around
		canPickup = false;
		//The beating of our hearts is the only sound
		Gun.GetComponent(testGunn).isEquipped = true;
	}
}

function Update () {
	transform.position = owner.position;
	if (hasEquipped && Gun) {
		if (Input.GetButton("Fire2")) {
			Gun.GetComponent(testGunn).isEquipped = false;
			OldGun = Gun;
			hasEquipped = false;
			nextPickup = Time.time + 2;
			Gun = null;
		}
	} else {
		if (false) { ///player collides with gun
			if (nextPickup < Time.time /* && GunColliding == OldGun */) {
				//Pick the old gun up
			} else {
				//Pick any other gun up
			}
		}
	}
}

function Equip(a : GameObject) {} //move appropriate code here
function Unequip(a : GameObject) {} //more inappropriate code here