(function(){

  $.UsersSearch = function(el){
    this.$el = $(el);
    this.$input = this.$el.find('input');
    this.$ul = this.$el.find('.users');
    this.handleInput.call(this);
    console.log(this.$input);
  }

  $.UsersSearch.prototype.handleInput = function(){
    this.$input.on("input", function(e){
      e.preventDefault();

      var found = $.ajax({
        url: "/users/search/",
        type: "GET",
        dataType: "json",
        data: {
        "query" : this.$input.val()
        },
        success: function (data) {
          this.renderResults(data);
        }.bind(this)
      });
    }.bind(this));
  };

  $.UsersSearch.prototype.renderResults = function(data){
    this.$ul.empty();
    data.forEach(function (el){
      var $li = $('<li>');
      $li.text(el.username);
      var $follow_button = $('<button class="follow-toggle">');
      $li.append($follow_button);
      this.$el.find('.users').append($li);
      $follow_button.followToggle({
        user_id : el.id,
        follow_state : el.follow_state
      });
    }.bind(this));
  };

  $.fn.usersSearch = function () {
    return this.each(function() {
      new $.UsersSearch(this);
    });
  };

  $(function() {
    $("div.users-search").usersSearch();
  });


})();
