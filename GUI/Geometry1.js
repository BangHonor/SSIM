//负责渲染与记录数据
////////////////////////////////////////////////////////////////////////////////////////////
var scene = editor.scene
var camera = editor.camera
var renderer = editor.renderer
var NodeNum = 1;//记录是第几个节点
var ElementNum = 1;
var SectionNum = 1;
var MaterialNum = 1;
////////////////////////////////////////////////////////////////////////////////////////////
//用于存储已有图像的数组与Section Material
var Nodes = new Array();
var Elements = new Array();
var Sections = new Array();
var Materials = new Array();

var geometry = new THREE.SphereGeometry(0.024, 32, 10);
var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
var lineGeometry = new THREE.Geometry();
////////////////////////////////////////////////////////////////////////////////////////////
//Class
class Node{
	constructor(x, y, z) {
		this._x = x;
		this._y = y;
		this._z = z;
		//节点sphere
		this._obj = new THREE.Mesh(geometry, material);
		//节点编号
		this._num = PlaneText("N" + String(NodeNum), "#fffffb");
		this._attach = 0;
	}
	get x() { return this._x; }
	get y() { return this._y; }
	get z() { return this._z; }
	get obj() { return this._obj; }
	get num() { return this._num; }
	get attach() { return this._attach; }
	set x(val) { this._x = val; }
	set y(val) { this._y = val; }
	set z(val) { this._z = val; }
	set attach(val) { this._attach = val; }
	delete() {
		delete this._x;
		delete this._y;
		delete this._z;
		delete this._num;
		delete this._obj;
		delete this._attach;
	}
}

class Element {
	constructor(node1,node2) {
		this._node1 = node1;
		this._node2 = node2;
		var x0 = Nodes[node1].x, x1 = Nodes[node2].x;
		var y0 = Nodes[node1].y, y1 = Nodes[node2].y;
		var z0 = Nodes[node1].z, z1 = Nodes[node2].z;
		var lineGeometry = new THREE.Geometry();
		lineGeometry.vertices.push(new THREE.Vector3(z0, y0, x0));
		lineGeometry.vertices.push(new THREE.Vector3(z1, y1, x1));

		this._obj = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
			color: 0xffffff,
			dashSize: 0.5,
			gapSize: 0.1
		}));
		this._num = PlaneText("E" + String(ElementNum), "#fffffb");
	}
	section;
	material;
	get node1() { return this._node1; }
	get node2() { return this._node2; }
	get section() { return this._section; }
	get material() { return this._material; }
	get obj() { return this._obj; }
	get num() { return this._num; }

	set node1(val) { this._node1 = val; }
	set node2(val) { this._node2 = val; }
	set section(val) { this._section = val; }
	set material(val) { this._material = val; }
	set obj(val) { this._obj = val;}
	delete() {
		delete this._node1;
		delete this._node2;
		delete this._section;
		delete this._material;
		delete this._num;
		delete this._obj;
	}
}

class Section{
	constructor(name,group) {
		this._name = name;
		this._group = group;
	}
	get name() { return this._name }
	get group() { return this._group}
	set name(val) { this._name = val }
	set group(val) { this.group = val }
	delete() {
		delete this._name;
		delete this._group;
	}
}

class Material {
	constructor(name,E,v,Fy,Wt) {
		this._name = name;
		this._E = E;
		this._v = v;
		this._Fy = Fy;
		this._Wt = Wt;
	}
	get name() { return this._name }
	get E() { return this._E }
	get v() { return this._v }
	get Fy() { return this._Fy }
	get Wt() { return this._Wt }
	set name(val) { this._name = val }
	set E(val) { this._E = val }
	set v(val) { this._v = val }
	set Fy(val) { this._Fy = val }
	set Wt(val) { this._Wt = val }
	delete() {
		delete this._name;
		delete this._E;
		delete this._v;
		delete this._Fy;
		delete this._Wt;
	}
}
////////////////////////////////////////////////////////////////////////////////////////////
//图像渲染
function clearCache(object) {
	let mesh = object;
	mesh.geometry.dispose();
	mesh.material.dispose();
}
/**
 * 清空渲染器缓存，该demo中无需使用
 */
