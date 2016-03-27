/**
 *  scene.js
 *  
 */


// Define global variables
var camera, controls, scene, renderer, container;

function init()
{
	// Initialize the scene, camera, and renderer
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

	
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// Initialize the controller
	controls = new THREE.TrackballControls(camera);
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.keys = [ 65, 83, 68 ];
	controls.addEventListener( 'change', render );

	// Add some mesh
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshPhongMaterial( { color: 0x00ff00, shading: THREE.FlatShading } );
	//var cube = new THREE.Mesh( geometry, material );
	var stitch = StitchFactory.createStitchMesh(100,100);
	scene.add( stitch );

	camera.position.z = 5;
	
	// lights
	light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	scene.add( light );
	light = new THREE.DirectionalLight( 0x002288 );
	light.position.set( -1, -1, -1 );
	scene.add( light );
	light = new THREE.AmbientLight( 0x222222 );
	scene.add( light );

	// renderer
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setClearColor( scene.fog.color );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container = document.getElementById( 'container' );
	container.appendChild( renderer.domElement );

	//
	window.addEventListener( 'resize', onWindowResize, false );
	//

	render();
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();
	render();
}
function animate() {
	requestAnimationFrame( animate );
	controls.update();
}
function render() {
	renderer.render( scene, camera );
}


if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

init();
animate();