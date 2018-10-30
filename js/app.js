// initial function
$(window).on('load', function(){
    // your logic here`enter code here`
    defaultScreenSize();

});



// check initial screen size
const defaultScreenSize = () => {
    var maxwidth = $( document ).width();

    if ( maxwidth >= 1207 ) {
        $(".nav-ul").addClass("flex-column");
        $(".nav-nav").addClass("flex-column");
        $(".navbar-brand").addClass("sr-only");
        $(".userPhoto").removeClass("sr-only");
    }
}

// adjust window size 
$(window).resize(function() {
    var maxwidth = $( document ).width();

    if ( maxwidth >= 1207 ) {
        $(".nav-ul").addClass("flex-column");
        $(".nav-nav").addClass("flex-column");
        $(".navbar-brand").addClass("sr-only");
        $(".userPhoto").removeClass("sr-only");
    }else{
        if($(".nav-ul").hasClass("flex-column") && $(".nav-nav").hasClass("flex-column")){
            $(".nav-ul").removeClass("flex-column");        
            $(".nav-nav").removeClass("flex-column");   
            $(".navbar-brand").removeClass("sr-only");
           $(".userPhoto").addClass("sr-only");
        }
    }
});

//window on click on nav
$(window).click(function(e) {
    if(e.target.className === "nav-link"){
        $('.nav-ul li').removeClass('active');
        $(e.target).parents('li').addClass('active')
    }
});

