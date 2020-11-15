import React from "react";
import '../../styles/pageHeader.css'

const PageHeader = ({ titleText }) => {
  return (
    <div className="row">
      <div className="col-12 mt-4">
        <h1 className='pageHeader text-center' style={{fontFamily:'Courgette,cursive', fontSize:40+'px'}}>{titleText}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
