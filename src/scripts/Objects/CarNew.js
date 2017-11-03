import {
  AxisHelper,
  BoxGeometry,
  DoubleSide,
  LatheGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  PolyhedronGeometry,
  RingGeometry,
  TorusGeometry,
  Vector3,
  CylinderGeometry,
  Shape,
  SphereGeometry
} from 'three';

const addBody = () => {
  var body = new Group();
  var triangle = new Shape();
  triangle.moveTo(0,1);
  triangle.bezierCurveTo(3, 1, 4, 3, 4 ,5);
  triangle.bezierCurveTo(4, 11, 3, 17, 2, 19);  
  triangle.bezierCurveTo(2, 20, 1, 21, 0, 21);

  var geometry = new LatheGeometry( triangle.extractPoints(10).shape);
  var material = new MeshBasicMaterial( { color: 0xcc5300, wireframe: true } );
  var mesh = new Mesh( geometry, material ) ;
  body.add(mesh);
  body.position.set(0,2,0);
  body.rotateZ(Math.PI/2);
  body.scale.copy(new Vector3(0.4,0.4,0.4));
  return body;
}

const wheelMesh = (scale) => {
  var rectangle = new Shape();
  rectangle.moveTo(1,0);
  rectangle.lineTo(3,0);
  rectangle.lineTo(3,3);
  rectangle.lineTo(1,3);
  rectangle.lineTo(1,0);

  var geometry = new LatheGeometry( rectangle.extractPoints(10).shape);
  var material = new MeshBasicMaterial( { color: 0x999999, wireframe: true} );
  var mesh = new Mesh( geometry, material ) ;
  mesh.rotateX(Math.PI/2);
  mesh.scale.copy(scale);
  return mesh;
}

const addWheels = () => {
  var Wheels = new Group();
  var frontRightWheel = new Group();
  var frontLeftWheel = new Group();
  var backRightWheel = new Group();
  var backLeftWheel = new Group();

  frontRightWheel.add(wheelMesh(new Vector3(0.3, 0.2, 0.3)));
  frontRightWheel.position.set(-6, 1.9, -2);

  frontLeftWheel.add(wheelMesh(new Vector3(0.3, 0.2, 0.3)));
  frontLeftWheel.position.set(-6, 1.9, 1.5);

  backLeftWheel.add(wheelMesh(new Vector3(0.4, 0.4, 0.4)));
  backLeftWheel.position.set(-2, 2.2, 1.8);

  backRightWheel.add(wheelMesh(new Vector3(0.4, 0.4, 0.4)));
  backRightWheel.position.set(-2, 2.2, -3);

  Wheels.add(frontRightWheel, frontLeftWheel, backLeftWheel, backRightWheel);
  return Wheels;
}

export default (position, scale = new Vector3(1, 1, 1)) => {
	const car = new Group();
	car.name = "car";

  var geometry1 = new CylinderGeometry(0.2, 0.2, 3.5, 10);
  var material1 = new MeshBasicMaterial( { color: 0xacaced, wireframe: true} );
  var mesh1 = new Mesh( geometry1, material1 ) ;

  var geometry2 = new CylinderGeometry(0.3, 0.3, 5.5, 10);
  var material2 = new MeshBasicMaterial( { color: 0xacaced, wireframe: true} );
  var mesh2 = new Mesh( geometry2, material2 ) ;

  mesh1.rotateX(Math.PI/2);
  mesh1.position.set(-6,1.9,0);

  mesh2.rotateX(Math.PI/2);
  mesh2.position.set(-2,2.2,0);

  var geometry3 = new SphereGeometry(1, 10, 10, 0, Math.PI);
  var material3 = new MeshBasicMaterial( { color: 0xacacff, wireframe: true} );
  var mesh3 = new Mesh( geometry3, material3 ) ;
  mesh3.position.set(-3,3.1,0);
  mesh3.rotateX(-Math.PI/2);

  var geometry4 = new BoxGeometry(0.1, 0.5, 0.4, 10, 10);
  var material4 = new MeshBasicMaterial( { color: 0xeeeeee, wireframe: true} );
  var mesh4 = new Mesh( geometry4, material4 ) ;
  mesh4.position.set(-8.15, 1.5, -0.25);

  var geometry5 = new BoxGeometry(0.1, 0.5, 0.4, 10, 10);
  var material5 = new MeshBasicMaterial( { color: 0xeeeeee, wireframe: true} );
  var mesh5 = new Mesh( geometry5, material5 ) ;
  mesh5.position.set(-8.15, 1.5, 0.25);

  car.add(addBody(),addWheels(),mesh1,mesh2,mesh3,mesh4,mesh5);
	return car;
}