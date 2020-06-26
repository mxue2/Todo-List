import React from 'react';
import flagGrey from '../../assets/flag_grey.svg';
import flagRed from '../../assets/flag_red.svg';
import flagBlue from '../../assets/flag_blue.svg';
import flagOrg from '../../assets/flag_org.svg';

const FlagList = () => {
  const flags = [
    {
      flagId: 0, flagImg: flagRed, text: 'Priority 1', ticked: false,
    },
    {
      flagId: 1, flagImg: flagOrg, text: 'Priority 2', ticked: false,
    },
    {
      flagId: 2, flagImg: flagBlue, text: 'Priority 3', ticked: false,
    },
    {
      flagId: 3, flagImg: flagGrey, text: 'Priority 4', ticked: true,
    },
  ];
  return (
    <div className="flag-list">
      
    </div>

  )

}

export default FlagList;
