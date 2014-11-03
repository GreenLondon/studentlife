k=0;
majorCounter = 0;
appbannerCounter = 0;
mainCounter = 0;
latestCounter = 0;
fromPage='';



var app = {

	init: function() {
		console.log('app.init');
		var hash = window.location.hash.replace(/^.*?#/,'');
		if (hash == '') {
			app.getPosts();
			
			majorCounter = 0;
			mainCounter = 0;
			latestCounter = 0;
			appbannerCounter = 0;
		}

		$('.app-menu a').on('click', app.menus);

	},

	getPosts: function() {
		console.log('app.getPosts');
		var rootURL = 'http://spotlight.studentlife.com.cy/wp-json';
		var filter ='?filter[tag]=';
		var tags =['major','main','app-banner','latest'];
		var tagsLen = tags.length;
		console.log('Tags '+tagsLen);
		    for(var j=0; j<tagsLen;j++){
				//alert(j);
					var fetchURL = rootURL+'/posts'+filter+tags[j];


		$.ajax({
			type: 'GET',
			url: fetchURL,
			dataType: 'json',
			success: function(data){
				$.each(data, function(index, value) {
					var post_tags = value.terms.post_tag;
					var category = value.terms.category[0].name;
					var tag="";
					for (var l in post_tags)
					{
						tag=tag + post_tags[l].slug;
					}
					//alert(tag);
					var major = /major/;
					var majorExists = major.test(tag);
		    		var main = /main/;
					var mainExists = main.test(tag);
					var appbanner = /app-banner/;
					var appbannerExists = appbanner.test(tag);
					var latest = /latest/;
					var latestExists = latest.test(tag);
					if(majorExists){
 						tag="major";
					}
					else if(mainExists){
 						tag="main";
					}
					else if(appbannerExists){
 						tag="app-banner";
					}
					else if(latestExists){
 						tag="latest";
					}
					else{
						tag=category;
					}
					switch(tag){
						case "major":
							if(majorCounter==0){
								majorCounter++;
						$('.main-story').append(
							'<a href="index.html#'+value.ID+'">'+
							'<div class="main-story-shade">'+
							'<img class="main-story-image" src="'+value.featured_image.source+'"/>'+
							'</div><!--main-story-shade-->'+
							'<div class="main-text">'+
							'<h1>'+value.title+'</h1>'+
							'</div><!--main-text--></a>');
							}
							break;
						case "main":
							if(mainCounter<4){
								mainCounter++;
								$('.sub-stories').append('<div class=\"sub-story\">'+
				  					  '<a href=\"#'+value.ID+'\">'+
				  					  '<img src=\"'+value.featured_image.source+'\" class=\"attachment-square-thumb wp-post-image\">'+
			 	  					  '<div class=\"sub-text\">'+
				  					  '<h2>'+value.title+'</h2>'+	  	   		 	  
	  	  	  	  					  '</div></a></div>');
							}
							break;
						case "app-banner":
							if(appbannerCounter==0){
								appbannerCounter++;
						$('.banner').append('<img src="'+value.featured_image.source+'" />');
							}
							break;
						case "latest":
							if(latestCounter<8){
								latestCounter++;
								$('ul.topcoat-list').append('<li class="topcoat-list__item">' +
			    				'<a class="view-link" href="#'+value.ID+'">' +
			      				'<h3>'+value.title+'</h3>' +
			      				'<p>'+value.excerpt+'</p></a></li>');
							}
							break;
						
					}
					
						
			
			    });
				/*pageHeight=$('.page').height();
				alert($('#container').height());
				alert($('.page').height());*/
			},
			error: function(error){
				console.log(error);
			}

		});
}
	},
	
	getPostsCategory: function(categoryName) {
		console.log('app.getPostsCategory');
		var rootURL = 'http://spotlight.studentlife.com.cy/wp-json';
		var filter ='?filter[category_name]=';
	    var fetchURL = rootURL+'/posts'+filter+categoryName;
		$.ajax({
			type: 'GET',
			url: fetchURL,
			dataType: 'json',
			success: function(data){
				$.each(data, function(index, value) {
					var post_tags = value.terms.post_tag;
					var category = value.terms.category[0].name;
					$('ul.topcoat-list').append('<li class="topcoat-list__item category-item">' +
			    	'<a class="view-link" href="#'+value.ID+'">' +
			      	'<img src="'+value.featured_image.source+'" /><br>' +
			      	'<h3>'+value.title+'</h3></a>' +
			      	'<p>'+value.excerpt+'</p></li>');
			    });
				
				/*pageHeight=$('.page').height();
				alert($('#container').height());
				alert($('.page').height());*/
			},
			error: function(error){
				console.log(error);
			}

		});
	},


	getSinglePost: function(postID) {
		console.log('getSinglePost');

		var rootURL = 'http://spotlight.studentlife.com.cy/wp-json';

		$.ajax({
			type: 'GET',
			url: rootURL + '/posts/' + postID,
			dataType: 'json',
			success: function(data){
				console.log(data);
                $('.single-post .title').append(data.title);
				author="By " + data.author.name;
				$('.single-post .author').append(author);
				postContent=data.content;
				$('.single-post .content').html(postContent);

		
			},
			error: function(error){
				console.log(error);
			}

		});

	},

	route: function(event) {
		var homePage =
    		'<div class="home"><div id="featured-main"><div class="main-story"></div><div class="sub-stories"></div></div><ul class="topcoat-list"></ul><div class="banner"></div></div>';
			
	    var categoryPage =
    		'<div class="home"><div class="loader"><img src="www/images/loader.gif"/></div><ul class="topcoat-list categories-loaded"></ul></div>';

		var singlePost =
		    '<div><article class="single-post">' +
		    '<h2 class="title"></h2>' +
			'<h4 class="author"></h4>' +
		    '<div class="content"></div>' +
		    '</article></div>';
			
		var contactUs =
		    '<div id="contact-info">' +
			'<h2>Επικοινωνήστε μαζί μας</h2>' +
			'<br>' +
		    '<p>Δ: Λάρνακος 127, Αγλαντζιά</p>' +
			'<p>E: info@studentlife.com.cy</p>' +
		    '<p>Τ: 70009920</p>' +
		    '</div>';

		var page,
        hash = window.location.hash.replace(/^.*?#/,'');
		var categoryHash = /category/;
		var categoryExists = categoryHash.test(hash);
        console.log(hash);

        /* If the hash is sample, show the samplePage. If it's anything else, load the singlePost view, otherwise it's the homePage */

       if (hash != '') {
			if (categoryExists){
				hash = window.location.hash.replace(/^.*?category\//,'');
				page = categoryPage;
				app.getPostsCategory(hash);
				fromPage="category-page";
			}
			else if(hash=="contactus")
			{
				page=contactUs;
				fromPage="contactus";
			}
			else{
				page = singlePost;
        	    app.getSinglePost(hash);
				fromPage="single-page";
			}
        } else {
        	console.log('home page');
    		page = homePage;
			fromPage="home-page";
    		app.init();
    	}

    	slider.slidePage($(page),fromPage);
	},
}

var slider = new PageSlider($("#container"),fromPage);
$(window).on('hashchange', app.route);
app.route();


