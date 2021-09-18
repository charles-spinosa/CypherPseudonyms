import './teamList.css';

// I have inplicitly linked this component to the function of "team list". In reality, this is just a "list".

const TeamList = ({teamColor, teamMembers}) => {

  return (
    <ul>
        <label htmlFor="">{teamColor}</label>
        {teamMembers.map(player => <li>{player.name}</li>)}
      </ul>
  )
};

export default TeamList;