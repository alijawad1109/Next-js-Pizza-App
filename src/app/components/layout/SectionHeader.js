import React from "react";

const SectionHeader = ({subHeader,mainHeader}) => {
  return (
    <div>
      <div className="text-center py-8">
        <h3 className="text-2xl text-gray-500 font-medium">{subHeader}</h3>
        <h2 className="text-3xl primary font-semibold italic">{mainHeader}</h2>
      </div>
    </div>
  );
};

export default SectionHeader;
