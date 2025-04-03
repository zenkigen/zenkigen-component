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
      <Icon name="hint" color={props.color} />
      <Icon name="home" color={props.color} />
      <Icon name="image" color={props.color} />
      <Icon name="information-filled" color={props.color} />
      <Icon name="information" color={props.color} />
      <Icon name="input-delete" color={props.color} />
      <Icon name="link" color={props.color} />
      <Icon name="list" color={props.color} />
      <Icon name="logout" color={props.color} />
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
      <Icon name="sort-down" color={props.color} />
      <Icon name="sort-up" color={props.color} />
      <Icon name="sparkle" color={props.color} />
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
      <Icon name="user-one" color={props.color} />
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
      <div>iconOnColor:</div>
      <IconList color="iconOnColor" className="bg-interactive01" />
    </div>
  );
}
