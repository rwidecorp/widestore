/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.15 sleek.glb 
*/

import React, {useRef} from 'react';
import {useGLTF} from '@react-three/drei';

export function Sleek(props) {
  const {nodes, materials} = useGLTF('/sleek.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.narrowmouse_v197.geometry}
        material={materials['Material.002']}
        position={[-12.289, 0.712, 0.09]}
        scale={0.071}
        castShadow
      />
    </group>
  );
}

useGLTF.preload('/sleek.glb');
