#pragma strict

var Health: int = 20;
var Deathobject : Transform;
var speed: float = 0.01;
var prey : GameObject;
var hunting : boolean = true;

function Start () {
//Get prey
prey = GameObject.FindWithTag ("Player");

}

function Update () {
//stalk prey

if (hunting == true){
transform.LookAt(prey.transform.position);


transform.position = Vector3.MoveTowards(transform.position, prey.transform.position, speed);
}

//know how to die
	if(Health <= 0)
	{
		Dead();
		Instantiate(Deathobject, transform.position, Quaternion.identity);
	}
}
//Get Hurrt
function ApplyDamage (Damage : int)
{
	audio.Play();
	Health -= Damage;
}
//Get Dead
function Dead()
{
	Destroy (gameObject);
}
