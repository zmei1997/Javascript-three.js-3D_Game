var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var input = new Input();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 8;
// create walls
var geometry = new THREE.BoxGeometry( 0.3, 8, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
// left wall
var wall_left = new THREE.Mesh( geometry, material );
wall_left.position.x = -8;
scene.add( wall_left );
// right wall
var wall_right = new THREE.Mesh( geometry, material );
wall_right.position.x = 8;
scene.add( wall_right );

var geometry2 = new THREE.BoxGeometry( 15, 0.3, 1 );
var material2 = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
// up wall
var wall_up = new THREE.Mesh( geometry2, material2 );
wall_up.position.x = 0;
wall_up.position.y = 4;
scene.add( wall_up );
// down wall
var geometry2_1 = new THREE.BoxGeometry( 5, 0.3, 1 );
var material2_1 = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
var wall_down_1 = new THREE.Mesh( geometry2_1, material2_1 );
wall_down_1.position.x = -5;
wall_down_1.position.y = -4;
scene.add( wall_down_1 );
var wall_down_2 = new THREE.Mesh( geometry2_1, material2_1 );
wall_down_2.position.x = 5;
wall_down_2.position.y = -4;
scene.add( wall_down_2 );

// // player
// var geometry3 = new THREE.SphereGeometry( 0.1, 32, 32 );
// var material3 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
// var sphere = new THREE.Mesh( geometry3, material3 );
// scene.add( sphere );

// player
var geometry3 = new THREE.BoxGeometry( 0.2, 0.5, 0.2 );
var material3 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
var player = new THREE.Mesh( geometry3, material3 );
player.position.x = -3;
player.position.y = -1;
scene.add( player );

// enemy1
var geometry3_1 = new THREE.BoxGeometry( 0.2, 0.5, 0.2 );
var material3_1 = new THREE.MeshBasicMaterial( { color: 0x50CC1A } );
var enemy1 = new THREE.Mesh( geometry3_1, material3_1 );
enemy1.position.x = 3;
enemy1.position.y = -2;
scene.add( enemy1 );

// enemy2
var enemy2 = new THREE.Mesh( geometry3_1, material3_1 );
enemy2.position.x = -6;
enemy2.position.y = 3;
scene.add( enemy2 );

// enemy3
var enemy3 = new THREE.Mesh( geometry3_1, material3_1 );
enemy3.position.x = 6;
enemy3.position.y = -2;
scene.add( enemy3 );

// mid wall 1
var geometry4 = new THREE.BoxGeometry( 5, 0.3, 1 );
var material4 = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
var wall_mid1 = new THREE.Mesh( geometry4, material4 );
wall_mid1.position.x = 0;
wall_mid1.position.y = 2;
scene.add( wall_mid1 );
// mid wall 2
var geometry5 = new THREE.BoxGeometry( 0.3, 3, 1 );
var material5 = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
var wall_mid2 = new THREE.Mesh( geometry5, material5);
wall_mid2.position.x = 0;
wall_mid2.position.y = -1.5;
scene.add( wall_mid2 );

//bullet
var geometry_b = new THREE.SphereGeometry( 0.1, 32, 32 );
var material_b = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
var bullet1 = new THREE.Mesh( geometry_b, material_b );
bullet1.position.x = enemy1.position.x;
bullet1.position.y = enemy1.position.y;
scene.add( bullet1 );
var bullet2 = new THREE.Mesh( geometry_b, material_b );
bullet2.position.x = enemy2.position.x;
bullet2.position.y = enemy2.position.y;
scene.add( bullet2 );
var bullet3 = new THREE.Mesh( geometry_b, material_b );
bullet3.position.x = enemy3.position.x;
bullet3.position.y = enemy3.position.y;
scene.add( bullet3 );


var geometry_p = new THREE.SphereGeometry( 0.08, 32, 32 );
var material_p = new THREE.MeshBasicMaterial( {color: 0xFF9900} );
var bullet_p = new THREE.Mesh( geometry_p, material_p );
bullet_p.position.x = 0;
bullet_p.position.y = -1;
scene.add( bullet_p );

// reference: https://discourse.threejs.org/t/collisions-two-objects/4125
function detectCollision(object1, object2){
  object1.geometry.computeBoundingBox();
  object2.geometry.computeBoundingBox();
  object1.updateMatrixWorld();
  object2.updateMatrixWorld();
  var box1 = object1.geometry.boundingBox.clone();
  box1.applyMatrix4(object1.matrixWorld);
  var box2 = object2.geometry.boundingBox.clone();
  box2.applyMatrix4(object2.matrixWorld);
  return box1.intersectsBox(box2);
}

function GameOver() {
  end = true;
  document.getElementById("end").style.display = "block";
}

var end = false;
var shootUp;
var shootDown;
var shootRight;
var shootLeft;
var keepShoot;
var isFire = true;
var direction = 1;
var render = function () {
    // requestAnimationFrame( render );
    if (detectCollision(player, enemy1) || detectCollision(player, enemy2)
    || detectCollision(player, enemy3) || detectCollision(player, bullet1)
    || detectCollision(player, bullet2) || detectCollision(player, bullet3)) {
          GameOver();
    }
    if (!end) {
      if (isFire) {
        // kill enemy1
        if (detectCollision(bullet_p, enemy1)) {
          scene.remove(enemy1);
          scene.remove(bullet1);
        }
        // kill enemy2
        if (detectCollision(bullet_p, enemy2)) {
          scene.remove(enemy2);
          scene.remove(bullet2);
        }
        // kill enemy3
        if (detectCollision(bullet_p, enemy3)) {
          scene.remove(enemy3);
          scene.remove(bullet3);
        }
        // enemy3 kill enemy1
        if (detectCollision(bullet3, enemy1)) {
          scene.remove(enemy1);
          scene.remove(bullet1);
        }
        // enemy3 kill enemy2
        if (detectCollision(bullet3, enemy2)) {
          scene.remove(enemy2);
          scene.remove(bullet2);
        }

        if (detectCollision(bullet1, wall_left) || detectCollision(bullet1, wall_mid2)) {
          bullet1.position.x = enemy1.position.x;
          bullet1.position.y = enemy1.position.y;
        } else {
          bullet1.position.x -= 0.1;
        }

        if (detectCollision(bullet2, wall_down_1) || detectCollision(bullet2, wall_mid1)) {
          bullet2.position.x = enemy2.position.x;
          bullet2.position.y = enemy2.position.y;
        } else {
          bullet2.position.y -= 0.1;
        }

        if (detectCollision(bullet3, wall_left) || detectCollision(bullet3, wall_mid1) || detectCollision(bullet3, wall_mid2)) {
          bullet3.position.x = enemy3.position.x;
          bullet3.position.y = enemy3.position.y;
        } else {
          bullet3.position.x -= 0.1;
        }

        if (detectCollision(bullet_p, wall_mid2) || detectCollision(bullet_p, wall_mid1)
            || detectCollision(bullet_p, wall_left) || detectCollision(bullet_p, wall_right)
            || detectCollision(bullet_p, wall_up) || detectCollision(bullet_p, wall_down_1) || detectCollision(bullet_p, wall_down_2)) {
          keepShoot = 0;
        }

        if (keepShoot == 1) {
          if (shootUp == 1) {
            bullet_p.position.y += 0.1;
          }
          if (shootDown == 1) {
            bullet_p.position.y -= 0.1;
          }
          if (shootLeft == 1) {
            bullet_p.position.x -= 0.1;
          }
          if (shootRight == 1) {
            bullet_p.position.x += 0.1;
          }
        }
        if(input.isLeftPressed) {
          if (detectCollision(player, wall_left) || detectCollision(player, wall_mid2)) {
            GameOver();
          } else {
            player.position.x -= 0.1;
            // wall_left.position.x += 0.1;
            // wall_right.position.x += 0.1;
            // wall_up.position.x += 0.1;
            // wall_down_1.position.x += 0.1;
            // wall_down_2.position.x += 0.1;
            // wall_mid1.position.x += 0.1;
            // wall_mid1.position.x += 0.1;
            // wall_mid2.position.x += 0.1;
            // wall_mid2.position.x += 0.1;
          }
          shootUp = 0;
          shootDown = 0;
          shootLeft = 1;
          shootRight = 0;
        }

        if(input.isRightPressed) {
          if (detectCollision(player, wall_right) || detectCollision(player, wall_mid2)) {
            GameOver();
          } else {
            player.position.x += 0.1;
            // wall_left.position.x -= 0.1;
            // wall_right.position.x -= 0.1;
            // wall_up.position.x -= 0.1;
            // wall_down_1.position.x -= 0.1;
            // wall_down_2.position.x -= 0.1;
            // wall_mid1.position.x -= 0.1;
            // wall_mid1.position.x -= 0.1;
            // wall_mid2.position.x -= 0.1;
            // wall_mid2.position.x -= 0.1;
          }
          shootUp = 0;
          shootDown = 0;
          shootLeft = 0;
          shootRight = 1;
        }

        if(input.isUpPressed) {
          if (detectCollision(player, wall_up) || detectCollision(player, wall_mid1)) {
            GameOver();
          } else {
            player.position.y += 0.1;
            // wall_left.position.y -= 0.1;
            // wall_right.position.y -= 0.1;
            // wall_up.position.y -= 0.1;
            // wall_down.position.y -= 0.1;
            // wall_mid1.position.y -= 0.1;
            // wall_mid1.position.y -= 0.1;
            // wall_mid2.position.y -= 0.1;
            // wall_mid2.position.y -= 0.1;
          }
          shootUp = 1;
          shootDown = 0;
          shootLeft = 0;
          shootRight = 0;
        }

        if(input.isDownPressed) {
          if (detectCollision(player, wall_down_1) || detectCollision(player, wall_down_2) || detectCollision(player, wall_mid1)) {
            GameOver();
          } else {
            player.position.y -= 0.1;
            // wall_left.position.y += 0.1;
            // wall_right.position.y += 0.1;
            // wall_up.position.y += 0.1;
            // wall_down.position.y += 0.1;
            // wall_mid1.position.y += 0.1;
            // wall_mid1.position.y += 0.1;
            // wall_mid2.position.y += 0.1;
            // wall_mid2.position.y += 0.1;
          }
          shootUp = 0;
          shootDown = 1;
          shootLeft = 0;
          shootRight = 0;
        }

        if (input.isSpacePressed) {
          keepShoot = 1;
          bullet_p.position.x = player.position.x;
          bullet_p.position.y = player.position.y;
        }

        if (direction == 1) {
          // enemy1 move up down
          if (enemy1.position.y <= -2) {
              enemy1.direction = [0, 1];
          }
          if (enemy1.position.y >= 1) {
              enemy1.direction = [0, -1];
          }
          if (enemy1.direction) {
              enemy1.position.y += enemy1.direction[1] * 0.04;
          }
          // enemy2 move left right
          if (enemy2.position.x <= -6) {
              enemy2.direction = [1, 0];
          }
          if (enemy2.position.x >= -1) {
              enemy2.direction = [-1, 0];
          }
          if (enemy2.direction) {
              enemy2.position.x += enemy2.direction[0] * 0.04;
          }
          // enemy3 move up down
          if (enemy3.position.y <= -2) {
              enemy3.direction = [0, 1];
          }
          if (enemy3.position.y >= 3) {
              enemy3.direction = [0, -1];
          }
          if (enemy3.direction) {
              enemy3.position.y += enemy3.direction[1] * 0.04;
          }
        }
      }
    }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

render();
