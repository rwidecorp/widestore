import {useState} from 'react';
import {BsCaretRightFill, BsCaretLeftFill} from 'react-icons/bs';

function MainSceneAside({setBrightness}) {
  const [isOpen, setIsOpen] = useState(false);
  return isOpen ? (
    <div
      style={{
        position: 'absolute',
        top: 48,
        left: 0,
        backgroundColor: '#1b1a1d',
        borderRadius: '0 8px 8px 0',
        padding: '0.4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          marginBottom: '0.4rem',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <BsCaretLeftFill
          onClick={() => setIsOpen(false)}
          style={{marginRight: '0.4rem'}}
        />
        <strong>Settings</strong>
      </div>
      <div
        style={{padding: '0 .4rem', display: 'flex', flexDirection: 'column'}}
      >
        <label htmlFor="brightness">Brightness</label>
        <input
          type="range"
          min="0"
          max="2000"
          defaultValue={600}
          onChange={(e) => {
            setBrightness(e.target.value);
          }}
        />
      </div>
    </div>
  ) : (
    <div
      style={{
        position: 'absolute',
        top: 48,
        left: 0,
        backgroundColor: '#1b1a1d',
        borderRadius: '0 8px 8px 0',
        padding: '0.4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={() => setIsOpen(true)}
    >
      <BsCaretRightFill />
    </div>
  );
}

export default MainSceneAside;
