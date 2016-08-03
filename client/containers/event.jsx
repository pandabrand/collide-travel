import React, {Component,PropTypes} from 'react';

export default class EventContainer extends Component {
  getEvent() {
    return {_id: 5, title: 'this object',description: '<p>Lorem ipsum dolor sit amet, legendos quaestio efficiendi id nec, vim elitr omittam consetetur ex, ad periculis splendide reprehendunt quo. Et brute persequeris sit, persius habemus percipitur pro no, partem nullam vel et. Noster assentior eu mei. Eu veri quodsi quo, cu legendos iudicabit persecuti his, in mel mutat velit menandri. Eu vix tamquam voluptua luptatum, an vel illud inani.</p><p>Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.</p>',image: 'http://lorempixel.com/640/480/food/5', date: 'December 13, 2019', location: 'Chicago, IL'};
  }

  render() {
    const _event = this.getEvent();
    return (
      <div id="main" className="container">
        <h2>{_event.title}</h2>
        <div className="event-image-page">
          <img src={_event.image}/>
        </div>
        <div className="event-copy">
          <p>{_event.location}</p>
          <p>{_event.date}</p>
          <p>{_event.description}</p>
        </div>
      </div>
    );
  }
}

Event.propTypes = {
  id: PropTypes.string,
}
