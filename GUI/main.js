function getid(value) {
	return document.getElementById(value)
}

function Cancel() {
	var div = document.getElementById("bottom")
	div.innerHTML = ``
}

////////////////////////////////////////////////////////////////////////////////////////////
//Define Nodes
function DefineNodes() {		
	var x = document.getElementById("x").value
	var y = document.getElementById("y").value
	var z = document.getElementById("z").value
	if (x && y && z) {
		document.getElementById("center").contentWindow.DefineNodes(x, y, z)
		document.getElementById("status").value =""
	}
	else {
		document.getElementById("status").value ="Blanks NOT Acceptable!"
	}
}
////////////////////////////////////////////////////////////////////////////////////////////
//Move Nodes
function MoveNodes() {
	var node = document.getElementById("node").value
	var x = document.getElementById("x").value
	var y = document.getElementById("y").value
	var z = document.getElementById("z").value
	if (x && y && z && node) {
		document.getElementById("center").contentWindow.MoveNodes(node, x, y, z)
		document.getElementById("status").value = ""
	}
	else {
		document.getElementById("status").value = "Blanks NOT Acceptable!"
	}
}

function MoveAll() {
	var div = document.getElementById("All")
	div.innerHTML = `
	<input class="disabled" style="width:20%" type="text" readonly disabled="disabled" value="Node(s)">&nbsp;<input type="text" id="node" style="width:60%" class="able" value="All">
`
	var div2 = document.getElementById("ApplyCancel")
	div2.innerHTML =`<div id="ApplyCancel"><button class="button" onclick="MoveAllNodes()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>`
}

function MoveClr() {
	var div = document.getElementById("All")
	div.innerHTML = `
	<input class="disabled" style="width:20%" type="text" readonly disabled="disabled" value="Node(s)">&nbsp;<input type="text" id="node" style="width:60%" class="able">
`
	var div2 = document.getElementById("ApplyCancel")
	div2.innerHTML = `<div id="ApplyCancel"><button class="button" onclick="MoveNodes()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>`
}

function MoveAllNodes() {
	var x = document.getElementById("x").value
	var y = document.getElementById("y").value
	var z = document.getElementById("z").value
	if (x && y && z ) {
		document.getElementById("center").contentWindow.MoveAllNodes(x, y, z)
		document.getElementById("status").value = ""
	}
	else {
		document.getElementById("status").value = "Blanks NOT Acceptable!"
	}
}
////////////////////////////////////////////////////////////////////////////////////////////
//DuplicateNodes
function DuplicateNodes() {
	//这里的xyz可能都包含了“ ”，使用时注意排除
	var node = document.getElementById("node").value
	var x = document.getElementById("x").value
	var y = document.getElementById("y").value
	var z = document.getElementById("z").value
	var time = document.getElementById("time").value
	if (x && y && z && node) {
		document.getElementById("center").contentWindow.DuplicateNodes(node, x, y, z,time)
		document.getElementById("status").value = ""
	}
	else {
		document.getElementById("status").value = "Blanks NOT Acceptable!"
	}
}

function DuplicateAll() {
	var div = document.getElementById("All")
	//$(document).find("#bottom").attr("style", "margin-top:760px")//注意这里的用法，其他的很多都不可行
	div.innerHTML = `
	<input class="disabled" style="width:20%" type="text" readonly disabled="disabled" value="Node(s)">&nbsp;<input type="text" id="node" style="width:60%" class="able" value="All">
`
	var div2 = document.getElementById("ApplyCancel")
	div2.innerHTML = `<div id="ApplyCancel"><button class="button" onclick="DuplicateAllNodes()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>`
}

function DuplicateClr() {
	var div = document.getElementById("All")
	div.innerHTML = `
	<input class="disabled" style="width:20%" type="text" readonly disabled="disabled" value="Node(s)">&nbsp;<input type="text" id="node" style="width:60%" class="able">
`
	var div2 = document.getElementById("ApplyCancel")
	div2.innerHTML = `<div id="ApplyCancel"><button class="button" onclick="DuplicateNodes()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>`
}

function DuplicateAllNodes() {
	var x = document.getElementById("x").value
	var y = document.getElementById("y").value
	var z = document.getElementById("z").value
	var time = document.getElementById("time").value
	if (x && y && z) {
		document.getElementById("center").contentWindow.DuplicateAllNodes(x, y, z,time)
		document.getElementById("status").value = ""
	}
	else {
		document.getElementById("status").value = "Blanks NOT Acceptable!"
	}
}

function TimeDecrease() {
	var time = document.getElementById("time").value
	if (time > 1) time--;
	document.getElementById("time").value = time
}

