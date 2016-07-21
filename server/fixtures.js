// Fixture data
if(Magazines.find().count() === 0) {
  for(var i = 0; i < 5; i++) {
    Magazines.insert(
    { _id: i.toString(), issue: i.toString(), featured: 'Animal Collective (Lisbon/LA/D.C.), YACHT (Los Angeles), HINDS (Madrid), Andrew W.K. & Lil BUB (The Universe), Poliça (Minneapolis), Santigold (LA/NYC/Jamaica/Tanzania), Miike Snow (Stockholm), Eleanor Friedberger (New York), SWIMM, Dan Deacon (Baltimore), Belle & Sebastian and Franz Ferdinand (Glasgow), MØ (Copenhagen), Nova Heart (Beijing), and so many more.',
      download: true, purchase: 0 !== i%3, preview: 'http://lorempixel.com/300/357/transport/',
    });

  }
}

if(Events.find().count() === 0) {
  for(var x = 0; x < 5; x++) {
    Events.insert(
      {
        _id: x.toString(), title: 'This is an awesome event.', description: '<p>Lorem ipsum dolor sit amet, legendos quaestio efficiendi id nec, vim elitr omittam consetetur ex, ad periculis splendide reprehendunt quo. Et brute persequeris sit, persius habemus percipitur pro no, partem nullam vel et. Noster assentior eu mei. Eu veri quodsi quo, cu legendos iudicabit persecuti his, in mel mutat velit menandri. Eu vix tamquam voluptua luptatum, an vel illud inani.</p><p>Aperiam eruditi indoctum sit et, ea sint primis cum. Ei duis primis diceret nam. Ei qui solet repudiare. Et commodo apeirian eos. Ex mea iudico aliquip evertitur, id minim placerat volutpat mei.</p>',
        image: 'http://lorempixel.com/640/480/food/'+x.toString(), date: 'December 13, 2019', location: 'Chicago, IL'
      }
    );
  }
}
