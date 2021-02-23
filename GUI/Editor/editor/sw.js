// r110
/*
const assets = [
	'./',

	'../files/favicon.ico',

	'../build/three.js',

	'./examples/js/controls/TransformControls.js',

	'./examples/js/libs/chevrotain.min.js',
	'./examples/js/libs/jszip.min.js',
	'./examples/js/libs/inflate.min.js',

	'./examples/js/loaders/AMFLoader.js',
	'./examples/js/loaders/ColladaLoader.js',
	'./examples/js/loaders/DRACOLoader.js',
	'./examples/js/loaders/FBXLoader.js',
	'./examples/js/loaders/GLTFLoader.js',
	'./examples/js/loaders/deprecated/LegacyGLTFLoader.js',
	'./examples/js/loaders/KMZLoader.js',
	'./examples/js/loaders/MD2Loader.js',
	'./examples/js/loaders/OBJLoader.js',
	'./examples/js/loaders/MTLLoader.js',
	'./examples/js/loaders/PLYLoader.js',
	'./examples/js/loaders/STLLoader.js',
	'./examples/js/loaders/SVGLoader.js',
	'./examples/js/loaders/TGALoader.js',
	'./examples/js/loaders/TDSLoader.js',
	'./examples/js/loaders/VRMLLoader.js',
	'./examples/js/loaders/VTKLoader.js',

	'./examples/js/exporters/ColladaExporter.js',
	'./examples/js/exporters/GLTFExporter.js',
	'./examples/js/exporters/OBJExporter.js',
	'./examples/js/exporters/STLExporter.js',

	'./examples/js/renderers/Projector.js',
	'./examples/js/renderers/RaytracingRenderer.js',
	'./examples/js/renderers/SVGRenderer.js',

	'./manifest.json',
	'./images/icon.png',

	'./Editor/editor/js/libs/codemirror/codemirror.css',
	'./Editor/editor/js/libs/codemirror/theme/monokai.css',

	'./Editor/editor/js/libs/codemirror/codemirror.js',
	'./Editor/editor/js/libs/codemirror/mode/javascript.js',
	'./Editor/editor/js/libs/codemirror/mode/glsl.js',

	'./Editor/editor/js/libs/system.min.js',
	'./Editor/editor/js/libs/esprima.js',
	'./Editor/editor/js/libs/jsonlint.js',
	'./Editor/editor/js/libs/glslprep.min.js',

	'./Editor/editor/js/libs/codemirror/addon/dialog.css',
	'./Editor/editor/js/libs/codemirror/addon/show-hint.css',
	'./Editor/editor/js/libs/codemirror/addon/tern.css',

	'./Editor/editor/js/libs/codemirror/addon/dialog.js',
	'./Editor/editor/js/libs/codemirror/addon/show-hint.js',
	'./Editor/editor/js/libs/codemirror/addon/tern.js',
	'./Editor/editor/js/libs/acorn/acorn.js',
	'./Editor/editor/js/libs/acorn/acorn_loose.js',
	'./Editor/editor/js/libs/acorn/walk.js',
	'./Editor/editor/js/libs/ternjs/polyfill.js',
	'./Editor/editor/js/libs/ternjs/signal.js',
	'./Editor/editor/js/libs/ternjs/tern.js',
	'./Editor/editor/js/libs/ternjs/def.js',
	'./Editor/editor/js/libs/ternjs/comment.js',
	'./Editor/editor/js/libs/ternjs/infer.js',
	'./Editor/editor/js/libs/ternjs/doc_comment.js',
	'./Editor/editor/js/libs/tern-threejs/threejs.js',

	'./Editor/editor/js/libs/signals.min.js',
	'./Editor/editor/js/libs/ui.js',
	'./Editor/editor/js/libs/ui.three.js',

	'./Editor/editor/js/libs/html2canvas.js',
	'./Editor/editor/js/libs/three.html.js',

	'./Editor/editor/js/libs/app.js',
	'./Editor/editor/js/Player.js',
	'./Editor/editor/js/Script.js',

	'./examples/js/vr/WebVR.js',

	//

	'./css/main.css',

	'./Editor/editor/js/EditorControls.js',
	'./Editor/editor/js/Storage.js',

	'./Editor/editor/js/Editor.js',
	'./Editor/editor/js/Config.js',
	'./Editor/editor/js/History.js',
	'./Editor/editor/js/Loader.js',
	'./Editor/editor/js/Menubar.js',
	'./Editor/editor/js/Menubar.File.js',
	'./Editor/editor/js/Menubar.Edit.js',
	'./Editor/editor/js/Menubar.Add.js',
	'./Editor/editor/js/Menubar.Play.js',
	// './Editor/editor/js/Menubar.View.js',
	'./Editor/editor/js/Menubar.Geometry.js',
	'./Editor/editor/js/Menubar.Examples.js',
	'./Editor/editor/js/Menubar.Help.js',
	'./Editor/editor/js/Menubar.Status.js',
	'./Editor/editor/js/Sidebar.js',
	'./Editor/editor/js/Sidebar.Scene.js',
	'./Editor/editor/js/Sidebar.Project.js',
	'./Editor/editor/js/Sidebar.Settings.js',
	'./Editor/editor/js/Sidebar.Settings.Shortcuts.js',
	'./Editor/editor/js/Sidebar.Settings.Viewport.js',
	'./Editor/editor/js/Sidebar.Properties.js',
	'./Editor/editor/js/Sidebar.Object.js',
	'./Editor/editor/js/Sidebar.Geometry.js',
	'./Editor/editor/js/Sidebar.Geometry.Geometry.js',
	'./Editor/editor/js/Sidebar.Geometry.BufferGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.Modifiers.js',
	'./Editor/editor/js/Sidebar.Geometry.BoxGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.CircleGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.CylinderGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.DodecahedronGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.ExtrudeGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.IcosahedronGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.OctahedronGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.PlaneGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.RingGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.SphereGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.ShapeGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.TetrahedronGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.TorusGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.TorusKnotGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.TubeGeometry.js',
	'./examples/js/geometries/TeapotBufferGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.TeapotBufferGeometry.js',
	'./Editor/editor/js/Sidebar.Geometry.LatheGeometry.js',
	'./Editor/editor/js/Sidebar.Material.js',
	'./Editor/editor/js/Sidebar.Animation.js',
	'./Editor/editor/js/Sidebar.Script.js',
	'./Editor/editor/js/Sidebar.History.js',
	'./Editor/editor/js/Strings.js',
	'./Editor/editor/js/Toolbar.js',
	'./Editor/editor/js/Viewport.js',
	'./Editor/editor/js/Viewport.Camera.js',
	'./Editor/editor/js/Viewport.Info.js',

	'./Editor/editor/js/Command.js',
	'./Editor/editor/js/commands/AddObjectCommand.js',
	'./Editor/editor/js/commands/RemoveObjectCommand.js',
	'./Editor/editor/js/commands/MoveObjectCommand.js',
	'./Editor/editor/js/commands/SetPositionCommand.js',
	'./Editor/editor/js/commands/SetRotationCommand.js',
	'./Editor/editor/js/commands/SetScaleCommand.js',
	'./Editor/editor/js/commands/SetValueCommand.js',
	'./Editor/editor/js/commands/SetUuidCommand.js',
	'./Editor/editor/js/commands/SetColorCommand.js',
	'./Editor/editor/js/commands/SetGeometryCommand.js',
	'./Editor/editor/js/commands/SetGeometryValueCommand.js',
	'./Editor/editor/js/commands/MultiCmdsCommand.js',
	'./Editor/editor/js/commands/AddScriptCommand.js',
	'./Editor/editor/js/commands/RemoveScriptCommand.js',
	'./Editor/editor/js/commands/SetScriptValueCommand.js',
	'./Editor/editor/js/commands/SetMaterialCommand.js',
	'./Editor/editor/js/commands/SetMaterialColorCommand.js',
	'./Editor/editor/js/commands/SetMaterialMapCommand.js',
	'./Editor/editor/js/commands/SetMaterialValueCommand.js',
	'./Editor/editor/js/commands/SetMaterialVectorCommand.js',
	'./Editor/editor/js/commands/SetSceneCommand.js',

	//

	'./examples/arkanoid.app.json',
	'./examples/camera.app.json',
	'./examples/particles.app.json',
	'./examples/pong.app.json',
	'./examples/shaders.app.json'

];

self.addEventListener( 'install', async function () {

	const cache = await caches.open( 'threejs-editor' );

	assets.forEach( function ( asset ) {

		cache.add( asset ).catch( function () {

			console.error( '[SW] Cound\'t cache:', asset );

		} );

	} );

} );

self.addEventListener( 'fetch', async function ( event ) {

	const request = event.request;
	event.respondWith( cacheFirst( request ) );

} );

async function cacheFirst( request ) {

	const cachedResponse = await caches.match( request );

	if ( cachedResponse === undefined ) {

		console.error( '[SW] Not cached:', request.url );
		return fetch( request );

	}

	return cachedResponse;

}
*/