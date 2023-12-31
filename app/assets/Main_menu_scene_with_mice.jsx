import React, {useRef, useCallback} from 'react';
import {
  useGLTF,
  Bounds,
  useBounds,
  Html,
  CameraControls,
} from '@react-three/drei';
import {useEffect, useState} from 'react';
import {useNavigate} from '@remix-run/react';
import {Brik} from './Brik';
import {Flik} from './Flik';
import {Sleek} from './Sleek';
import {Trak} from './Trak';
import {Pedestals} from './Pedestals';
import {BsCaretRightFill} from 'react-icons/bs';
import {BsCaretLeftFill} from 'react-icons/bs';

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
    // apiFunctions.find((obj) => obj.id === next).api.fit();
    setSelected(next);
  };
  const handlePreviousClick = () => {
    // apiFunctions.find((obj) => obj.id === previous).api.fit();
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
        maxWidth: '300px',
        transform: 'scale(1)',
      }}
    >
      <button
        onClick={() => handlePreviousClick()}
        className="button-reset main-card-prev"
      >
        <BsCaretLeftFill />
      </button>
      <button
        onClick={() => handleNextClick()}
        className="button-reset main-card-next"
      >
        <BsCaretRightFill />
      </button>
      <div className="main-card-info">
        <h1 style={{margin: 0}}>{name}</h1>
        <p>{data.description}</p>
        <div className="main-card-footer-btns">
          <button
            onClick={() => navigate(`/products/${data.handle}`)}
            className="button-reset main-card-view"
          >
            View Product
          </button>
          <button className="button-reset main-card-quick">Quick Add</button>
        </div>
      </div>
    </Html>
  );
};

export function Model({collection}) {
  const {nodes, materials} = useGLTF('/room_with_mice.glb');
  const [selected, setSelected] = useState();

  const cameraControlsRef = useRef();

  useEffect(() => {
    setSelected('FLIK');
  }, []);

  useEffect(() => {
    switch (selected) {
      case 'FLIK':
        cameraControlsRef.current.setTarget(0.05, 0.711, 12.2, true);
        cameraControlsRef.current.rotateTo(-0.55, 1.25, true);
        cameraControlsRef.current.dollyTo(12, true);
        break;
      case 'BRIK':
        cameraControlsRef.current.setTarget(-0.3, 0.726, -12.2, true);
        cameraControlsRef.current.rotateTo(2.55, 1.25, true);
        cameraControlsRef.current.dollyTo(12, true);

        break;
      case 'SLEEK':
        cameraControlsRef.current.setTarget(-12.289, 0.712, 0.09, true);
        cameraControlsRef.current.rotateTo(4.15, 1.25, true);
        cameraControlsRef.current.dollyTo(12, true);
        break;
      case 'TRAK':
        cameraControlsRef.current.setTarget(12.5, 0.692, -0.168, true);
        cameraControlsRef.current.rotateTo(1, 1.25, true);
        cameraControlsRef.current.dollyTo(12, true);

        break;
      default:
        break;
    }
  }, [selected]);

  return (
    <group dispose={null}>
      <CameraControls makeDefault ref={cameraControlsRef} />

      <Bounds clip observe margin={1.8}>
        <CamController pos={[11.843, 0.692, -0.168]} name="TRAK" />
        {selected === 'TRAK' && (
          <HtmlContent
            position={[8, 0.95 + 3.5, 0]}
            rotation={[0, 1.56, 0]}
            name="TRAK"
            previous="FLIK"
            next="BRIK"
            data={collection.products.nodes.find(
              (obj) => obj.handle === 'trak',
            )}
            setSelected={setSelected}
          />
        )}

        <Trak />
      </Bounds>
      <Bounds clip observe margin={1.8}>
        <CamController pos={[-12.289, 0.712, 0.09]} name="SLEEK" />
        {selected === 'SLEEK' && (
          <HtmlContent
            position={[-8, 1 + 3.5, 0]}
            rotation={[0, -1.6, 0]}
            name="SLEEK"
            previous="BRIK"
            next="FLIK"
            data={collection.products.nodes.find(
              (obj) => obj.handle === 'sleek',
            )}
            setSelected={setSelected}
          />
        )}

        <Sleek />
      </Bounds>
      {/*  mouse 3 */}
      <Bounds clip observe margin={1.8}>
        <CamController pos={[-0.207, 0.711, 11.494]} name="FLIK" />
        {selected === 'FLIK' && (
          <HtmlContent
            position={[0, 1 + 3.5, 8]}
            rotation={[0, 0, 0]}
            name="FLIK"
            previous="SLEEK"
            next="TRAK"
            data={collection.products.nodes.find(
              (obj) => obj.handle === 'flik',
            )}
            setSelected={setSelected}
          />
        )}

        <Flik />
      </Bounds>
      {/* mouse 4 */}
      <Bounds clip observe margin={1.8}>
        <CamController name="BRIK" />
        {selected === 'BRIK' && (
          <HtmlContent
            position={[0, 1 + 3.5, -8]}
            rotation={[0, 3.155, 0]}
            name="BRIK"
            previous="TRAK"
            next="SLEEK"
            data={collection.products.nodes.find(
              (obj) => obj.handle === 'brik',
            )}
            setSelected={setSelected}
          />
        )}

        <Brik />
      </Bounds>

      {/* Pedestal Meshes */}

      <Pedestals />
    </group>
  );
}

useGLTF.preload('/main_menu_scene_with_mice.glb');
