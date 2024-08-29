const IconStar = ({ filled, size = "40px", color = "yellow" }) => {
  return (
    <svg
      className="icon-star"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={filled ? color : "none"}
        stroke={filled ? "none" : color}
        strokeWidth={filled ? "0" : "2"}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
};


export default IconStar;
