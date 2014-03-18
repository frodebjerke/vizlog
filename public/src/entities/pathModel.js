define([
  'backbone',
  'underscore',
  'async',
  'entities/logPageModel'
  ],
function (Backbone, _, async, LogPage) {
  var numPages = function (offset, length, count) {
    var first = count - offset;
    return (offset > 0 ? 1 : 0)+Math.floor(first/length)+(first % length !== 0 ? 1 : 0);
  };

  return Backbone.Model.extend({
    initialize: function () {
      if (!this.has('logpages')) {
        var logpages = new Backbone.Collection();
        this.set("logpages", logpages);
      }

      if (this.has("start") && this.has("length")) {
        this.get("logpages").once("add", function () {
          this.getNeededDocs(this.get("start"), this.get("length"));
          this.once('neededdocs:fetched', this.getValuesFromDocs);
        }.bind(this));
      }
      this.addLogPage(0);
    },
    getValuesFromDocs: function (e) {
      var length = e.length;
      var data = _.reduce(e.docs, function (memo, doc) {
        var offset = 0;
        if (memo.length === 0)
          offset = e.offset;
        var values = doc.getArray(offset, length);
        length = length - (values.length / doc.get("frequence"));
        return memo.concat(values);
      }, []);

      this.set('data', data);
    },
    // START IS TIMESTAMP, count is S
    getNeededDocs: function (start, count) {
      var first = this.get('logpages').findWhere({'page': 0});
      var pathstart = first.get("starttime");
      var docEnd = first.get("endtime");
      var docLength = docEnd - pathstart + 1;
      var offset = start - pathstart;
      var startpage = Math.floor(offset/docLength);
      var pages = numPages(offset, docLength, count);
      // fetch pages
      var pageIndexes = _.range(startpage, pages);
      async.map(pageIndexes, function (page, callback) {
        var lp = this.addLogPage(page);
        lp.once('change', function (page) {
          callback(null, page);
        });
      }.bind(this), function (err, res) {
        if (err) throw new Error(err);
        // GOT THE NEEDED PAGES
        this.trigger("neededdocs:fetched", {docs: res, offset: offset, length: count});
      }.bind(this));
    },
    addLogPage: function (page) {
      var logpage = new LogPage({
        user: this.get("user"),
        type: this.get("type"),
        page: page
      });
      logpage.fetch();
      logpage.once("change", function (lp) {
        this.get('logpages').add(lp);
      }.bind(this));
      return logpage;
    }
  });
});