function TimeIncrease() {
	var time = document.getElementById("time").value
	time++;
	document.getElementById("time").value=time
}
////////////////////////////////////////////////////////////////////////////////////////////
//Remove
function RemoveNodes() {
	var node = document.getElementById("node").value
	var id = node.split(/[,_ ]/)
	if (id) {
		document.getElementById("center").contentWindow.RemoveNodes(id)
		document.getElementById("status").value = ""
	}
	else {
		document.getElementById("status").value = "Blanks NOT Acceptable!"
	}
}

//AllUnattached
function AllUnattached() {
	document.getElementById("node").value = `All Unattached`
	document.getElementById("ApplyCancel").innerHTML =`<button class="button" onclick="RemoveAllUnattached()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button>`
}

function AllUnattachedClr() {
	document.getElementById("node").value = ``
	document.getElementById("ApplyCancel").innerHTML = `<button class="button" onclick="RemoveNodes()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button>`
}

function RemoveAllUnattached() {
	document.getElementById("center").contentWindow.RemoveAllUnattached();
}
////////////////////////////////////////////////////////////////////////////////////////////









//Elements
function DefineElements() {
	var i = document.getElementById("Nodei").value
	var j = document.getElementById("Nodej").value
	document.getElementById("center").contentWindow.DefineElements(i, j)
}
////////////////////////////////////////////////////////////////////////////////////////////
//DuplicateElements
function DuplicateElements() {
	//这里的xyz可能都包含了“ ”，使用时注意排除
	var element = document.getElementById("element").value
	var x = document.getElementById("x").value
	var y = document.getElementById("y").value
	var z = document.getElementById("z").value
	var time = document.getElementById("time").value
	if (x && y && z && element) {
		document.getElementById("center").contentWindow.DuplicateElements(element, x, y, z, time)
		document.getElementById("status").value = ""
	}
	else {
		document.getElementById("status").value = "Blanks NOT Acceptable!"
	}
}

function DuplicateAllE() {
	var div = document.getElementById("All")
	//$(document).find("#bottom").attr("style", "margin-top:760px")//注意这里的用法，其他的很多都不可行
	div.innerHTML = `
	<input class="disabled" style="width:20%" type="text" readonly disabled="disabled" value="Elements(s)">&nbsp;<input type="text" id="element" style="width:60%" class="able" value="All">
`
	var div2 = document.getElementById("ApplyCancel")
	div2.innerHTML = `<div id="ApplyCancel"><button class="button" onclick="DuplicateAllElements()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>`
}

function DuplicateClrElements() {
	var div = document.getElementById("All")
	div.innerHTML = `
	<input class="disabled" style="width:20%" type="text" readonly disabled="disabled" value="Elements(s)">&nbsp;<input type="text" id="element" style="width:60%" class="able">
`
	var div2 = document.getElementById("ApplyCancel")
	div2.innerHTML = `<div id="ApplyCancel"><button class="button" onclick="DuplicateNodes()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>`
}

function DuplicateAllElements() {
	var x = document.getElementById("x").value
	var y = document.getElementById("y").value
	var z = document.getElementById("z").value
	var time = document.getElementById("time").value
	if (x && y && z) {
		document.getElementById("center").contentWindow.DuplicateAllElements(x, y, z, time)
		document.getElementById("status").value = ""
	}
	else {
		document.getElementById("status").value = "Blanks NOT Acceptable!"
	}
}
////////////////////////////////////////////////////////////////////////////////////////////
//RemoveElements
function RemoveSelect(value) {
	if (value == "1") {
		document.getElementById("select").innerHTML =
			`<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Elements(s)">&nbsp;<input  class="able" style="width:70%;"type="text" id="element" ></div>
					<div><button class="button" onclick="RemoveAll()" style="width:30%">All</button><button class="button" onclick="RemoveAllClr()"style="width:30%" >Clr</button><button class="button" onclick="Adv()" style="width:30%">Adv</button></div>`
		document.getElementById("ApplyCancel").innerHTML =`<button class="button" onclick="RemoveElements()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button>`
	}
	else if (value == "2") {
		document.getElementById("select").innerHTML = ``
		document.getElementById("ApplyCancel").innerHTML = `<button class="button" onclick="RemoveZero()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button>`
	}
	else if (value == "3") {
		document.getElementById("select").innerHTML = ``
		document.getElementById("ApplyCancel").innerHTML = `<button class="button" onclick="MergeCoincident()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button>`
	}
}

function RemoveElements() {
	var element = document.getElementById("element").value
	var id = element.split(/[,_ ]/)
	if (id) {
		document.getElementById("center").contentWindow.RemoveElements(id)
		document.getElementById("status").value = ""
	}
	else 
		document.getElementById("status").value = "Blanks NOT Acceptable!"
}

