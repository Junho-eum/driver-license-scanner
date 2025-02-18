import { useState } from "react";

function SelectAttributes({ data, onComplete }) {
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedAttributes((prev) =>
      checked ? [...prev, name] : prev.filter((attr) => attr !== name)
    );
  };

  const handleComplete = () => {
    onComplete(selectedAttributes);
  };

  return (
    <div>
      <h2>Select Data Attributes</h2>
      <p>
        If you were given the option to select the data attributes that you want
        to release, choose the attributes that you would not want to release.
      </p>
      <form>
        {Object.keys(data).map((key) => (
          <div key={key}>
            <label>
              <input
                type="checkbox"
                name={key}
                onChange={handleCheckboxChange}
              />
              {key}
            </label>
          </div>
        ))}
      </form>
      <button onClick={handleComplete}>Complete</button>
    </div>
  );
}

export default SelectAttributes;
