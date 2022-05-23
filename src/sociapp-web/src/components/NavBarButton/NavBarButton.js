import React, { useEffect, useState } from "react";
import "./NavBarButton.css";

import { Link } from "react-router-dom";

function NavBarButton({isSmallScreen, location, text}) {
    return (
        isSmallScreen 
        ? 
        <Link className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium hover:cursor-pointer" to={location}>
            {text}
        </Link> 
        :
        <Link className="text-gray-300 hover:bg-gray-700 p-2 stext-white py-2 rounded-md text-sm font-medium hover:cursor-pointer" to={location}>
            {text}
        </Link> 
    );
}

export default NavBarButton;
