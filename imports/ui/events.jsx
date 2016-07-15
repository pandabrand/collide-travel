import React, {Component} from 'react';

import EventsRow from './data/event-row.jsx';

export default class Events extends Component {
  getEvents() {
    return [
      {
        _id: 1, title: 'This is an awesome event.', description: '<p>Lorem ipsum dolor sit amet, legendos quaestio efficiendi id nec, vim elitr omittam consetetur ex, ad periculis splendide reprehendunt quo. Et brute persequeris sit, persius habemus percipitur pro no, partem nullam vel et. Noster assentior eu mei. Eu veri quodsi quo, cu legendos iudicabit persecuti his, in mel mutat velit menandri. Eu vix tamquam voluptua luptatum, an vel illud inani.</p><p>Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.</p>',
        image: 'http://lorempixel.com/640/480/food/1', date: 'December 13, 2019', location: 'Chicago, IL'
      },
      {
        _id: 2, title: 'This is an awesome event.', description: '<p>Lorem ipsum dolor sit amet, legendos quaestio efficiendi id nec, vim elitr omittam consetetur ex, ad periculis splendide reprehendunt quo. Et brute persequeris sit, persius habemus percipitur pro no, partem nullam vel et. Noster assentior eu mei. Eu veri quodsi quo, cu legendos iudicabit persecuti his, in mel mutat velit menandri. Eu vix tamquam voluptua luptatum, an vel illud inani.</p><p>Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.</p>',
        image: 'http://lorempixel.com/640/480/food/2', date: 'December 13, 2019', location: 'Chicago, IL'
      },
      {
        _id: 3, title: 'This is an awesome event.', description: '<p>Lorem ipsum dolor sit amet, legendos quaestio efficiendi id nec, vim elitr omittam consetetur ex, ad periculis splendide reprehendunt quo. Et brute persequeris sit, persius habemus percipitur pro no, partem nullam vel et. Noster assentior eu mei. Eu veri quodsi quo, cu legendos iudicabit persecuti his, in mel mutat velit menandri. Eu vix tamquam voluptua luptatum, an vel illud inani.</p><p>Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.</p>',
        image: 'http://lorempixel.com/640/480/food/3', date: 'December 13, 2019', location: 'Chicago, IL'
      },
      {
        _id: 4, title: 'This is an awesome event.', description: '<p>Lorem ipsum dolor sit amet, legendos quaestio efficiendi id nec, vim elitr omittam consetetur ex, ad periculis splendide reprehendunt quo. Et brute persequeris sit, persius habemus percipitur pro no, partem nullam vel et. Noster assentior eu mei. Eu veri quodsi quo, cu legendos iudicabit persecuti his, in mel mutat velit menandri. Eu vix tamquam voluptua luptatum, an vel illud inani.</p><p>Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.</p>',
        image: 'http://lorempixel.com/640/480/food/4', date: 'December 13, 2019', location: 'Chicago, IL'
      },
      {
        _id: 5, title: 'This is an awesome event.', description: '<p>Lorem ipsum dolor sit amet, legendos quaestio efficiendi id nec, vim elitr omittam consetetur ex, ad periculis splendide reprehendunt quo. Et brute persequeris sit, persius habemus percipitur pro no, partem nullam vel et. Noster assentior eu mei. Eu veri quodsi quo, cu legendos iudicabit persecuti his, in mel mutat velit menandri. Eu vix tamquam voluptua luptatum, an vel illud inani.</p><p>Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.</p>',
        image: 'http://lorempixel.com/640/480/food/5', date: 'December 13, 2019', location: 'Chicago, IL'
      },
    ];
  }

  renderEvents() {
    return this.getEvents().map((event) => (
      <EventsRow key={event._id} event={event}/>
    ))
  }

  render() {
    return (
      <div id="main" className="container">
        <div className="row title">
          <h1>Events</h1>
        </div>
        {this.renderEvents()}
      </div>
    );
  }
}
