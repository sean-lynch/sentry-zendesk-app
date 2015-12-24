(function() {

  return {
    events: {
      'app.activated':'this.loadResults',
    },

    requests: {
      getIssuesRequest: function(email, externalId) {
        var url = (this.setting('host') + '/api/0/projects/' +
                   this.setting('orgName') + '/' +
                   this.setting('projectName') + '/issues/');

        return {
          url: url,
          data: {
              'query': 'user.email%3A' + email,
              // Can't do logicial OR to add externalId yet
              // 'per_page': 1 <- Sentry API doesn't respect this right now
          },
          type: 'GET',
          dataType: 'json',
          headers: {
            "Authorization": "Basic " + Base64.encode(this.setting('key') + ":")
          },
        };
      }
    },

    loadResults: function() {
      var target = (this.currentLocation() == 'ticket_sidebar' ?
                    this.ticket().requester() : this.user()),
          externalId = target.externalId(),
          email      = target.email();

      this.ajax('getIssuesRequest', email, externalId)
      .fail(function(err) {
          var message = 'API call returned a ' + err.status;

          if (err.status == 401 && err.responseJSON && err.responseJSON.detail) {
            message = err.responseJSON.detail;
          } else if (err.status == 404) {
            message = "Couldn't find your organization or project. Double check the app's settings.";
          }

          this.switchTo('error', {
            'message': message
          });


      }).done(function(data) {
        _.each(data, function(i) {
          i.firstSeen = moment(i.firstSeen).format('MMM DD, YYYY @ h:mm a');
        });

        this.switchTo('issues', {
          'issues': data
        });
      });
    }
  };

}());
