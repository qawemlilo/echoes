define(["underscore","backbone"],function(e,t){var n=t.Model.extend({defaults:{id:null,type:"playlists",maxResults:50,startIndex:1},initialize:function(){this.on("change:id",this.getInfo,this),this.on("change:startIndex",this.getInfo,this),this.on("change:items",this.fetchNext,this)},getInfo:function(){this.hasChanged("id")&&(this.set("items",null,{silent:!0}),this.set({startIndex:1},{silent:!0})),this.fetch()},fetchNext:function(){var e=this.get("maxResults"),t=this.get("startIndex"),n=this.get("totalItems"),r=e+t,i=n-r>0;if(i){this.set("startIndex",r);return}this.trigger("done",this.get("items"),this)},url:function(){var t=e.isNull(this.get("maxResults"))?!1:this.get("maxResults"),n=this.get("type");return"https://gdata.youtube.com/feeds/api/"+this.get("type")+"/"+this.get("id")+"?v=2&alt=jsonc"+(t?"&max-results="+t:"")+(n==="playlists"?"&start-index="+this.get("startIndex"):"")},parse:function(e){return this.get("id")===this.previous("id")&&this.get("items")&&(e.data.items=this.get("items").concat(e.data.items)),e.data}});return n});