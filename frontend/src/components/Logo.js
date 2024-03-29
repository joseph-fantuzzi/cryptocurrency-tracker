import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = ({ setShowLogoAnimation }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    setShowLogoAnimation(true);
    setTimeout(() => {
      navigate("/");
    }, 4500);
  };

  return (
    <svg
      width="102"
      height="100"
      viewBox="0 0 102 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      className={"cursor-pointer w-20 h-20 lg:w-24 lg:h-24"}
    >
      <ellipse cx="51" cy="50" rx="51" ry="50" fill="url(#paint0_linear_792_1371)" />
      <g filter="url(#filter0_d_792_1371)">
        <rect
          x="35"
          y="61.1247"
          width="38"
          height="5"
          rx="2.5"
          transform="rotate(-45.5455 35 61.1247)"
          fill="white"
        />
      </g>
      <g filter="url(#filter1_d_792_1371)">
        <rect
          x="40.6892"
          y="33"
          width="38"
          height="5"
          rx="2.5"
          transform="rotate(47.5484 40.6892 33)"
          fill="white"
        />
      </g>
      <g filter="url(#filter2_d_792_1371)">
        <rect x="28" y="59" width="38" height="5" rx="2.5" fill="white" />
      </g>
      <g filter="url(#filter3_d_792_1371)">
        <rect x="39" y="34" width="38" height="5" rx="2.5" fill="white" />
      </g>
      <defs>
        <filter
          id="filter0_d_792_1371"
          x="35.0354"
          y="35.0354"
          width="30.1113"
          height="33.5557"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_792_1371" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_792_1371"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_792_1371"
          x="37.032"
          y="34.032"
          width="29.274"
          height="34.349"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_792_1371" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_792_1371"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_792_1371"
          x="27"
          y="59"
          width="40"
          height="10"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_792_1371" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_792_1371"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d_792_1371"
          x="38"
          y="34"
          width="40"
          height="10"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_792_1371" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_792_1371"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_792_1371"
          x1="82.9762"
          y1="10.9375"
          x2="15.4407"
          y2="80.9171"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#52E6FA" />
          <stop offset="1" stopColor="#07112F" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
