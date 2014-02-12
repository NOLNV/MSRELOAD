#pragma strict

var crossHair : Transform;
var cameraController : Transform;
var player : Transform;

private var aimingPlane : Plane;
private var target : Vector3;
private var compassPointer : Vector3;

var DEBUG = true; 
private var layerFilter = LayerFilters.ignorePlayerLayer;

function Start () {
	aimingPlane = new Plane(Vector3.up, player.position.y);
}

function Update () {	//TODO: Edge cases
	//set up mouse ray
	setCrossHair(new Vector3());
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	var hits = getRaycastArray(ray);
	if(!hits.length) return;
	//check if there's enemies behind any obstacle and player has LoS on them. (door)
	for (hit in hits) {
		var hit2 : RaycastResult = hit;
		if(hit2.collider.CompareTag(Tags.enemy)) {
			var losHitE : RaycastHit;
			var losDirE : Vector3 = hit2.point - player.position;
			if (DEBUG == true) { Debug.DrawRay(player.position, losDirE, Color.green); }
			Physics.Raycast(player.position, losDirE, losHitE, Mathf.Infinity, layerFilter);
			if(losHitE.collider == hit2.collider) {
				target = losHitE.point;
				setCrossHair(target);
				return;
			}
		}
	}
	
	var hit : RaycastResult = hits[0];
	
	//set up line of sight raycast variables
	var losHit : RaycastHit;
	var losDir : Vector3 = hit.point - player.position;
	
	if (DEBUG == true) { Debug.DrawRay(player.position, losDir, Color.green); }
	Physics.Raycast(player.position, losDir, losHit, Mathf.Infinity, layerFilter);
	
	//Mouse directly over enemy, takes precedence before all else.
	if (CheckForEnemy(hit, losHit))
		return;
	
	
	//Mouse directly over desired point. Both player and mouse have clear line of sight
	if(losHit.point == hit.point) {
		target = losHit.point;
	} else {
		//Player unclear line of sight, mouse below obstacle
		if(losHit.point.y > hit.point.y) {
			//aim straight
			if (elevateCrossHair(ray)) {
				return;
			}
		} else {
			//is lineofsight hitting the ceiling?
			if(losHit.normal == Vector3.down) {
				//Try aiming below obstacle
				target = hit.point;
				for ( newHit in hits ) {
					//Hits closer to the player's Y axis favorable
					if(chooseByHeight(newHit))
						return;
				}
			} else {
				//aim at the side instead
				target = losHit.point;
			}
		}
	}
	
	setCrossHair(target);
}

function CheckForEnemy(hit : RaycastResult, losHit : RaycastHit) : boolean {
	if(hit.collider.CompareTag(Tags.enemy)) {
		if(losHit.collider == hit.collider) {
			target = losHit.point;
			setCrossHair(target);
			return true;
		}
	}
	return false;
}

function chooseByHeight(hit : RaycastResult) : boolean {
	var distance1 = Mathf.Abs(target.y - player.position.y);
	var distance2 = Mathf.Abs(hit.point.y - player.position.y);
	var losHit : RaycastHit;
	var losDir : Vector3 = hit.point - player.position;
	Physics.Raycast(player.position, losDir, losHit, Mathf.Infinity, layerFilter);
	if (DEBUG == true) { Debug.DrawRay(player.position, losDir, Color.yellow); }
	if (CheckForEnemy(hit, losHit)) {
		return true;
	} else if (distance1 > distance2) {
		target = losHit.point;
	}
	return false;
}

function elevateCrossHair(ray : Ray) : boolean {
/*	var newAngle = Vector3.Angle(ray.direction, Vector3.up);var distance = Mathf.Abs(player.position.y-hit.point.y+2.6f) / Mathf.Cos(newAngle);return ray.GetPoint(hit.distance-distance);*/
	aimingPlane.SetNormalAndPosition(Vector3.up, player.position);
	var rayDistance: float;
	// If the ray makes contact with the ground plane then
	// position the marker at the distance along the ray where it
	// crosses the plane.
	if (aimingPlane.Raycast(ray, rayDistance)) {
		if (DEBUG == true) { Debug.DrawRay(player.position, ray.GetPoint(rayDistance)-player.position, Color.red); }
		setCrossHair(ray.GetPoint(rayDistance));
		return true;
	}
	else return false;
}
function getRaycast(ray : Ray) : RaycastHit {
	var hit : RaycastHit;
	Physics.Raycast(ray, hit, Mathf.Infinity, layerFilter);
	if (DEBUG) {
		var rayOrigin = ray.origin;
		var rayColor = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0), Random.Range(0.0,1.0));
		Debug.DrawLine(rayOrigin, hit.point, rayColor, 0, false);
	}
	return hit;
}

function getRaycastArray(ray : Ray) : Array {
	var hits : RaycastHit[];
	hits = Physics.RaycastAll(ray, Mathf.Infinity, layerFilter);
	if (DEBUG) {
		var rayOrigin = ray.origin;
		for(var hit in hits) {
			var rayColor = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0), Random.Range(0.0,1.0));
			Debug.DrawLine(rayOrigin, hit.point, rayColor, 0, false);
			rayOrigin = hit.point;
		}
	}
	var hits2 = SortRaycastHitsArray.SortByDistance(hits);
	return hits2;
}

function setCrossHair(vec : Vector3) {
	compassPointer = vec;
	compassPointer.y = transform.position.y;
		
	transform.LookAt(compassPointer);
	
	cameraController.transform.position = transform.position;
	crossHair.position = vec;
}