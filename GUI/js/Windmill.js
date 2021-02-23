var scene = editor.scene
var camera = editor.camera
var renderer = editor.renderer

function Foundation(scale) {

	THREE.Curve.call(this);

	this.scale = (scale === undefined) ? 1 : scale;
}

Foundation.prototype = Object.create(THREE.Curve.prototype);
Foundation.prototype.constructor = Foundation;

Foundation.prototype.getPoint = function (t) {

	var tz = 0
	var ty = t
	var tx = 0;

	return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);

};

var path = new Foundation(72.4);
var geometry = new THREE.TubeGeometry(path, 20, 1, 8, false);
var material = new THREE.MeshBasicMaterial({ color: 0x1E90FF });
var i = 0
var mesh=new Array()
while (i < 8) {
	mesh[i] = new THREE.Mesh(geometry, material);
	scene.add(mesh[i]);
	i++;
}
mesh[0].position.set(6, 0, 0)
mesh[1].position.set(4.24, 0, 4.24)
mesh[2].position.set(0, 0, 6)
mesh[3].position.set(-4.24, 0, 4.24)
mesh[4].position.set(-6, 0, 0)
mesh[5].position.set(-4.24, 0, -4.24)
mesh[6].position.set(0, 0, -6)
mesh[7].position.set(4.24, 0, -4.24)


//底盘
var geometry = new THREE.CylinderGeometry(8, 8, 4, 32);
var material = new THREE.MeshBasicMaterial({ color: 0x1E90FF });
var base = new THREE.Mesh(geometry, material);
scene.add(base);
base.position.set(0, 72.4, 0)

//塔筒
var path2 = new Foundation(75);
var material2 = new THREE.MeshBasicMaterial({ color: 0x0000FF });
var geometry2 = new THREE.TubeGeometry(path, 20, 3, 8, false);
var tower= new THREE.Mesh(geometry2, material2);
scene.add(tower);
tower.position.set(0, 72.4, 0)

//轴承
var geometry3 = new THREE.CylinderGeometry(4, 4, 10, 32);
var bearing= new THREE.Mesh(geometry3, material2);
bearing.rotateZ(Math.PI / 2)
scene.add(bearing);
bearing.position.set(0, 145, 0)

//转动轴
var geometry4 = new THREE.TetrahedronGeometry(4.5)
var Tet = new THREE.Mesh(geometry4, material2);
Tet.rotateZ(0.6)
Tet.rotateY(-Math.PI / 4)
Tet.position.set(5,145,0)
scene.add(Tet);

//风叶
var axis = new THREE.Vector3(0,146,0)
var geometry5 = new THREE.ConeBufferGeometry(1.5, 50, 32);
var cone1 = new THREE.Mesh(geometry5, material2);
var cone2 = new THREE.Mesh(geometry5, material2);
var cone3 = new THREE.Mesh(geometry5, material2);
scene.add(cone1,cone2,cone3);
cone1.position.set(7,171,0)
cone2.position.set(7, 132.5,24)
cone2.rotateX(Math.PI / 1.5)
cone3.position.set(7, 171, 0)
cone3.position.set(7, 132.5, -24)
cone3.rotateX(-Math.PI / 1.5)
