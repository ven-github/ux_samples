// Model
var Blog = Backbone.Model.extend({
	defaults: {
		author: '',
		title: '',
		url:''
	}
});

// Collection
var Blogs = Backbone.Collection.extend({});

// Initanite a collection
var blogs = new Blogs();

// view for a single blog
var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function(){
		this.render();
    },
    render: function(){
    	// Compile the template using underscore
        template = _.template($('.blogs-list-template').html());

        // Load the compiled HTML into the Backbone "el"
       this.$el.html( template(this.model.toJSON()) );
    }
});


// view for all blogs
var BlogsView = Backbone.View.extend({
	model: blogs,
	initialize: function(){
		this.model.on('add', this.render, this);
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			self.$el.append((new BlogView({model: blog})).$el);
		});
		return this;
	}
});

var blogsView = new BlogsView({el: $('.blogs-list')});

$(document).ready(function(){
	 $('.add-blog').on('click', function(){
	 	var blog = new Blog({
	 		author: $('.author-input').val(),
	 		title: $('.title-input').val(),
	 		url: $('.url-input').val()
	 	});
	 	blogs.add(blog);
	 	$('.author-input').val('');
	 	$('.title-input').val('');
	 	$('.url-input').val('')
	 })
})
