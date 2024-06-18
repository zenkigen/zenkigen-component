import type { iconColors } from '@zenkigen-inc/component-theme';

import { Icon } from '.';
export default { component: Icon };

type Color = keyof typeof iconColors;

type Props = {
  color?: Color;
  className?: string;
};

function IconList(props: Props) {
  return (
    <div className={props.className}>
      <Icon name="add" color={props.color} />
      <Icon name="ai" color={props.color} />
      <Icon name="angle-down" color={props.color} />
      <Icon name="angle-left" color={props.color} />
      <Icon name="angle-right" color={props.color} />
      <Icon name="angle-small-down" color={props.color} />
      <Icon name="angle-small-up" color={props.color} />
      <Icon name="angle-up" color={props.color} />
      <Icon name="arrow-left" color={props.color} />
      <Icon name="arrow-down" color={props.color} />
      <Icon name="arrow-right" color={props.color} />
      <Icon name="arrow-up" color={props.color} />
      <Icon name="attachment" color={props.color} />
      <Icon name="attention" color={props.color} />
      <Icon name="building" color={props.color} />
      <Icon name="calendar-check" color={props.color} />
      <Icon name="calendar-draft" color={props.color} />
      <Icon name="calendar-minus" color={props.color} />
      <Icon name="calendar-today" color={props.color} />
      <Icon name="calendar" color={props.color} />
      <Icon name="caret-down" color={props.color} />
      <Icon name="caret-right" color={props.color} />
      <Icon name="chart-bar" color={props.color} />
      <Icon name="chart-line" color={props.color} />
      <Icon name="check" color={props.color} />
      <Icon name="circle" color={props.color} />
      <Icon name="close" color={props.color} />
      <Icon name="comment" color={props.color} />
      <Icon name="contract" color={props.color} />
      <Icon name="copy" color={props.color} />
      <Icon name="delete" color={props.color} />
      <Icon name="document" color={props.color} />
      <Icon name="documents" color={props.color} />
      <Icon name="double circle" color={props.color} />
      <Icon name="download-document" color={props.color} />
      <Icon name="download" color={props.color} />
      <Icon name="edit" color={props.color} />
      <Icon name="email" color={props.color} />
      <Icon name="expand" color={props.color} />
      <Icon name="external-link" color={props.color} />
      <Icon name="filter" color={props.color} />
      <Icon name="flag" color={props.color} />
      <Icon name="global" color={props.color} />
      <Icon name="graph-line" color={props.color} />
      <Icon name="hamburger-close" color={props.color} />
      <Icon name="hamburger" color={props.color} />
      <Icon name="help" color={props.color} />
      <Icon name="home" color={props.color} />
      <Icon name="image" color={props.color} />
      <Icon name="information-filled" color={props.color} />
      <Icon name="information" color={props.color} />
      <Icon name="input-delete" color={props.color} />
      <Icon name="link" color={props.color} />
      <Icon name="list" color={props.color} />
      <Icon name="message-text" color={props.color} />
      <Icon name="more" color={props.color} />
      <Icon name="movie" color={props.color} />
      <Icon name="notification" color={props.color} />
      <Icon name="pause" color={props.color} />
      <Icon name="pdf" color={props.color} />
      <Icon name="picture-in-picture" color={props.color} />
      <Icon name="play-filled" color={props.color} />
      <Icon name="play" color={props.color} />
      <Icon name="presentation" color={props.color} />
      <Icon name="remove" color={props.color} />
      <Icon name="score" color={props.color} />
      <Icon name="search" color={props.color} />
      <Icon name="send" color={props.color} />
      <Icon name="share" color={props.color} />
      <Icon name="shuffle" color={props.color} />
      <Icon name="sidebar" color={props.color} />
      <Icon name="slider-editing" color={props.color} />
      <Icon name="sort" color={props.color} />
      <Icon name="star-filled" color={props.color} />
      <Icon name="star" color={props.color} />
      <Icon name="store" color={props.color} />
      <Icon name="success-filled" color={props.color} />
      <Icon name="table-download" color={props.color} />
      <Icon name="table-upload" color={props.color} />
      <Icon name="table" color={props.color} />
      <Icon name="timer" color={props.color} />
      <Icon name="transcription" color={props.color} />
      <Icon name="triangle" color={props.color} />
      <Icon name="upload" color={props.color} />
      <Icon name="user-add" color={props.color} />
      <Icon name="user-group" color={props.color} />
      <Icon name="user-line" color={props.color} />
      <Icon name="user-multi" color={props.color} />
      <Icon name="user-photograph" color={props.color} />
      <Icon name="user-remove" color={props.color} />
      <Icon name="user" color={props.color} />
      <Icon name="video" color={props.color} />
      <Icon name="volume-off" color={props.color} />
      <Icon name="volume" color={props.color} />
      <Icon name="warning" color={props.color} />
    </div>
  );
}

export function Base() {
  return (
    <div>
      <IconList />
    </div>
  );
}

