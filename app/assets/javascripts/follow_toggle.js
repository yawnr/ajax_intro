(function(){
  $.FollowToggle = function(el) {
    this.$el = $(el);
    this.$userId = this.$el.data("user-id");
    this.$followState = this.$el.data("follow-state");
    this.render.call(this);
    this.handleClick.call(this);
  };

  $.FollowToggle.prototype.render = function () {
    if (this.$followState == "unfollowed"){
      this.$el.empty();
      this.$el.append("Follow!");
    } else if (this.$followState == "followed") {
      this.$el.empty();
      this.$el.append("Unfollow!");
    }
  };

  $.fn.followToggle = function () {
    return this.each(function() {
      new $.FollowToggle(this);
    });
  };

  $.FollowToggle.prototype.handleClick = function() {
    this.$el.on("click", function(e){
      e.preventDefault();

      this.$el.prop("disabled", true);

      var path = "/users/" + this.$userId + "/follow/";
      var verb = ((this.$followState == "followed") ? "DELETE" : "POST");
      console.log(verb);
      $.ajax({
        url: path,
        type: verb,
        dataType: "json",
        data: {
        "data-follow-state" : this.$followState,
        },
        success: function () {

          if (this.$followState == "followed") {
            this.$el.data("follow-state", "unfollowed");
            this.$followState = "unfollowed";
          } else {
            this.$el.data("follow-state", "followed");
            this.$followState = "followed";
          }

          this.render();
          this.$el.prop("disabled", false);
        }.bind(this)
      });
    }.bind(this))
  };

  $(function() {
    $("button.follow-toggle").followToggle();
  });




})();
