define(["jquery","underscore","backbone"],function(e,t,n){var r=n.View.extend({el:".container-main",initialize:function(){this.listenToScroll()},listenToScroll:function(){this.$el.scroll(t.bind(this.loadNext,this))},loadNext:function(){console.log("loadNext fun"),this.$el.scrollTop()==this.$(".row-fluid").height()-this.$el.height()&&(console.log("scrolled at end"),this.model.youtube().fetchNext())}});return r});