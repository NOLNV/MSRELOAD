#pragma strict

class RaycastResult implements System.IComparable {
	var barycentricCoordinate : Vector3;
	var collider : Collider;
	var distance : float;
	var lightmapCoord : Vector2;
	var normal : Vector3;
	var point : Vector3;
	var rigidbody : Rigidbody;
	var textureCoord : Vector2;
	var textureCoord2 : Vector2;
	var transform : Transform;
	var triangleIndex : int;
	
	function RaycastResult( hit : RaycastHit ) {
		barycentricCoordinate = hit.barycentricCoordinate;
		collider = hit.collider;
		distance = hit.distance;
		lightmapCoord = hit.lightmapCoord;
		normal = hit.normal;
		point = hit.point;
		rigidbody = hit.rigidbody;
		textureCoord = hit.textureCoord;
		textureCoord2 = hit.textureCoord2;
		transform = hit.transform;
		triangleIndex = hit.triangleIndex;
	}
	function CompareTo(other : System.Object) : int {
		if (!(other instanceof RaycastResult)) return;
		var raycastResultOther : RaycastResult = other as RaycastResult;
		return distance.CompareTo(raycastResultOther.distance);
	}
}