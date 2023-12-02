import React, {useRef, useCallback} from 'react';
import {
  useGLTF,
  Bounds,
  OrbitControls,
  Clouds,
  Cloud,
  useBounds,
  Html,
} from '@react-three/drei';
import {useEffect, useState} from 'react';
import {Link, useNavigate} from '@remix-run/react';
import * as THREE from 'three';

const apiFunctions = [];

const CamController = ({name}) => {
  const api = useBounds();

  const storeData = useCallback(() => {
    apiFunctions.push({id: name, api});
  }, [api]);

  storeData();
};

const HtmlContent = ({
  position,
  rotation,
  name,
  data,
  next,
  previous,
  setSelected,
}) => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    apiFunctions.find((obj) => obj.id === next).api.fit();
    setSelected(next);
  };
  const handlePreviousClick = () => {
    apiFunctions.find((obj) => obj.id === previous).api.fit();
    setSelected(previous);
  };

  return (
    <Html
      position={position}
      rotation={rotation}
      transform
      style={{
        backgroundColor: '#1b1a1d',
        padding: '1rem',
        borderRadius: '5px',
        maxWidth: '400px',
        transform: 'scale(0.8)',
      }}
    >
      <h1 style={{margin: 0}}>{name}</h1>
      <p>{data.description}</p>
      <button onClick={() => handleNextClick()}>next</button>
      <button onClick={() => navigate(`/products/${data.handle}`)}>
        view product
      </button>
      <button onClick={() => handlePreviousClick()}>previous</button>
    </Html>
  );
};

export function Model({collection}) {
  const {nodes, materials} = useGLTF('/main_menu_scene_with_mice.glb');
  const [selected, setSelected] = useState('BRIK');

  const cameraControlsRef = useRef();

  useEffect(() => {
    apiFunctions.find((obj) => obj.id === 'BRIK').api.fit();
  }, []);

  return (
    <group dispose={null}>
      <OrbitControls
        makeDefault
        ref={cameraControlsRef}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
      />

      <Bounds clip observe margin={1.8}>
        <CamController pos={[11.843, 0.692, -0.168]} name="TRAK" />
        {selected === 'TRAK' && (
          <HtmlContent
            position={[8, 0.692 + 3, 4.5]}
            rotation={[0, 2.3, 0]}
            name="TRAK"
            previous="BRIK"
            next="SLEEK"
            data={collection.products.nodes.find(
              (obj) => obj.handle === 'trak',
            )}
            setSelected={setSelected}
          />
        )}

        <group
          position={[11.843, 0.692, -0.168]}
          rotation={[-Math.PI, 0.011, -Math.PI]}
          scale={0.071}
        >
          <mesh
            geometry={nodes.wide_straight_v22_1.geometry}
            material={materials['Material.002']}
            castShadow
          />
        </group>
      </Bounds>
      <Bounds clip observe margin={1.8}>
        <CamController pos={[-12.289, 0.712, 0.09]} name="SLEEK" />
        {selected === 'SLEEK' && (
          <HtmlContent
            position={[-8.289, 0.712 + 3, -4.5]}
            rotation={[0, -1, 0]}
            name="SLEEK"
            previous="TRAK"
            next="FLIK"
            data={collection.products.nodes.find(
              (obj) => obj.handle === 'sleek',
            )}
            setSelected={setSelected}
          />
        )}

        <mesh
          geometry={nodes.narrowmouse_v197.geometry}
          material={materials['Material.002']}
          position={[-12.289, 0.712, 0.09]}
          scale={0.071}
          castShadow
        />
      </Bounds>
      {/*  mouse 3 */}
      <Bounds clip observe margin={1.8}>
        <CamController pos={[-0.207, 0.711, 11.494]} name="FLIK" />
        {selected === 'FLIK' && (
          <HtmlContent
            position={[-4.5, 0.711 + 3, 8.494]}
            rotation={[0, 1, 0]}
            name="FLIK"
            previous="SLEEK"
            next="BRIK"
            data={collection.products.nodes.find(
              (obj) => obj.handle === 'flik',
            )}
            setSelected={setSelected}
          />
        )}

        <mesh
          geometry={nodes['122_main_v310'].geometry}
          material={materials['Material.002']}
          position={[-0.207, 0.711, 11.494]}
          rotation={[0, 1.571, 0]}
          scale={0.071}
          castShadow
        />
      </Bounds>
      {/* mouse 4 */}
      <Bounds clip observe margin={1.8}>
        <CamController pos={[0.002, 0.726, -11.702]} name="BRIK" />
        {selected === 'BRIK' && (
          <HtmlContent
            position={[4.5, 0.726 + 3, -8.702]}
            rotation={[0, 4, 0]}
            name="BRIK"
            previous="FLIK"
            next="TRAK"
            data={collection.products.nodes.find(
              (obj) => obj.handle === 'brik',
            )}
            setSelected={setSelected}
          />
        )}

        <mesh
          geometry={nodes.straight_122_buttons_v87.geometry}
          material={materials['Material.002']}
          position={[0.002, 0.726, -11.702]}
          rotation={[0, -1.571, 0]}
          scale={0.071}
          castShadow
        />
      </Bounds>
      <group position={[-0.1, 40.489, 0]} scale={60}>
        <mesh
          geometry={nodes.Cube_1.geometry}
          material={materials.brushed_concrete}
        />
        <mesh
          geometry={nodes.Cube_2.geometry}
          material={materials.concrete_layers_02}
        />
      </group>
      {/* Pedestal Meshes */}
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={materials.concrete_floor_worn_001}
        position={[12, -10.162, 0]}
        scale={[5.15, 9.484, 5.15]}
        receiveShadow
      />
      <mesh
        geometry={nodes.Cylinder013.geometry}
        material={materials.concrete_floor_worn_001}
        position={[0, -10.162, 12]}
        scale={[5.15, 9.484, 5.15]}
        receiveShadow
      />
      <mesh
        geometry={nodes.Cylinder014.geometry}
        material={materials.concrete_floor_worn_001}
        position={[-12, -10.162, 0]}
        scale={[5.15, 9.484, 5.15]}
        receiveShadow
      />
      <mesh
        geometry={nodes.Cylinder001.geometry}
        material={materials.concrete_floor_worn_001}
        position={[0, -10.162, -12]}
        scale={[5.15, 9.484, 5.15]}
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload('/main_menu_scene_with_mice.glb');
