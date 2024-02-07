import React, {useRef, useCallback} from 'react';
import {useGLTF, Bounds, useBounds, CameraControls} from '@react-three/drei';
import * as THREE from 'three';
import {useEffect, useState} from 'react';
import {Brik} from './Brik';
import {Flik} from './Flik';
import {Sleek} from './Sleek';
import {Trak} from './Trak';

import {Cylinder} from './Cylinder';

const apiFunctions = [];

const CamController = ({name}) => {
  const api = useBounds();

  const storeData = useCallback(() => {
    apiFunctions.push({id: name, api});
  }, [api]);

  storeData();
};

export function Model({
  selected,
  setSelected,
  isNext,
  isPrevious,
  handleSetSelected,
}) {
  const {nodes, materials} = useGLTF('/room_with_mice.glb');
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [cameraOffset, setCameraOffset] = useState({x: 0, y: 0, z: 0});

  const screenWidth = typeof window !== 'undefined' && window.innerWidth;

  useEffect(() => {
    if (screenWidth < 1180) {
      setCameraOffset({x: 0, y: 2, z: 0});
      cameraControlsRef.current.setFocalOffset(
        cameraOffset.x,
        cameraOffset.y,
        0,
        true,
      );
    } else {
      setCameraOffset({x: 4, y: 0, z: 0});
      cameraControlsRef.current.setFocalOffset(
        cameraOffset.x,
        cameraOffset.y,
        0,
        true,
      );
    }
  }, [screenWidth]);

  const {DEG2RAD} = THREE.MathUtils;

  const cameraControlsRef = useRef();

  useEffect(() => {
    setSelected('Cumulus');
  }, []);

  useEffect(() => {
    // This will need to be refreshed each time the window updates due to not resetting the camera
    switch (selected) {
      case 'Cumulus':
        cameraControlsRef.current.setTarget(0.05, 0.711, 12.2, true);
        // On first render, rotate to the correct position
        if (isFirstRender) {
          cameraControlsRef.current.rotate(180 * DEG2RAD, 0, true);
          cameraControlsRef.current.setFocalOffset(
            cameraOffset.x,
            cameraOffset.y,
            0,
            true,
          );
          setIsFirstRender(false);
        } else {
        }
        break;
      case 'Cirrus':
        cameraControlsRef.current.setTarget(-0.3, 0.726, -12.2, true);
        break;
      case 'Nimbus':
        cameraControlsRef.current.setTarget(-12.289, 0.712, 0.09, true);
        break;
      case 'Stratus':
        cameraControlsRef.current.setTarget(12.5, 0.692, -0.168, true);
        break;
      default:
        break;
    }
    if (isNext) {
      cameraControlsRef.current.rotate(90 * DEG2RAD, 0, true);
    }
    if (isPrevious) {
      cameraControlsRef.current.rotate(-145 * DEG2RAD, 0, true);
    }
    cameraControlsRef.current.rotatePolarTo(70 * DEG2RAD, true);
    if (screenWidth < 790) {
      cameraControlsRef.current.dollyTo(12, true);
    } else {
      cameraControlsRef.current.dollyTo(8, true);
    }
  }, [selected]);

  return (
    <group dispose={null}>
      <CameraControls
        makeDefault
        ref={cameraControlsRef}
        maxPolarAngle={80 * DEG2RAD}
        minPolarAngle={45 * DEG2RAD}
        maxDistance={15}
        minDistance={5}
      />

      <Bounds clip observe>
        <CamController pos={[11.843, 0.692, -0.168]} name="Stratus" />

        <Trak handleSetSelected={handleSetSelected} />
      </Bounds>
      <Bounds clip observe>
        <CamController pos={[-12.289, 0.712, 0.09]} name="Nimbus" />

        <Sleek handleSetSelected={handleSetSelected} />
      </Bounds>
      {/*  mouse 3 */}
      <Bounds clip observe>
        <CamController pos={[-0.207, 0.711, 11.494]} name="Cumulus" />

        <Flik handleSetSelected={handleSetSelected} />
      </Bounds>
      {/* mouse 4 */}
      <Bounds clip observe>
        <CamController name="Cirrus" />

        <Brik handleSetSelected={handleSetSelected} />
      </Bounds>

      <Cylinder />
    </group>
  );
}

useGLTF.preload('/main_menu_scene_with_mice.glb');