function clearRenderer() {
	renderer.dispose();
	renderer.forceContextLoss();
	renderer.context = null;
	renderer.domElement = null;
	renderer = null;
}


//创建文字
function PlaneText(text, textColor) {
	var texture = canvasMultilineText(text, textColor);
	var planeGeometry = new THREE.PlaneBufferGeometry(0.2, 0.2);
	var planeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, color: 0xffffff, side: THREE.DoubleSide, });
	return new THREE.Mesh(planeGeometry, planeMaterial);
}

function canvasMultilineText(textArray, textColor, parameters) {
	parameters = parameters || {};
	var width = 0;
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	//透明
	context.globalAlpha = 0;

	if (typeof textArray === 'string') textArray = [textArray];

	context.font = parameters.font ? parameters.font : '24px sans-serif';

	for (let i = 0, len = textArray.length; i < len; i++) {
		width = context.measureText(textArray[i]).width > width ? context.measureText(textArray[i]).width : width;
	}

	canvas.width = width+20;
	canvas.height = textArray.length * 60;

	context.font = parameters.font ? parameters.font : '24px sans-serif';
	for (let i = 0, len = textArray.length; i < len; i++) {
		context.fillStyle = textColor;
		context.fillText(textArray[i],20,60+ i * 60);
	}
	var texture = new THREE.Texture(canvas);
	texture.minFilter = texture.magFilter = THREE.NearestFilter;
	texture.needsUpdate = true;

	return texture;
}

//dynamic update
function updateObj(mesh, coefficient) {
	mesh.updateMatrixWorld();
	worldPosition.setFromMatrixPosition(mesh.matrixWorld);
	camera.updateMatrixWorld();
	camPosition.setFromMatrixPosition(camera.matrixWorld);
	scale = worldPosition.distanceTo(camPosition) / coefficient;
	mesh.scale.set(scale, scale, scale);
	return scale;
}

function updateText(mesh, coefficient) {
	mesh.updateMatrixWorld();		
	camera.updateMatrixWorld();
	camPosition.setFromMatrixPosition(camera.matrixWorld);
	scale = worldPosition.distanceTo(camPosition) / coefficient;
	mesh.scale.set(scale, scale, scale);
	mesh.lookAt(camPosition)		
	return scale;
}

//fit to screen
var boundx = 4, boundy = 4, boundz = 4, zoomx, zoomz, zoomy;
function zoomscale(x, y, z) {
	zoomx = 1, zoomz = 1, zoomy = 1;
	if (x > boundx) {zoomx = x / boundx}
	if (y > boundy) {zoomy = y / boundy}
	if (z > boundz) {zoomx = z / boundz}
	var max = Math.max(zoomx, zoomy, zoomz);
	console.log(max)
	return max;
}
////////////////////////////////////////////////////////////////////////////////////////////
//Nodes
function DefineNodes(x, y, z) {		//输入的都是xyz，但是画图是zyx
	var temp = new Node(x, y, z);
	Nodes[NodeNum++] = temp;
	scene.add(temp.obj);
	temp.obj.position.set(z, y, x)
	scene.add(temp.num);
	temp.num.position.set(z, y, x);
	function render() {
		updateObj(temp.obj, 10);
		updateText(temp.num, 10);
		requestAnimationFrame(render)		//控制渲染周期，注意！！！
	}
	render()
}

//Move Nodes
function MoveNodes(nodes, deltax, deltay, deltaz) {
	id = nodes.split(/[,_ ]/)
	for (var i = 0; id[i]; i++) {
		var x = parseFloat(Nodes[id[i]].x) + parseFloat(deltax);	//注意要化为数字，不然认为是字符串
		var y = parseFloat(Nodes[id[i]].y) + parseFloat(deltay);
		var z = parseFloat(Nodes[id[i]].z) + parseFloat(deltaz);
		Nodes[id[i]].x = x;
		Nodes[id[i]].y = y;
		Nodes[id[i]].z = z;
		
		Nodes[id[i]].obj.position.set(z, y, x);
		Nodes[id[i]].num.position.set(z, y, x);
	}
}

