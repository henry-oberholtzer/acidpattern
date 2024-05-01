function KnobSvg(props: KnobSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 19.579 19.579"
      transform={`rotate(${props.rotation - 180}, 0, 0)`}
      transform-origion="center"
    >
      <defs>
        <linearGradient
          id="linearGradient6"
          x1="21.167"
          x2="21.167"
          y1="15.346"
          y2="31.221"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#dde0e2"></stop>
          <stop offset="1" stopColor="#50504e" stopOpacity="0"></stop>
        </linearGradient>
        <radialGradient
          id="radialGradient8"
          cx="21.167"
          cy="13.148"
          r="7.673"
          gradientTransform="matrix(1.7272 0 0 1.3103 -15.393 -1.882)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#dde0e2"></stop>
          <stop offset="1" stopColor="#8e8e8d"></stop>
        </radialGradient>
        <radialGradient
          id="radialGradient10"
          cx="21.167"
          cy="13.229"
          r="9.79"
          gradientTransform="matrix(2.2096 0 0 1.4865 -25.604 -6.436)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#dde0e2"></stop>
          <stop offset="0.502" stopColor="#656a68"></stop>
        </radialGradient>
      </defs>
      <g transform="translate(-11.377 -13.494)">
        <circle
          cx="21.167"
          cy="23.283"
          r="9.79"
          fill="url(#radialGradient10)"
          fillRule="evenodd"
        ></circle>
        <g fill="none" stroke="#000" strokeLinecap="round" strokeWidth="0.265">
          <path
            d="M7.673 23.812H8.73M33.602 23.812h.926"
            transform="translate(0 -.53)"
          ></path>
        </g>
        <g fill="none" stroke="#000" strokeLinecap="round" strokeWidth="0.265">
          <path
            d="M7.673 23.812H8.73M33.602 23.812h.926"
            transform="rotate(15 23.11 23.548)"
          ></path>
        </g>
        <g fill="none" stroke="#000" strokeLinecap="round" strokeWidth="0.265">
          <path
            d="M7.673 23.812H8.73M33.602 23.812h.926"
            transform="scale(-1 1) rotate(15 2.01 -136.726)"
          ></path>
        </g>
        <path
          fill="url(#linearGradient6)"
          fillRule="evenodd"
          d="M27.444 28.142a7.938 7.938 0 01-11.11 1.438 7.938 7.938 0 01-1.483-11.104 7.938 7.938 0 0111.098-1.527 7.938 7.938 0 011.572 11.091"
        ></path>
        <circle
          cx="21.167"
          cy="23.283"
          r="7.673"
          fill="#a6a6a6"
          fillRule="evenodd"
        ></circle>
        <path
          fill="url(#radialGradient8)"
          fillRule="evenodd"
          d="M15.172 18.521a7.673 7.673 0 00-1.678 4.763 7.673 7.673 0 007.673 7.672 7.673 7.673 0 007.673-7.672 7.673 7.673 0 00-1.66-4.763z"
        ></path>
        <path
          fill="#999"
          fillRule="evenodd"
          d="M20.637 13.494H21.695V19.844H20.637z"
        ></path>
      </g>
    </svg>
  );
}

interface KnobSvgProps {
  rotation: number;
  width: number;
  height: number;
}

export { KnobSvg }
