/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/trak.glb 
*/

import React, {useRef} from 'react';
import {useGLTF} from '@react-three/drei';

export function Trak(props) {
  const {nodes, materials} = useGLTF('/trak.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes['3MF_Object002'].geometry}
        material={materials.BlackPlastic}
        position={[11.955, 0, 0.937]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.071, 0.069, 0.072]}
        castShadow
      />
    </group>
  );
}

useGLTF.preload('/trak.glb');