//MoveAllNodes
function MoveAllNodes(deltax, deltay, deltaz) {
	var i = 1;
	for (; i < NodeNum; i++) {
		var x = parseFloat(Nodes[i].x) + parseFloat(deltax);	//注意要化为数字，不然认为是字符串
		var y = parseFloat(Nodes[i].y) + parseFloat(deltay);
		var z = parseFloat(Nodes[i].z) + parseFloat(deltaz);
		Nodes[i].x = x;
		Nodes[i].y = y;
		Nodes[i].z = z;

		Nodes[i].obj.position.set(z, y, x);
		Nodes[i].num.position.set(z, y, x);
	}
}

//DuplicateNodes
function DuplicateNodes(nodes, deltax, deltay, deltaz, time) {
	var id = nodes.split(/[,_ ]/)
	for (var i = 1; i <= time; i++) {
		for (var j = 0; id[j]; j++) {
			var x = parseFloat(Nodes[id[j]].x) + parseFloat(deltax * i);	//注意要化为数字，不然认为是字符串
			var y = parseFloat(Nodes[id[j]].y) + parseFloat(deltay * i);
			var z = parseFloat(Nodes[id[j]].z) + parseFloat(deltaz * i);
			DefineNodes(x, y, z);
		}
	}
}

function DuplicateAllNodes(deltax, deltay, deltaz, time) {
	var temp = NodeNum
	for (var i = 1; i <= time; i++) {
		for (id = 1; id < temp;id++) {
			var x = parseFloat(Nodes[id].x) + parseFloat(deltax * i);	//注意要化为数字，不然认为是字符串
			var y = parseFloat(Nodes[id].y) + parseFloat(deltay * i);
			var z = parseFloat(Nodes[id].z) + parseFloat(deltaz * i);
			DefineNodes(x, y, z);
		}
	}
}

//RemoveNodes
function RemoveNodes(id) {
	var i = parseInt(id[0]), j = 0;
	NodeNum -= id.length;
	for (; i < NodeNum; i++) {		//注意字符转数字
		while ((i + j + 1 != id[j + 1]) && i < NodeNum) {
			console.log(i,i+j+1,id.length,NodeNum)
			Nodes[i].x = Nodes[i + j + 1].x;
			Nodes[i].y = Nodes[i + j + 1].y;
			Nodes[i].z = Nodes[i + j + 1].z;
			Nodes[i].attach = Nodes[i + j + 1].attach;
			var x = Nodes[i].x, y = Nodes[i].y, z = Nodes[i].z
			Nodes[i].obj.position.set(z, y, x);
			Nodes[i].num.position.set(z, y, x);
			i++;
		}
		j++;
		if (i + j == id[j])
			i--;
	}
	//remove remaining nodes
	for (i = NodeNum; i < NodeNum + id.length; i++) {
		scene.remove(Nodes[i].obj)
		scene.remove(Nodes[i].num)
		clearCache(Nodes[i].num)
		clearCache(Nodes[i].obj)
		Nodes[i].delete()
	}
}

//AllUnattached
function RemoveAllUnattached() {
	var id =[];
	for (var i = 1; i < NodeNum; i++) {
		if (Nodes[i].attach == 0)
			id.push(i);
	}
	RemoveNodes(id);
}
////////////////////////////////////////////////////////////////////////////////////////////
//Elements
function DefineElements(i, j) {
	Nodes[i].attach = 1;
	Nodes[j].attach = 1;
	var temp = new Element(i, j);
	Elements[ElementNum++] = temp;
	temp.obj.computeLineDistances();
	scene.add(temp.obj)
	scene.add(temp.num);
	var x = (parseFloat(Nodes[i].z) + parseFloat(Nodes[j].z))/ 2;
	var y = (parseFloat(Nodes[i].y) + parseFloat(Nodes[j].y)) / 2;
	var z = (parseFloat(Nodes[i].x) + parseFloat(Nodes[j].x)) / 2;
	temp.num.position.set(x,y,z)
	
	function render() {
		updateText(temp.num, 10);
		requestAnimationFrame(render)
	}
	render()
}

