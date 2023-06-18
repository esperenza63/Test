//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})

function yesnoCheck(that) {
    if (that.value == "yapıldı") {

        document.getElementById("SoliderTime").style = "display: flex; align-items: center;"
		document.getElementById("SoliderPostponement").style = "display: none;"
		document.getElementById("SoliderExempt").style = "display: none;"
    }
	if (that.value == "tecilli") {

        document.getElementById("SoliderPostponement").style = "display: flex; align-items: center;"
		document.getElementById("SoliderTime").style = "display: none;"
		document.getElementById("SoliderExempt").style = "display: none;"
    }
	if (that.value == "muaf") {
        document.getElementById("SoliderExempt").style = "display: flex; align-items: center;"
		document.getElementById("SoliderPostponement").style = "display: none;"
		document.getElementById("SoliderTime").style = "display: none;"
    }
}

var experienceCount = 0;

function addExperience() {
  experienceCount++;
  var experienceList = document.getElementById("experience-list");

  var experienceItem = document.createElement("div");
  experienceItem.classList.add("experience-item");

  var experienceTitle = document.createElement("h3");
 
  var experienceContent = document.createElement("p");
  var companyName = document.getElementById("BusinessName").value;
  var startDate = document.getElementById("StartDateWork").value;
  var endDate = document.getElementById("EndDateWork").value;
  var position = document.getElementById("BusinessPosition").value;
  var reason = document.getElementById("Reasonleaving").value;

  experienceContent.innerHTML =
	"<strong>İşyeri Adı:</strong> " + companyName + "<br>" +
	"<strong>İşe Başlama Tarihi:</strong> " + startDate + "<br>" +
	"<strong>İşten Çıkış Tarihi:</strong> " + endDate + "<br>" +
	"<strong>İş Yeri Pozisyonu:</strong> " + position + "<br>" +
	"<strong>İşten Ayrılma Nedeni:</strong> " + reason;

  experienceItem.appendChild(experienceTitle);
  experienceItem.appendChild(experienceContent);

  experienceList.appendChild(experienceItem);

  // Form alanlarını sıfırla
  document.getElementById("BusinessName").value = "";
  document.getElementById("StartDateWork").value = "";
  document.getElementById("EndDateWork").value = "";
  document.getElementById("BusinessPosition").value = "";
  document.getElementById("Reasonleaving").value = "";
}