import TeamList from './teamList/teamList';

import './gameLobby.css';

const GameLobby = ({players, className}) => {
  return (
    <section className={`Player-list ${className}`}>
      <header>Players</header>
      <TeamList teamColor='Blue Team' teamMembers={players.filter(player => player.team === 0)}/>
      <TeamList teamColor='Red Team' teamMembers={players.filter(player => player.team === 1)}/>
    </section>
  )
};

export default GameLobby;