//Duplicate Elements
function DuplicateElements(elements,deltax,deltay,deltaz,time) {
	var id = elements.split(/[,_ ]/)
	for (var i = 1; i <= time; i++) { 
		for (var j = 0; id[j]; j++) {
			var node1 = Elements[id[j]].node1, node2 = Elements[id[j]].node2;
			var x1 = parseFloat(Nodes[node1].x) + parseFloat(deltax * i);	//注意要化为数字，不然认为是字符串
			var y1 = parseFloat(Nodes[node1].y) + parseFloat(deltay * i);
			var z1 = parseFloat(Nodes[node1].z) + parseFloat(deltaz * i);
			var x2 = parseFloat(Nodes[node2].x) + parseFloat(deltax * i);	//注意要化为数字，不然认为是字符串
			var y2 = parseFloat(Nodes[node2].y) + parseFloat(deltay * i);
			var z2 = parseFloat(Nodes[node2].z) + parseFloat(deltaz * i);
			var flag1 = 0, flag2 = 0;
			var node3, node4;
			for (var k = 1; k < NodeNum; k++) {
				if (x1 == Nodes[k].x && y1 == Nodes[k].y && z1 == Nodes[k].z) {
					flag1 = 1;
					node3 = k;
					break;
				}
			}
			for (var k = 1; k < NodeNum; k++) {
				if (x2 == Nodes[k].x && y2 == Nodes[k].y && z2 == Nodes[k].z) {
					flag2 = 1;
					node4 = k;
					break;
				}
			}
			if (flag1 == 0) {
				DefineNodes(x1, y1, z1);
				node3 = NodeNum - 1;
			}
			if (flag2 == 0) {
				DefineNodes(x2, y2, z2);
				node4 = NodeNum - 1;
			}
			DefineElements(node3, node4);
			Nodes[node3].attach = 1;
			Nodes[node4].attach = 1;
		}
	}
}
function DuplicateAllElements(deltax, deltay, deltaz, time) {
	var temp = ElementNum;
	for (var i = 1; i <= time; i++) {
		for (var j = 1; j<temp; j++) {
			var node1 = Elements[j].node1, node2 = Elements[j].node2;
			var x1 = parseFloat(Nodes[node1].x) + parseFloat(deltax * i);
			var y1 = parseFloat(Nodes[node1].y) + parseFloat(deltay * i);
			var z1 = parseFloat(Nodes[node1].z) + parseFloat(deltaz * i);
			var x2 = parseFloat(Nodes[node2].x) + parseFloat(deltax * i);	//注意要化为数字，不然认为是字符串
			var y2 = parseFloat(Nodes[node2].y) + parseFloat(deltay * i);
			var z2 = parseFloat(Nodes[node2].z) + parseFloat(deltaz * i);
			var flag1 = 0, flag2 = 0;
			var node3, node4;
			for (var k = 1; k < NodeNum; k++) {
				if (x1 == Nodes[k].x && y1 == Nodes[k].y && z1 == Nodes[k].z) {
					flag1 = 1;
					node3 = k;
					break;
				}
			}
			for (var k = 1; k < NodeNum; k++) {		//避免一个位置生成多个点
				if (x2 == Nodes[k].x && y2 == Nodes[k].y && z2 == Nodes[k].z) {
					flag2 = 1;
					node4 = k;
					break;
				}
			}
			if (flag1 == 0) {
				DefineNodes(x1, y1, z1);
				node3 = NodeNum - 1;
			}
			if (flag2 == 0) {
				DefineNodes(x2, y2, z2);
				node4 = NodeNum - 1;
			}
			DefineElements(node3, node4);
			Nodes[node3].attach = 1;
			Nodes[node4].attach = 1;
		}
	}
}
//RemoveElements
function RemoveElements(id) {
	var i = parseInt(id[0]),j = 0
	ElementNum -= id.length
	//先往前挤
	for (; i < ElementNum; i++) {		//注意字符转数字
		while ((i + j + 1 != id[j + 1])&& i < ElementNum) {
			Nodes[Elements[i].node1].attach--;
			Nodes[Elements[i].node2].attach--;

			var node1 = Elements[i + j + 1].node1,
				node2 = Elements[i + j + 1].node2;
			Elements[i].node1 = node1;
			Elements[i].node2 = node2;

			//要代替的杆件
			var lineGeometry = new THREE.Geometry();//生成几何体
			var x0 = Nodes[node1].x, x1 = Nodes[node2].x;
			var y0 = Nodes[node1].y, y1 = Nodes[node2].y;
			var z0 = Nodes[node1].z, z1 = Nodes[node2].z;
			lineGeometry.vertices.push(new THREE.Vector3(z0, y0, x0));//线段的两个顶点
			lineGeometry.vertices.push(new THREE.Vector3(z1, y1, x1));
			scene.remove(Elements[i].obj)
			delete Elements[i].obj;
			clearCache(Elements[i].obj)
			Elements[i].obj = new THREE.Line(lineGeometry, new THREE.LineDashedMaterial({
				color: 0xffffff,
				dashSize: 0.5,
				gapSize: 0.1
			}));
			Elements[i].obj.computeLineDistances();
			scene.add(Elements[i].obj)

			var x = (parseFloat(x0) + parseFloat(x1)) / 2;
			var y = (parseFloat(y0) + parseFloat(y1)) / 2;
			var z = (parseFloat(z0) + parseFloat(z1)) / 2;
			Elements[i].num.position.set(z, y, x);
			i++;
		}
		j++;
		if (i+j == id[j])
			i--;
	}
	//删除剩下的
	for (i = ElementNum; i < ElementNum + id.length; i++) {
		scene.remove(Elements[i].obj)
		scene.remove(Elements[i].num)
		clearCache(Elements[i].num)
		clearCache(Elements[i].obj)
		Elements[i].delete();
	}
}

