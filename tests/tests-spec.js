  describe('.findById(id)', function() {
	  
    // empty test cases
    it('match data', function() {
		
		var jsonData = {
				"title": "Buying an iPad Mini?",
				"content": [
					{
						"title": "What Types of iPad Minis Are Available?",
						"thumbnail": "ipad-mini.jpg",
						"description": "The iPad Mini is one of the latest offerings in Apple's stable of tablet computers, and – as the name suggests – differs from its older siblings in that it is much smaller in size.<br /><br />Just because the iPad Mini is physically smaller in size doesn't mean it's smaller in computing power. The tablet, which has features such as a 5MP camera, comes in a 16 GB, 32 GB, and 64 GB form. A Wi-Fi and a Wi-Fi + Cellular model are both available. As an added bonus, the iPad Mini comes in both white and black."
					},
					{
						"title": "How Much Storage Do I Need?",
						"thumbnail": "",
						"description": "If you're trying to decide which of the options – 16GB, 32GB, and 64GB – is right for you, you need to think about how you plan to use your iPad Mini. If you already have a host of other gadgets, such as the standard size iPad or an iPhone, then the 16GB may be all you need for a sturdy, reliable, on-the-go tablet. The more you plan to do with your tablet, and the more apps you plan to download, the more storage you'll need."
					},
					{
						"title": "Should I Choose Wi-Fi or Wi-Fi + Cellular?",
						"description": "Whether or not you need cellular for your iPad Mini depends on, again, how you're going to use it. If you're going to be taking it with you on the go, or even using it as an alternative to your cell phone, then Wi-Fi + Cellular is a must. However, if you only plan to use it at home, with the occasional outing to work or the local bookstore, plain Wi-Fi may be a better and more affordable alternative."
					},
					{
						"title": "What Comes with the iPad Mini?",
						"description": " The iPad Mini only ships brand new with the Lightning charger offered by Apple. Other accessories may be packaged along with the iPad Mini when it's being offered by a private seller on Gumtree. If you want to save a little money – or even just want a little convenience – consider scoping out package deals that include items such as the Smart Cover, Bluetooth keyboards, and a stylus.<br /><br />Check out the options on Gumtree, and you can have a great gadget at your disposal for a very fair price."
					}
				]
			};
			
			
			var matchData = function() {
				var description 	= $("div.align-top>p"),
					heading			= $(".heading"),
					subheading		= $("div.content-text>b"),
					imageName		= $("div.overlay-content>img"), 
					imgURLBase		= "assets/images/";
				
				// keep watch on the expected and actual values
				spyOn(heading, 'val').and.returnValue(jsonData.title);
				spyOn(subheading, 'val').and.returnValue(jsonData.content[0].title);
				spyOn(imageName, 'val').and.returnValue(imgURLBase+jsonData.content[0].thumbnail);
				spyOn(description, 'val').and.returnValue(jsonData.content[0].description);
				
				// console logs for tracking values on UI and expected one's
				console.log("Comparing heading : "+"\""+heading.val()+"\""+ " WITH "+"\""+jsonData.title+"\"");
				console.log("Comparing subheading : "+"\""+subheading.val()+"\""+ " WITH "+"\""+jsonData.content[0].title+"\"");
				console.log("Comparing thumbnail image source : "+"\""+imageName.val()+"\""+ " WITH "+"\""+imgURLBase+jsonData.content[0].thumbnail+"\"");
				console.log("Comparing description text:\n "+"\""+description.val()+"\""+ " \n\t\t\t\t\t\t\tWITH\n "+"\""+jsonData.content[0].description+"\"");
				
				// compare UI values with expected values
				expect(heading.val()).toEqual(jsonData.title);
				expect(subheading.val()).toEqual(jsonData.content[0].title);
				expect(description.val()).toEqual(jsonData.content[0].description);
				expect(imageName.val()).toEqual(imgURLBase+jsonData.content[0].thumbnail);
				
			};
			
			var triggerKeyDown = function (element, keyCode) {
				var e = $.Event("keydown");
				e.which = keyCode;
				element.trigger(e);
			};
			
			matchData();
		
		
    });

    
  });