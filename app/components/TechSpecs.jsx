import {
  FaRulerHorizontal,
  FaWeightHanging,
  FaMouse,
  FaEye,
  FaClock,
} from 'react-icons/fa';
import {LuCircuitBoard} from 'react-icons/lu';

const assignIcon = (iconName) => {
  const table = {
    FaRulerHorizontal: <FaRulerHorizontal size="1.5em" />,
    FaWeightHanging: <FaWeightHanging size="1.5em" />,
    FaMouse: <FaMouse size="1.5em" />,
    FaEye: <FaEye size="1.5em" />,
    LuCircuitBoard: <LuCircuitBoard size="1.5em" />,
    FaClock: <FaClock size="1.5em" />,
  };
  return table[iconName];
};

const handleSpecsJson = (specs) => {
  const parsedArr = JSON.parse(specs);

  return parsedArr.reduce((acc, item) => {
    const descriptionArr = item.specText.split(':');
    const updatedItem = {
      icon: assignIcon(item.iconName),
      category: descriptionArr[0].trim(),
      description: descriptionArr[1].trim(),
    };
    acc.push(updatedItem);

    return acc;
  }, []);
};

function TechSpecs({specsJson}) {
  const specsArr = handleSpecsJson(specsJson);

  console.log(specsArr);

  return (
    <section className="tech-specs-section">
      <div className="container" style={{justifyContent: 'space-between'}}>
        {specsArr &&
          specsArr.map(({icon, description, category}) => (
            <div style={{textAlign: 'center', marginBottom: '24px'}}>
              {icon}
              <p style={{fontWeight: 'bolder'}}>{category}</p>
              <p>{description}</p>
            </div>
          ))}
      </div>
    </section>
  );
}

export default TechSpecs;