function RemoveAllElements() {
	for (i = 1; i < ElementNum ; i++) {
		scene.remove(Elements[i].obj)
		scene.remove(Elements[i].num)
		clearCache(Elements[i].num)
		clearCache(Elements[i].obj)
		Elements[i].delete();
	}
	for (var i = 1; i < NodeNum;i++)
		Nodes[i].attach = 0;
	ElementNum = 1;
}

function RemoveZero() {
	var id = [];
	for (var i = 1; i < ElementNum; i++) {
		var node1 = Elements[i].node1, node2 = Elements[i].node2;
		if (Nodes[node1].x == Nodes[node2].x && Nodes[node1].y == Nodes[node2].y && Nodes[node1].z == Nodes[node2].z)
			id.push(i);
	}
	RemoveElements(id);
}

function MergeCoincident() {
	var id = [];
	for (var i = 1; i < ElementNum; i++) {
		var node1 = Elements[i].node1, node2 = Elements[i].node2;
		for (var j = i; j < ElementNum; j++) {
			if (i == j)
				continue;
			var node3 = Elements[i].node1, node4 = Elements[i].node2;
			if ((node1 == node3 && node2 == node4) || (node1 == node4 && node2 == node3))
				id.push(j);
		}
	}
	RemoveElements(id);
}
////////////////////////////////////////////////////////////////////////////////////////////
//Section
function DefineSection(name, group) {
	var temp = new Section(name, group);
	Sections[SectionNum++] = temp;
	if (parent.document.getElementById("section"))
		parent.document.getElementById("section").value = "Section " +SectionNum
}

function ModifySection(id, name, group) {
	delete (Sections[id])		//需要删除再赋值
	var temp=new Section(name,group)
	Sections[id] = temp;
	console.log("modify successfully")
}

function SelectSection(num) {
	parent.document.getElementById("name").value = Sections[num].name
	if (parent.document.getElementById("Ysc")) {
		parent.document.getElementById("Area").value = Sections[num].group[0]
		parent.document.getElementById("I z-z").value = Sections[num].group[1]
		parent.document.getElementById("I y-y").value = Sections[num].group[2]
		parent.document.getElementById("J").value = Sections[num].group[3]
		parent.document.getElementById("Cw").value = Sections[num].group[4]
		parent.document.getElementById("Iyz").value = Sections[num].group[5]
		parent.document.getElementById("Ysc").value = Sections[num].group[6]
		parent.document.getElementById("Zsc").value = Sections[num].group[7]
		parent.document.getElementById("BetaV").value = Sections[num].group[8]
		parent.document.getElementById("BetaW").value = Sections[num].group[9]
		parent.document.getElementById("Betaw").value = Sections[num].group[10]
		parent.document.getElementById("Z w-w").value = Sections[num].group[11]
		parent.document.getElementById("Z v-v").value = Sections[num].group[12]
		parent.document.getElementById("A w-w").value = Sections[num].group[13]
		parent.document.getElementById("A v-v").value = Sections[num].group[14]
	}
	else {
		parent.document.getElementById("Area").value = Sections[num].group[0]
		parent.document.getElementById("I z-z").value = Sections[num].group[1]
		parent.document.getElementById("I y-y").value = Sections[num].group[2]
		parent.document.getElementById("J").value = Sections[num].group[3]
		parent.document.getElementById("Cw").value = Sections[num].group[4]
		parent.document.getElementById("Z z-z").value = Sections[num].group[5]
		parent.document.getElementById("Z y-y").value = Sections[num].group[6]
		parent.document.getElementById("A y-y").value = Sections[num].group[7]
		parent.document.getElementById("A z-z").value = Sections[num].group[8]
	}
}