function RemoveAll() {
	var div = document.getElementById("element")
	//$(document).find("#bottom").attr("style", "margin-top:760px")//注意这里的用法，其他的很多都不可行
	div.value ="All"
	var div2 = document.getElementById("ApplyCancel")
	div2.innerHTML = `<div id="ApplyCancel"><button class="button" onclick="RemoveAllElements()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>`
}

function RemoveAllClr() {
	var div = document.getElementById("element")
	div.value = ""
	var div2 = document.getElementById("ApplyCancel")
	div2.innerHTML = `<div id="ApplyCancel"><button class="button" onclick="RemoveElements()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>`
}

function RemoveAllElements() {
		document.getElementById("center").contentWindow.RemoveAllElements()
}

function RemoveZero() {
	document.getElementById("center").contentWindow.RemoveZero()
}

function MergeCoincident() {
	document.getElementById("center").contentWindow.MergeCoincident()
}
////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////
//DefineSection
function BorA(value) {
	console.log(value)
	if (value == "1") {
		$(window.parent.document).find("#bottom").attr("style", "margin-top:700px")//注意这里的用法，其他的很多都不可行
		document.getElementById("bottom").innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 25% 10% 25% 10% 30%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Please enter coordinates of node"></div>
				<div><input class="disabled" disabled="disabled"  style="width:80%" readonly value="Section 1" id="section"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Name">&nbsp;<input  class="able" style="width:70%;"type="text" id="name" ></div>
				<div><span style="margin-left:2%;background-color:lightgrey"><input type="radio" style="font-size:15px">Database&emsp;&emsp;&emsp;</span></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 18% 18% 18% 18% 18% 10%;background-color:grey;margin-top:1px;margin-bottom:1px;">
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Area">&nbsp;<input  class="able" style="width:50%;"type="text" id="Area" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I z-z">&nbsp;<input  class="able" style="width:50%;"type="text" id="I z-z" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I y-y">&nbsp;<input  class="able" style="width:50%;"type="text" id="I y-y" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="J">&nbsp;<input  class="able" style="width:50%;"type="text" id="J" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Cw">&nbsp;<input  class="able" style="width:50%;"type="text" id="Cw" ></div>
				<div>
					<select style="outline:none;width:90%" onchange="BorA(this.value)">
						<option>Select</option>
						<option value="1">Basic</option>
						<option value="2">Advanced</option>
					</select>
				</div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z z-z">&nbsp;<input  class="able" style="width:50%;"type="text" id="Z z-z" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z y-y">&nbsp;<input  class="able" style="width:50%;"type="text" id="Z y-y" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A y-y">&nbsp;<input  class="able" style="width:50%;"type="text" id="A y-y" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A z-z">&nbsp;<input  class="able" style="width:50%;"type="text" id="A z-z" ></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="DefineSection()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>

`
	}
	else if (value == "2" ) {
		$(window.parent.document).find("#bottom").attr("style", "margin-top:700px")//注意这里的用法，其他的很多都不可行
		document.getElementById("bottom").innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 25% 10% 25% 10% 30%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Please enter coordinates of node"></div>
				<div><input class="disabled" disabled="disabled"  style="width:80%" readonly value="Section 1" id="section"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Name">&nbsp;<input  class="able" style="width:70%;"type="text" id="name" ></div>
				<div id="ApplyCancel"><button class="button" onclick="MSASect()" style="width:80%">MSASect</button></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 18% 18% 18% 18% 18% 10%;background-color:grey;margin-top:1px;margin-bottom:1px;">
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Area">&nbsp;<input  class="able" style="width:50%;"type="text" id="Area" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I z-z">&nbsp;<input  class="able" style="width:50%;"type="text" id="I z-z" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I y-y">&nbsp;<input  class="able" style="width:50%;"type="text" id="I y-y" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="J">&nbsp;<input  class="able" style="width:50%;"type="text" id="J" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Cw">&nbsp;<input  class="able" style="width:50%;"type="text" id="Cw" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Iyz">&nbsp;<input  class="able" style="width:50%;"type="text" id="Iyz" ></div>
			</div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 18% 18% 18% 18% 18% 10%;background-color:grey;margin-top:1px;margin-bottom:1px;">
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Ysc">&nbsp;<input  class="able" style="width:50%;"type="text" id="Ysc" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Zsc">&nbsp;<input  class="able" style="width:50%;"type="text" id="Zsc" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="BetaV">&nbsp;<input  class="able" style="width:50%;"type="text" id="BetaV" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="BetaW">&nbsp;<input  class="able" style="width:50%;"type="text" id="BetaW" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Betaw">&nbsp;<input  class="able" style="width:50%;"type="text" id="Betaw" ></div>
				<div>
					<select style="outline:none;width:90%" onchange="BorA(this.value)">
						<option>Select</option>
						<option value="1">Basic</option>
						<option value="2">Advanced</option>
					</select>
				</div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z w-w">&nbsp;<input  class="able" style="width:50%;"type="text" id="Z w-w" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z v-v">&nbsp;<input  class="able" style="width:50%;"type="text" id="Z v-v" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A v-v">&nbsp;<input  class="able" style="width:50%;"type="text" id="A v-v" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A w-w">&nbsp;<input  class="able" style="width:50%;"type="text" id="A w-w" ></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div id="ApplyCancel"><button class="button" onclick="DefineSection()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
		</div>
`
	}	  //如果选择之后没有改变顺序  那么默认的basic就无法onchange
	document.getElementById("section").value = "Section " + document.getElementById("center").contentWindow.SectionNum
}

