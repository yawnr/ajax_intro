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
          // var html = "<li>" + data.val + "</li>";
          // $('users').append(html);
        }.bind(this)
      });
      // console.log(results);
      // this.renderResults(found);
    }.bind(this));
  };

  $.UsersSearch.prototype.renderResults = function(data){
    this.$ul.empty();
    data.forEach(function (el){
      var $li = $('<li>');
      $li.text(el.username);
      this.$el.find('.users').append($li);
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
