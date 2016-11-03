// import React, { Components, PropTypes } from 'react';
// import AppContainer from '/imports/containers/app.jsx';
// import HomeContainer from '/imports/containers/home.jsx';
// import CityContainer from '/imports/containers/city.jsx';
// import ArtistGuideContainer from '/imports/containers/artist.jsx';
// import CategoryContainer from '/imports/containers/category.jsx';
// import NewsletterComponent from '/imports/components/newsletter/newsletter.jsx';
// import MagazineContainer  from '/imports/containers/magazine.jsx';
// import AdUpdateComponent from '/imports/components/admin/ads/ad-update.jsx';
//
// import {AboutComponent} from '/imports/components/home/about.jsx';
// import {TermsComponent} from '/imports/components/home/terms.jsx';
// import {PrivacyComponent} from '/imports/components/home/privacy.jsx';
//
// // import AccountUIComponent from '/imports/components/accounts/accountUI.jsx';
// import {AdminAppComponent} from '/imports/components/application/AdminApp.jsx';
// import AdminOverviewContainer from '/imports/containers/admin/overview.jsx';
// // import EditAdComponent from '/imports/components/admin/ads/edit-ad.jsx';
// //
// import AdminCityContainer from '/imports/containers/admin/city.jsx';
// import CityCreateComponent from '/imports/components/admin/city/city-new.jsx';
// import CityUpdateComponent from '/imports/components/admin/city/city-update.jsx';
//
// import AdminArtistContainer from '/imports/containers/admin/artist.jsx';
// import ArtistCreateComponent from '/imports/components/admin/artist/artist-new.jsx';
// import ArtistUpdateComponent from '/imports/components/admin/artist/artist-update.jsx';
// import EditArtistCommentsComponent from '/imports/components/admin/artist/edit-artist-comments.jsx';
//
// import AdminLocationContainer from '/imports/containers/admin/location.jsx';
// import LocationUpdateComponent from '/imports/components/admin/location/location-update.jsx';
// import LocationCreateComponent from '/imports/components/admin/location/location-new.jsx';
//
// import AdminMagazineContainer from '/imports/containers/admin/magazine.jsx';
// import MagazineUpdateComponent from '/imports/components/admin/magazine/magazine-update.jsx';
// import MagazineCreateComponent from '/imports/components/admin/magazine/magazine-new.jsx';
//
// import AdminPageContainer from '/imports/containers/admin/page.jsx';
// import PageCreateComponent from '/imports/components/admin/page/page-new.jsx';
// import PageUpdateComponent from '/imports/components/admin/page/page-update.jsx';
//
// // Define our middleware using the Picker.middleware() method.
// // Picker.middleware( bodyParser.json() );
// // Picker.middleware( bodyParser.urlencoded( { extended: false } ) );
// //
// // Picker.route('/hello-picker', function(params, request, response, next) {
// //   const name = 'home';
// //   // const html = ReactDOMServer.renderToStaticMarkup(<HomeContainer routeName={name}/>);
// //   const htmlString = renderToString(ReactLayout.render(AppContainer,{content: (<HomeContainer routeName={name}/>)}));
// //   console.dir('hello there.');
// // });
// publicRoutes = FlowRouter.group({
//   name: 'public',
//   triggersEnter: [function(context, redirect) {
//   }]
// });
//
// publicRoutes.route('/', {
//   name: 'home',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: (<HomeContainer routeName={this.name} />),
//     });
//   },
// });
//
// publicRoutes.route('/city-guides', {
//   name: 'city-guides',
//   action() {
//     ReactLayout.render(AppContainer, {
//       content: (<MagazineContainer/>),
//     });
//   }
// });
//
// const citySection = publicRoutes.group({
//     prefix: "/city"
// });
//
// citySection.route('/:name', {
//   name: 'city-guide',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: <CityContainer {...params}/>
//     });
//   }
// });
//
// function setGeolocation(context) {
//   context.params['geolocation'] = {};
// }
//
// publicRoutes.route('/near-me', {
//   name: 'city-guide-near-me',
//   triggersEnter: [setGeolocation],
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: <CityContainer {...params}/>
//     });
//   }
// });
//
// citySection.route('/:name/:locationName', {
//   name: 'location',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: <Cityontainer {...params}/>
//     });
//   }
// });
//
// citySection.route('/:name/artist/:artistName', {
//   name: 'artist-guide',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: <ArtistGuideContainer {...params}/>
//     });
//   }
// });
//
// const categorySection = publicRoutes.group({
//   prefix: "/category"
// });
//
// categorySection.route('/:type', {
//   name: 'category-guide',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: <CategoryContainer {...params}/>
//     });
//   }
// });
//
// categorySection.route('/:type/city/:name', {
//   name: 'city-category-guide',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: <CategoryContainer {...params}/>
//     });
//   }
// });
//
// publicRoutes.route('/about', {
//   name: 'about',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: (<AboutComponent/>),
//     });
//   }
// });
//
// publicRoutes.route('/newsletters', {
//   name: 'newsletter',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: (<NewsletterComponent/>),
//     });
//   }
// });
//
// publicRoutes.route('/terms', {
//   name: 'terms',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: (<TermsComponent/>),
//     });
//   }
// });
//
// publicRoutes.route('/privacy', {
//   name: 'privacy',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: (<PrivacyComponent/>),
//     });
//   }
// });
//
// publicRoutes.route('/search/:search', {
//   name: 'search',
//   action(params) {
//     ReactLayout.render(AppContainer, {
//       content: (<SearchContainer {...params}/>),
//     });
//   }
// });
//
// publicRoutes.route('/login', {
//   name: 'login',
//   action() {
//     ReactLayout.render(AdminAppComponent, {
//       content: <AccountUIComponent/>,
//     });
//   }
// });
//
// // Private Routes
//
// privateRoutes = FlowRouter.group({
//   prefix: '/admin',
//  triggersEnter: [ function() {
//    if (!Meteor.loggingIn() && !Meteor.userId()) {
//      let route = FlowRouter.current();
//      console.dir(route);
//      if (route && route.route.name !== 'login') {
//        Session.set('redirectAfterLogin', route.path);
//      }
//      return FlowRouter.go('login');
//    }
//  }
//  ]
// });
//
// privateRoutes.route('/logout', {
//   name: 'logout',
//   action() { Meteor.logout(() => FlowRouter.go(FlowRouter.path('login'))); }
// });
//
// privateRoutes.route('/dashboard', {
//   name: 'dashboard',
//   action() {
//     ReactLayout.render(AdminAppComponent, {
//       content: <AdminOverviewContainer/>,
//     });
//   }
// });
//
// const adminAdRoutes = privateRoutes.group({
//   prefix: '/ads',
//   triggersEnter: [ function() {
//     if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin'],'default')) {
//       return FlowRouter.go('dashboard');
//     }
//   }],
// });
//
// adminAdRoutes.route('/', {
//   name: 'admin-ads',
//   action() {
//     ReactLayout.render(AdminAppComponent, {
//       content: <AdUpdateComponent/>,
//     });
//   }
// });
//
// const adminCityRoutes = privateRoutes.group({
//   prefix: '/city',
//   triggersEnter: [ function() {
//       if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
//         return FlowRouter.go('dashboard');
//       }
//     }
//   ],
// });
//
// adminCityRoutes.route('/', {
//     name: 'admin-city',
//     action() {
//       ReactLayout.render(AdminAppComponent, {
//         content: <AdminCityContainer/>,
//       });
//     }
// });
//
// adminCityRoutes.route('/new', {
//     name: 'admin-city-new',
//     action() {
//       ReactLayout.render(AdminAppComponent, {
//         content: <CityCreateComponent/>,
//       });
//     }
// });
//
// adminCityRoutes.route('/:id', {
//     name: 'admin-city-edit',
//     subscriptions: function(params) {
//       this.register('editCity', Meteor.subscribe('edit-city', params.id));
//     },
//     action(params) {
//       ReactLayout.render(AdminAppComponent, {
//         content: <CityUpdateComponent id={params.id}/>,
//       });
//     }
// });
//
// const adminArtistRoutes = privateRoutes.group({
//   prefix: '/artist',
//   triggersEnter: [ function() {
//       if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor','artist-editor'],'default')) {
//         return FlowRouter.go('dashboard');
//       }
//     }
//   ],
// });
//
// adminArtistRoutes.route('/', {
//     name: 'admin-artist',
//     action() {
//       ReactLayout.render(AdminAppComponent, {
//         content: <AdminArtistContainer/>,
//       });
//     }
// });
//
// adminArtistRoutes.route('/new', {
//     name: 'admin-artist-new',
//     action() {
//       ReactLayout.render(AdminAppComponent, {
//         content: <ArtistCreateComponent/>,
//       });
//     }
// });
//
// adminArtistRoutes.route('/:id', {
//     name: 'admin-artist-edit',
//     action(params) {
//       ReactLayout.render(AdminAppComponent, {
//         content: <ArtistUpdateComponent id={params.id}/>,
//       });
//     }
// });
//
// adminArtistRoutes.route('/comments/:id', {
//     name: 'admin-artist-comments-edit',
//     subscriptions: function(params) {
//       this.register('editArtistComments', Meteor.subscribe('artist-comments-edit', params.id));
//     },
//     action(params) {
//       ReactLayout.render(AdminAppComponent, {
//         content: <EditArtistCommentsComponent id={params.id}/>,
//       });
//     }
// });
//
// const adminLocationRoutes = privateRoutes.group({
//   prefix: '/location',
//   triggersEnter: [ function() {
//       if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
//         return FlowRouter.go('dashboard');
//       }
//     }
//   ],
// });
//
// adminLocationRoutes.route('/', {
//     name: 'admin-location',
//     action() {
//       ReactLayout.render(AdminAppComponent, {
//         content: <AdminLocationContainer/>,
//       });
//     }
// });
//
// adminLocationRoutes.route('/new', {
//     name: 'admin-location-new',
//     action() {
//       ReactLayout.render(AdminAppComponent, {
//         content: <LocationCreateComponent/>,
//       });
//     }
// });
//
// adminLocationRoutes.route('/:id', {
//     name: 'admin-location-edit',
//     action(params) {
//       ReactLayout.render(AdminAppComponent, {
//         content: <LocationUpdateComponent id={params.id}/>,
//       });
//     }
// });
//
// const adminMagazineRoutes = privateRoutes.group({
//   prefix: '/magazine',
//   triggersEnter: [ function() {
//       if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
//         return FlowRouter.go('dashboard');
//       }
//     }
//   ],
// });
//
// adminMagazineRoutes.route('/', {
//     name: 'admin-magazine',
//     action() {
//       ReactLayout.render(AdminAppComponent, {
//         content: <AdminMagazineContainer/>,
//       });
//     }
// });
//
// adminMagazineRoutes.route('/new', {
//     name: 'admin-magazine-new',
//     action() {
//       ReactLayout.render(AdminAppComponent, {
//         content: <MagazineCreateComponent/>,
//       });
//     }
// });
//
// adminMagazineRoutes.route('/:id', {
//     name: 'admin-magazine-edit',
//     action(params) {
//       ReactLayout.render(AdminAppComponent, {
//         content: <MagazineUpdateComponent id={params.id}/>,
//       });
//     }
// });
//
//
// const adminPageRoutes = privateRoutes.group({
//   prefix: '/pages',
//   triggersEnter: [ function() {
//       if(!Roles.userIsInRole(Meteor.userId(), ['super-admin','admin','editor'],'default')) {
//         return FlowRouter.go('dashboard');
//       }
//     }
//   ],
// });
//
// adminPageRoutes.route('/', {
//     name: 'admin-page',
//     action() {
//       ReactLayout.render(AdminAppComponent, {
//         content: <AdminPageContainer/>,
//       });
//     }
// });
//
// adminPageRoutes.route('/new', {
//     name: 'admin-page-new',
//     action() {
//       ReactLayout.render(AdminAppComponent, {
//         content: <PageCreateComponent/>,
//       });
//     }
// });
//
// adminPageRoutes.route('/:id', {
//     name: 'admin-page-edit',
//     action(params) {
//       ReactLayout.render(AdminAppComponent, {
//         content: <PageUpdateComponent id={params.id}/>,
//       });
//     }
// });
//
// const timeInMillis = 1000 * 30; // 10 secs
// FlowRouter.setPageCacheTimeout(timeInMillis);
// FlowRouter.setDeferScriptLoading(true);
