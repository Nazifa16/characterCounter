import React from "react";
import style from "./CharacterCountsCards.module.css";
function CharcterCountsCards({ stats }) {
  return (
    <div className={`${style.statsContainer} `}>
      {stats.map((stat, index) => (
        <div key={index} className={`${style.card} ${stat.bgColor}`}>
          <p className={`${style.value} `}>{stat.value}</p>
          <p className={`${style.desc}`}>{stat.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default CharcterCountsCards;