function MSASect() {
	ipcRenderer.send("MSASect")
}

function DefineSection() {
	var name = document.getElementById("name").value
	if (name == "") {
		document.getElementById("status").value = "Blanks NOT acceptable!"
		return;
	}
	if (document.getElementById("Ysc")) {
		var Area = document.getElementById("Area").value
		var Izz = document.getElementById("I z-z").value
		var Iyy = document.getElementById("I y-y").value
		var J = document.getElementById("J").value
		var Cw = document.getElementById("Cw").value
		var Iyz = document.getElementById("Iyz").value
		var Ysc = document.getElementById("Ysc").value
		var Zsc = document.getElementById("Zsc").value
		var BetaV = document.getElementById("BetaV").value
		var BetaW = document.getElementById("BetaW").value
		var Betaw = document.getElementById("Betaw").value
		var Zww = document.getElementById("Z w-w").value
		var Zvv = document.getElementById("Z v-v").value
		var Aww = document.getElementById("A w-w").value
		var Avv = document.getElementById("A v-v").value
		if (Area == "" || Izz == "" || Iyy == "" || J == "" || Cw == "" ||Iyz==""|| Ysc == "" || Zsc == "" || BetaV
			== "" || BetaW == "" || Betaw == "" || Zww == "" || Zvv == "" || Aww == "" || Avv == "") {
			document.getElementById("status").value = "Blanks NOT acceptable!"
		}
		else {
			var group = new Array()
			group = [Area, Izz, Iyy, J, Cw, Iyz, Ysc, Zsc, BetaV, BetaW, Betaw, Zww, Zvv, Aww, Avv]
			document.getElementById("center").contentWindow.DefineSection(name, group);
			document.getElementById("status").value = ""
		}
	}
	else {
		var Area = document.getElementById("Area").value
		var Izz = document.getElementById("I z-z").value
		var Iyy = document.getElementById("I y-y").value
		var J = document.getElementById("J").value
		var Cw = document.getElementById("Cw").value
		var Zzz = document.getElementById("Z z-z").value
		var Zyy = document.getElementById("Z y-y").value
		var Ayy = document.getElementById("A y-y").value
		var Azz = document.getElementById("A z-z").value
		if (Area == "" || Izz == "" || Iyy == "" || J == "" || Cw == "" || 
			Zzz == "" || Zyy == "" || Ayy == "" || Azz == "") {
			document.getElementById("status").value = "Blanks NOT acceptable!"
		}
		else {
			var group = new Array()
			group = [Area, Izz, Iyy, J, Cw, Zzz, Zyy, Ayy, Azz]
			document.getElementById("center").contentWindow.DefineSection(name, group);
			document.getElementById("status").value = ""
		}
	}
}
////////////////////////////////////////////////////////////////////////////////////////////
//Modify Section
function BorA2(value) {
	console.log(value)
	if (value == "1" ) {
		$(window.parent.document).find("#bottom").attr("style", "margin-top:700px")//注意这里的用法，其他的很多都不可行
		document.getElementById("bottom").innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 25% 10% 25% 10% 30%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Select Section # and modify properties"></div>
				<div><select id="select" class="button" style="width:80%" onchange="SelectSection(this.value)">
				<option>Select</option>
				</select></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Name">&nbsp;<input  class="able" style="width:70%;"type="text" id="name" ></div>
				<div><span style="margin-left:2%;background-color:lightgrey"><input type="radio" style="font-size:15px">Database&emsp;&emsp;&emsp;</span></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div id="change">
				<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 18% 18% 18% 18% 18% 10%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Area">&nbsp;<input  id="Area"  class="able" style="width:50%;"type="text"></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I z-z">&nbsp;<input id="I z-z"  class="able" style="width:50%;"type="text"></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I y-y">&nbsp;<input id="I y-y"  class="able" style="width:50%;"type="text"></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="J">&nbsp;<input  id="J" class="able" style="width:50%;"type="text"></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Cw">&nbsp;<input id="Cw"  class="able" style="width:50%;"type="text"></div>
					<div>
						<select style="outline:none;width:90%" onchange="BorA2(this.value)">
							<option>Select</option>
							<option value="1">Basic</option>
							<option value="2">Advanced</option>
						</select>
					</div>
				</div>
				<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
					<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey;margin-top:1px;margin-bottom:1px;">
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z z-z">&nbsp;<input id="Z z-z" class="able" style="width:50%;"type="text" ></div>
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z y-y">&nbsp;<input id="Z y-y"  class="able" style="width:50%;"type="text" ></div>
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A y-y">&nbsp;<input id="A y-y"  class="able" style="width:50%;"type="text" ></div>
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A z-z">&nbsp;<input id="A z-z"  class="able" style="width:50%;"type="text" ></div>
					</div>
					<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
						<div></div>
						<div><button class="button" onclick="ModifySection()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
					</div>
				</div>
			</div>
		</div>
`
	}
	else if (value == "2" ) {
		$(window.parent.document).find("#bottom").attr("style", "margin-top:700px")//注意这里的用法，其他的很多都不可行
		document.getElementById("bottom").innerHTML = `
		<div>
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 25% 10% 25% 10% 30%;background-color:grey">
				<div><input class="disabled" disabled="disabled"  style="width:90%" readonly value="Select Section # and modify properties"></div>
				<div><select id="select" class="button" style="width:80%" onchange="SelectSection(this.value)">
				<option>Select</option>
				</select></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Name">&nbsp;<input  class="able" style="width:70%;"type="text" id="name" ></div>
				<div><span style="margin-left:2%;background-color:lightgrey"><input type="radio" style="font-size:15px">Database&emsp;&emsp;&emsp;</span></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Status:">&nbsp;<input class="disabled" disabled="disabled" style="width:70%"type="text" readonly id="status" value="Blanks NOT Acceptable!"></div>
			</div>
			<div id="change">
				<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 18% 18% 18% 18% 18% 10%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Area">&nbsp;<input  class="able" style="width:50%;"type="text" id="Area" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I z-z">&nbsp;<input  class="able" style="width:50%;"type="text" id="I z-z" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I y-y">&nbsp;<input  class="able" style="width:50%;"type="text" id="I y-y" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="J">&nbsp;<input  class="able" style="width:50%;"type="text" id="J" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Cw">&nbsp;<input  class="able" style="width:50%;"type="text" id="Cw" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Iyz">&nbsp;<input  class="able" style="width:50%;"type="text" id="Iyz" ></div>
				</div>
				<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 18% 18% 18% 18% 18% 10%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Ysc">&nbsp;<input  class="able" style="width:50%;"type="text" id="Ysc" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Zsc">&nbsp;<input  class="able" style="width:50%;"type="text" id="Zsc" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="BetaV">&nbsp;<input  class="able" style="width:50%;"type="text" id="BetaV" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="BetaW">&nbsp;<input  class="able" style="width:50%;"type="text" id="BetaW" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Betaw">&nbsp;<input  class="able" style="width:50%;"type="text" id="Betaw" ></div>
					<div>
						<select style="outline:none;width:90%" onchange="BorA2(this.value)">
							<option>Select</option>
							<option value="1">Basic</option>
							<option value="2">Advanced</option>
						</select>
					</div>
				</div>
				<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
					<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey;margin-top:1px;margin-bottom:1px;">
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z w-w">&nbsp;<input  class="able" style="width:50%;"type="text" id="Z w-w" ></div>
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z v-v">&nbsp;<input  class="able" style="width:50%;"type="text" id="Z v-v" ></div>
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A v-v">&nbsp;<input  class="able" style="width:50%;"type="text" id="A v-v" ></div>
						<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A w-w">&nbsp;<input  class="able" style="width:50%;"type="text" id="A w-w" ></div>
					</div>
					<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
						<div></div>
						<div id="ApplyCancel"><button class="button" onclick="RemoveElements()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
					</div>
				</div>
			</div>
		</div>
`
	}	  //如果选择之后没有改变顺序  那么默认的basic就无法onchange
	var SectionNum = document.getElementById("center").contentWindow.SectionNum;
	for (var i = 1; i < SectionNum; i++)
		$("#select").append("<option value='" + i + "'>" + i + "</option>");
}

function ModifySection() {
	var myselect = document.getElementById("select");
	var index = myselect.selectedIndex; // selectedIndex所选中项的index
	var value = myselect.options[index].value;
	if (document.getElementById("Ysc")) {
		var name = document.getElementById("name").value
		var Area = document.getElementById("Area").value
		var Izz = document.getElementById("I z-z").value
		var Iyy = document.getElementById("I y-y").value
		var J = document.getElementById("J").value
		var Cw = document.getElementById("Cw").value
		var Iyz = document.getElementById("Iyz").value
		var Ysc = document.getElementById("Ysc").value
		var Zsc = document.getElementById("Zsc").value
		var BetaV = document.getElementById("BetaV").value
		var BetaW = document.getElementById("BetaW").value
		var Betaw = document.getElementById("Betaw").value
		var Zww = document.getElementById("Z w-w").value
		var Zvv = document.getElementById("Z v-v").value
		var Aww = document.getElementById("A w-w").value
		var Avv = document.getElementById("A v-v").value
		var group = new Array()
		group = [Area, Izz, Iyy, J, Cw,Iyz,Ysc, Zsc, BetaV, BetaW, Betaw, Zww, Zvv, Aww, Avv]
	}
	else {
		var name = document.getElementById("name").value
		var Area = document.getElementById("Area").value
		var Izz = document.getElementById("I z-z").value
		var Iyy = document.getElementById("I y-y").value
		var J = document.getElementById("J").value
		var Cw = document.getElementById("Cw").value
		var Zzz = document.getElementById("Z z-z").value
		var Zyy = document.getElementById("Z y-y").value
		var Ayy = document.getElementById("A y-y").value
		var Azz = document.getElementById("A z-z").value
		var group = new Array()
		group = [Area, Izz, Iyy, J, Cw, Zzz, Zyy, Ayy, Azz]
	}
	document.getElementById("center").contentWindow.ModifySection(value, name, group);
}

function SelectSection(value) {
	if (document.getElementById("center").contentWindow.Sections[value].group.length == 9) {
		document.getElementById("change").innerHTML = `
			<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 18% 18% 18% 18% 18% 10%;background-color:grey;margin-top:1px;margin-bottom:1px;">
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Area">&nbsp;<input  id="Area"  class="able" style="width:50%;"type="text"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I z-z">&nbsp;<input id="I z-z"  class="able" style="width:50%;"type="text"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I y-y">&nbsp;<input id="I y-y"  class="able" style="width:50%;"type="text"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="J">&nbsp;<input  id="J" class="able" style="width:50%;"type="text"></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Cw">&nbsp;<input id="Cw"  class="able" style="width:50%;"type="text"></div>
				<div>
					<select style="outline:none;width:90%" onchange="BorA2(this.value)">
						<option>Select</option>
						<option value="1">Basic</option>
						<option value="2">Advanced</option>
					</select>
				</div>
			</div>
			<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey;margin-top:1px;margin-bottom:1px;">
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z z-z">&nbsp;<input id="Z z-z" class="able" style="width:50%;"type="text" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z y-y">&nbsp;<input id="Z y-y"  class="able" style="width:50%;"type="text" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A y-y">&nbsp;<input id="A y-y"  class="able" style="width:50%;"type="text" ></div>
					<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A z-z">&nbsp;<input id="A z-z"  class="able" style="width:50%;"type="text" ></div>
				</div>
				<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
					<div></div>
					<div><button class="button" onclick="ModifySection()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
				</div>
			</div>
`
	}
	else {
		document.getElementById("change").innerHTML = `
		<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 18% 18% 18% 18% 18% 10%;background-color:grey;margin-top:1px;margin-bottom:1px;">
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Area">&nbsp;<input  class="able" style="width:50%;"type="text" id="Area" ></div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I z-z">&nbsp;<input  class="able" style="width:50%;"type="text" id="I z-z" ></div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="I y-y">&nbsp;<input  class="able" style="width:50%;"type="text" id="I y-y" ></div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="J">&nbsp;<input  class="able" style="width:50%;"type="text" id="J" ></div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Cw">&nbsp;<input  class="able" style="width:50%;"type="text" id="Cw" ></div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Iyz">&nbsp;<input  class="able" style="width:50%;"type="text" id="Iyz" ></div>
		</div>
		<div style="width:100%;font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 18% 18% 18% 18% 18% 10%;background-color:grey;margin-top:1px;margin-bottom:1px;">
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Ysc">&nbsp;<input  class="able" style="width:50%;"type="text" id="Ysc" ></div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Zsc">&nbsp;<input  class="able" style="width:50%;"type="text" id="Zsc" ></div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="BetaV">&nbsp;<input  class="able" style="width:50%;"type="text" id="BetaV" ></div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="BetaW">&nbsp;<input  class="able" style="width:50%;"type="text" id="BetaW" ></div>
			<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Betaw">&nbsp;<input  class="able" style="width:50%;"type="text" id="Betaw" ></div>
			<div>
				<select style="outline:none;width:90%" onchange="BorA2(this.value)">	
					<option>Select</option>
					<option value="1">Basic</option>
					<option value="2">Advanced</option>
				</select>
			</div>
		</div>
		<div style="width:100%;display: grid;grid-template-columns: 72% 28%">
			<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns:25% 25% 25% 25%;background-color:grey;margin-top:1px;margin-bottom:1px;">
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z w-w">&nbsp;<input  class="able" style="width:50%;"type="text" id="Z w-w" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="Z v-v">&nbsp;<input  class="able" style="width:50%;"type="text" id="Z v-v" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A v-v">&nbsp;<input  class="able" style="width:50%;"type="text" id="A v-v" ></div>
				<div class="cal" style="display:inline"><input class="disabled" disabled="disabled" style="width:20%" type="text" readonly value="A w-w">&nbsp;<input  class="able" style="width:50%;"type="text" id="A w-w" ></div>
			</div>
			<div style="font-size:12px;line-height:250%;display: grid;grid-template-rows:100%;grid-template-columns: 10% 80%;background-color:grey;margin-left:1px;margin-top:1px;margin-bottom:1px;">
				<div></div>
				<div id="ApplyCancel"><button class="button" onclick="RemoveElements()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button></div>
			</div>
		</div>
`
	}
	document.getElementById("center").contentWindow.SelectSection(value);
}
////////////////////////////////////////////////////////////////////////////////////////////
//Remove Section
function RemoveSection() {
	var myselect=document.getElementById("select");
	var index=myselect.selectedIndex ; // selectedIndex所选中项的index
	var value=myselect.options[index].value;
	document.getElementById("center").contentWindow.RemoveSection(value);
	$("#select option:last").remove()
}

function showInfo(value) {
	var section = getid("center").contentWindow.Sections[value]
	if (section.group.length == 9) {
		console.log("BASIC");
		$("#info").empty();
		$("#info").append("<option>" + "name=" +section.name +"</option>");
		$("#info").append("<option>" + "A=" + section.group[0] + "</option>");
		$("#info").append("<option>" + "Izz=" + section.group[1] + "</option>");
		$("#info").append("<option>" + "Iyy=" + section.group[2] + "</option>");
		$("#info").append("<option>" + "J=" + section.group[3] + "</option>");
		$("#info").append("<option>" + "Cw=" + section.group[4] + "</option>");
		$("#info").append("<option>" + "Zzz=" + section.group[5] + "</option>");
		$("#info").append("<option>" + "Zyy=" + section.group[6] + "</option>");
		$("#info").append("<option>" + "Ayy=" + section.group[7] + "</option>");
		$("#info").append("<option>" + "Azz=" + section.group[08] + "</option>");
	}
	else {
		console.log("ADVENCED");
		$("#info").empty();
		$("#info").append("<option>" + "name=" + section.name + "</option>");
		$("#info").append("<option>" + "A=" + section.group[0] + "</option>");
		$("#info").append("<option>" + "Izz=" + section.group[1] + "</option>");
		$("#info").append("<option>" + "Iyy=" + section.group[2] + "</option>");
		$("#info").append("<option>" + "J=" + section.group[3] + "</option>");
		$("#info").append("<option>" + "Cw=" + section.group[4] + "</option>");
		$("#info").append("<option>" + "Iyz=" + section.group[5] + "</option>");
		$("#info").append("<option>" + "Ysc=" + section.group[6] + "</option>");
		$("#info").append("<option>" + "Zsc=" + section.group[7] + "</option>");
		$("#info").append("<option>" + "BetaV=" + section.group[08] + "</option>");
		$("#info").append("<option>" + "BetaW=" + section.group[09] + "</option>");
		$("#info").append("<option>" + "Betaw=" + section.group[10] + "</option>");
		$("#info").append("<option>" + "Zww=" + section.group[11] + "</option>");
		$("#info").append("<option>" + "Zvv=" + section.group[12] + "</option>");
		$("#info").append("<option>" + "Aww=" + section.group[13] + "</option>");
		$("#info").append("<option>" + "Avv=" + section.group[14] + "</option>");

	}
}
////////////////////////////////////////////////////////////////////////////////////////////
//Attach Section
function AttachSection() {
	var myselect = document.getElementById("select");
	var index = myselect.selectedIndex; // selectedIndex代表的是你所选中项的index
	var section = myselect.options[index].value;
	var element = document.getElementById("element").value
	var id = element.split(/[,_ ]/)
	if (id) 
		document.getElementById("center").contentWindow.AttachSection(section,id); //id+element
	else
		document.getElementById("status").value = "Blanks NOT Acceptable!"
}

function AllAttach() {
	document.getElementById("element").value = "All";
	document.getElementById("ApplyCancel").innerHTML =`<button class="button" onclick="AttachAll()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button>`
}

function AllAttachClr(){
	document.getElementById("element").value = "";
	document.getElementById("ApplyCancel").innerHTML = `<button class="button" onclick="AttachSection()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button>`
}

function AttachAll() {
	var myselect = document.getElementById("select");
	var index = myselect.selectedIndex; // selectedIndex代表的是你所选中项的index
	var section = myselect.options[index].value;
	document.getElementById("center").contentWindow.AttachAll(section); 
}
////////////////////////////////////////////////////////////////////////////////////////////




//DefineMaterial
function DefineMaterial() {
	var name = document.getElementById("name").value
	if (name == "") {
		document.getElementById("status").value = "Blanks NOT acceptable!"
		return;
	}
	var E = document.getElementById("E").value
	var v = document.getElementById("v").value
	var Fy = document.getElementById("Fy").value
	var Wt = document.getElementById("Wt").value
	if (E == "" || v == "" || Fy == "" || Wt == "" ) 
		document.getElementById("status").value = "Blanks NOT acceptable!"
	else {
		document.getElementById("center").contentWindow.DefineMaterial(name,E,v,Fy,Wt);
		document.getElementById("status").value = ""
	}
}
////////////////////////////////////////////////////////////////////////////////////////////
//Modify Material
function ModifyMaterial() {
	var myselect = document.getElementById("select");
	var index = myselect.selectedIndex; // selectedIndex所选中项的index
	var value = myselect.options[index].value;

	var name = document.getElementById("name").value
	var E = document.getElementById("E").value
	var v = document.getElementById("v").value
	var Fy = document.getElementById("Fy").value
	var Wt = document.getElementById("Wt").value

	document.getElementById("center").contentWindow.ModifyMaterial(value,name,E,v,Fy,Wt);
}

function SelectMaterial(value) {
	document.getElementById("center").contentWindow.SelectMaterial(value);
}

function showInfo2(value) {
	var material = getid("center").contentWindow.Materials[value]
	$("#info").empty();
	$("#info").append("<option>" + "name=" + material.name + "</option>");
	$("#info").append("<option>" + "E=" + material.E+ "</option>");
	$("#info").append("<option>" + "v=" + material.v + "</option>");
	$("#info").append("<option>" + "Fy=" + material.Fy + "</option>");
	$("#info").append("<option>" + "Wt=" + material.Wt + "</option>");
}
////////////////////////////////////////////////////////////////////////////////////////////
//Remove Material
function RemoveMaterial() {
	var myselect = document.getElementById("select");
	var index = myselect.selectedIndex; // selectedIndex所选中项的index
	var value = myselect.options[index].value;
	document.getElementById("center").contentWindow.RemoveMaterial(value);
	$("#select option:last").remove()
}
////////////////////////////////////////////////////////////////////////////////////////////
//Attach Material
function AttachMaterial() {
	var myselect = document.getElementById("select");
	var index = myselect.selectedIndex; // selectedIndex代表的是你所选中项的index
	var material = myselect.options[index].value;
	var element = document.getElementById("element").value
	var id = element.split(/[,_ ]/)
	if (id)
		document.getElementById("center").contentWindow.AttachMaterial(material, id); //id+element
	else
		document.getElementById("status").value = "Blanks NOT Acceptable!"
}

function AllAttach2() {
	document.getElementById("element").value = "All";
	document.getElementById("ApplyCancel").innerHTML = `<button class="button" onclick="AttachAll2()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button>`
}

function AllAttachClr2() {
	document.getElementById("element").value = "";
	document.getElementById("ApplyCancel").innerHTML = `<button class="button" onclick="AttachMaterial()" >Apply</button>&emsp;<button class="button" onclick="Cancel()" >Cancel</button>`
}

function AttachAll2() {
	var myselect = document.getElementById("select");
	var index = myselect.selectedIndex; // selectedIndex代表的是你所选中项的index
	var material = myselect.options[index].value;
	document.getElementById("center").contentWindow.AttachAll2(material);
}
////////////////////////////////////////////////////////////////////////////////////////////