/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 flik.glb 
*/

import React, {useRef} from 'react';
import {useGLTF} from '@react-three/drei';

export function Flik(props) {
  const {nodes, materials} = useGLTF('/flik.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes['122_main_v310'].geometry}
        material={materials.BlackPlastic}
        position={[0.05, 0.711, 12.2]}
        rotation={[0, 1.571, 0]}
        scale={0.071}
        castShadow
      />
    </group>
  );
}

useGLTF.preload('/flik.glb');
