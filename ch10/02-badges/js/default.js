﻿// default.js
// For an introduction to the Split template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=232447
(function () {
  "use strict";

  var app = WinJS.Application;
  var activation = Windows.ApplicationModel.Activation;
  var nav = WinJS.Navigation;
  WinJS.strictProcessing();

  app.addEventListener("activated", function (args) {
    if (args.detail.kind === activation.ActivationKind.launch) {
      if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
        // TODO: This application has been newly launched. Initialize
        // your application here.
      } else {
        // TODO: This application has been reactivated from suspension.
        // Restore application state here.
      }

      setupPeriodicBadges();

      if (app.sessionState.history) {
        nav.history = app.sessionState.history;
      }
      args.setPromise(WinJS.UI.processAll().then(function () {
        if (nav.location) {
          nav.history.current.initialPlaceholder = true;
          return nav.navigate(nav.location, nav.state);
        } else {
          return nav.navigate(Application.navigator.home);
        }
      }));
    }
  });

  app.oncheckpoint = function (args) {
    // TODO: This application is about to be suspended. Save any state
    // that needs to persist across suspensions here. If you need to 
    // complete an asynchronous operation before your application is 
    // suspended, call args.setPromise().
    app.sessionState.history = nav.history;
  };

  app.onsettings = function (e) {
    e.detail.applicationcommands = {
      feedsFlyout: { title: "Feeds", href: "/settings/feeds/feeds.html" },
      aboutFlyout: { title: "About", href: "/settings/about/about.html" },
    };

    WinJS.UI.SettingsFlyout.populateSettings(e);
  };

  function setupPeriodicBadges() {
    var notifications = Windows.UI.Notifications;

    // how often to check for the badge?
    var period = notifications.PeriodicUpdateRecurrence.halfHour;

    // URL to find the badge
    var url = new Windows.Foundation.Uri("http://wildermuth.com/updatebadge.xml");

    // push the notification so the badge gets updated
    var updater = notifications.BadgeUpdateManager.createBadgeUpdaterForApplication();
    updater.startPeriodicUpdate(url, period);
  }

  app.start();
})();