function RemoveSection(value) {
	SectionNum -= 1;
	var i = parseInt(value);
	for (; i < SectionNum; i++) {		//注意字符转数字
		delete (Sections[i])		//需要删除再赋值
		var temp = new Section(Sections[i + 1].name, Sections[i + 1].group)
		Sections[i] = temp;
	}
	Sections[SectionNum].delete()
}

function AttachSection(section,element) {
	//赋予属性
	for (var i = 0; i < element.length; i++) 
		Elements[element[i]].section = section;
	console.log("attach successfully!")
}

function AttachAll(section) {
	//赋予属性
	for (var i = 1; i < ElementNum; i++)
		Elements[i].section = section;
	console.log("attach successfully!")
}
////////////////////////////////////////////////////////////////////////////////////////////
//Material
function DefineMaterial(name,E,v,Fy,Wt) {
	var temp = new Material(name, E, v, Fy, Wt);
	Materials[MaterialNum++] = temp;
	if (parent.document.getElementById("material"))
		parent.document.getElementById("material").value = "Material " + MaterialNum
}

function SelectMaterial(num) {
	parent.document.getElementById("name").value = Materials[num].name
	parent.document.getElementById("E").value = Materials[num].E
	parent.document.getElementById("v").value = Materials[num].v
	parent.document.getElementById("Fy").value = Materials[num].Fy
	parent.document.getElementById("Wt").value = Materials[num].Wt
}

function ModifyMaterial(id,name,E,v,Fy,Wt) {
	delete (Materials[id])		//需要删除再赋值
	var temp = new Material(name,E,v,Fy,Wt)
	Materials[id] = temp;
	console.log("modify successfully")
}

function RemoveMaterial(value) {
	MaterialNum -= 1;
	var i = parseInt(value);
	for (; i < MaterialNum; i++) {		//注意字符转数字
		delete (Materials[i])		//需要删除再赋值
		var temp = new Material(Materials[i + 1].name, Materials[i + 1].E, Materials[i + 1].v, Materials[i + 1].Fy, Materials[i + 1].Wt)
		Materials[i] = temp;
	}
	Materials[MaterialNum].delete()
}

function AttachMaterial(material, element) {
	//赋予属性
	for (var i = 0; i < element.length; i++)
		Elements[element[i]].material = material;
	console.log("attach successfully!")
}

function AttachAll2(material) {
	//赋予属性
	for (var i = 1; i < ElementNum; i++)
		Elements[i].material = material;
	console.log("attach successfully!")
}
////////////////////////////////////////////////////////////////////////////////////////////
//output
function GeometryData() {
	var data = { NODE: [], MEMBER: [], SECTION: [], MATERIAL: [] };
	for (var i = 1; i < NodeNum; i++) {
		data.NODE[i - 1] = [i, Nodes[i].x, Nodes[i].y, Nodes[i].z]
	}
	for (var i = 1; i < ElementNum; i++) {
		data.MEMBER[i - 1] = [i, Elements[i].section,Elements[i].material,Elements[i].node1, Elements[i].node2]
	}
	for (var i = 1; i < SectionNum; i++) {
		data.SECTION[i - 1] = [i,Sections[i].name,Sections[i].group]
	}
	for (var i = 1; i < MaterialNum; i++) {
		data.MATERIAL[i - 1] = [i, Materials[i].name, Materials[i].E, Materials[i].v, Materials[i].Fy, Materials[i].Wt]
	}
	return data;
}

