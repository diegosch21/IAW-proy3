
var links = document.getElementsByTagName("a");

for(i=0;i<links.length;i++){
	var link = links[i];
	if(links[i].rel == "external"){
		links[i].onclick = function(e){
			var event = e || window.event;
			if(event.ctrlKey) return;
			window.open(this.href);
			return false;
		}
	}
}
