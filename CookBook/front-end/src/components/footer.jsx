import React from "react";

const Footer = () => {
  return (
    <p className="border-top pt-3 text-center">
   
       Cook<i className='fas fa-book-open  mx-1' style={{color:'#FFA500'}} ></i>Book
       &copy;Shahr Franses {new Date().getFullYear()}
    </p>
  );
};

export default Footer;