export function Color() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>icon01:</div>
      <IconList color="icon01" />
      <div>icon02:</div>
      <IconList color="icon02" />
      <div>icon03:</div>
      <IconList color="icon03" />
      <div>icon01Dark:</div>
      <IconList color="icon01Dark" className="bg-uiBackground01Dark" />
      <div>icon02Dark:</div>
      <IconList color="icon02Dark" className="bg-uiBackground01Dark" />
      <div>icon03Dark:</div>
      <IconList color="icon03Dark" className="bg-uiBackground01Dark" />
      <div>iconOnColor:</div>
      <IconList color="iconOnColor" className="bg-interactive01" />
      <div>black:</div>
      <IconList color="black" />
      <div>white:</div>
      <IconList color="white" className="bg-uiBackground01Dark" />
      <div>blue10:</div>
      <IconList color="blue10" />
      <div>blue20:</div>
      <IconList color="blue20" />
      <div>blue30:</div>
      <IconList color="blue30" />
      <div>blue40:</div>
      <IconList color="blue40" />
      <div>blue50:</div>
      <IconList color="blue50" />
      <div>blue60:</div>
      <IconList color="blue60" />
      <div>blue70:</div>
      <IconList color="blue70" />
      <div>blue80:</div>
      <IconList color="blue80" />
      <div>blue90:</div>
      <IconList color="blue90" />
      <div>blue100:</div>
      <IconList color="blue100" />
      <div>gray10:</div>
      <IconList color="gray10" />
      <div>gray20:</div>
      <IconList color="gray20" />
      <div>gray30:</div>
      <IconList color="gray30" />
      <div>gray40:</div>
      <IconList color="gray40" />
      <div>gray50:</div>
      <IconList color="gray50" />
      <div>gray60:</div>
      <IconList color="gray60" />
      <div>gray70:</div>
      <IconList color="gray70" />
      <div>gray80:</div>
      <IconList color="gray80" />
      <div>gray90:</div>
      <IconList color="gray90" />
      <div>gray100:</div>
      <IconList color="gray100" />
      <div>red10:</div>
      <IconList color="red10" />
      <div>red20:</div>
      <IconList color="red20" />
      <div>red30:</div>
      <IconList color="red30" />
      <div>red40:</div>
      <IconList color="red40" />
      <div>red50:</div>
      <IconList color="red50" />
      <div>red60:</div>
      <IconList color="red60" />
      <div>red70:</div>
      <IconList color="red70" />
      <div>red80:</div>
      <IconList color="red80" />
      <div>red90:</div>
      <IconList color="red90" />
      <div>red100:</div>
      <IconList color="red100" />
      <div>yellow10:</div>
      <IconList color="yellow10" />
      <div>yellow20:</div>
      <IconList color="yellow20" />
      <div>yellow30:</div>
      <IconList color="yellow30" />
      <div>yellow40:</div>
      <IconList color="yellow40" />
      <div>yellow50:</div>
      <IconList color="yellow50" />
      <div>yellow60:</div>
      <IconList color="yellow60" />
      <div>yellow70:</div>
      <IconList color="yellow70" />
      <div>yellow80:</div>
      <IconList color="yellow80" />
      <div>yellow90:</div>
      <IconList color="yellow90" />
      <div>yellow100:</div>
      <IconList color="yellow100" />
      <div>green10:</div>
      <IconList color="green10" />
      <div>green20:</div>
      <IconList color="green20" />
      <div>green30:</div>
      <IconList color="green30" />
      <div>green40:</div>
      <IconList color="green40" />
      <div>green50:</div>
      <IconList color="green50" />
      <div>green60:</div>
      <IconList color="green60" />
      <div>green70:</div>
      <IconList color="green70" />
      <div>green80:</div>
      <IconList color="green80" />
      <div>green90:</div>
      <IconList color="green90" />
      <div>green100:</div>
      <IconList color="green100" />
      <div>purple10:</div>
      <IconList color="purple10" />
      <div>purple20:</div>
      <IconList color="purple20" />
      <div>purple30:</div>
      <IconList color="purple30" />
      <div>purple40:</div>
      <IconList color="purple40" />
      <div>purple50:</div>
      <IconList color="purple50" />
      <div>purple60:</div>
      <IconList color="purple60" />
      <div>purple70:</div>
      <IconList color="purple70" />
      <div>purple80:</div>
      <IconList color="purple80" />
      <div>purple90:</div>
      <IconList color="purple90" />
      <div>purple100:</div>
      <IconList color="purple100" />
      <div>blueGreen10:</div>
      <IconList color="blueGreen10" />
      <div>blueGreen20:</div>
      <IconList color="blueGreen20" />
      <div>blueGreen30:</div>
      <IconList color="blueGreen30" />
      <div>blueGreen40:</div>
      <IconList color="blueGreen40" />
      <div>blueGreen50:</div>
      <IconList color="blueGreen50" />
      <div>blueGreen60:</div>
      <IconList color="blueGreen60" />
      <div>blueGreen70:</div>
      <IconList color="blueGreen70" />
      <div>blueGreen80:</div>
      <IconList color="blueGreen80" />
      <div>blueGreen90:</div>
      <IconList color="blueGreen90" />
      <div>blueGreen100:</div>
      <IconList color="blueGreen100" />
    </div>
  );
}
