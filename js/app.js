// initial function
$(window).on('load', function(){
    // your logic here`enter code here`
    defaultScreenSize();

});



// check initial screen size
const defaultScreenSize = () => {
    var maxwidth = $( document ).width();
    var maxHeight = $(document).height();

    if ( maxwidth >= 1207 ) {
        $(".nav-ul").addClass("flex-column");
        $(".nav-nav").addClass("flex-column");
        $(".name").addClass("sr-only");
        $(".userPhoto").removeClass("sr-only");
    }

    if(maxHeight <= 5689){
        $(".userPhoto").addClass("sr-only");
    }
}

// adjust window size 
$(window).resize(function() {
    var maxwidth = $( document ).width();
    var maxHeight = $(document).height();

    if ( maxwidth >= 1207 ) {
        $(".nav-ul").addClass("flex-column");
        $(".nav-nav").addClass("flex-column");
        $(".name").addClass("sr-only");
        $(".userPhoto").removeClass("sr-only");
    }else{
        if($(".nav-ul").hasClass("flex-column") && $(".nav-nav").hasClass("flex-column")){
            $(".nav-ul").removeClass("flex-column");        
            $(".nav-nav").removeClass("flex-column");   
            $(".name").removeClass("sr-only");
           $(".userPhoto").addClass("sr-only");
        }
    }

    if(maxHeight <= 5689){
        $(".userPhoto").addClass("sr-only");
    }
});

//window on click on nav
$(window).click(function(e) {
    if(e.target.className === "nav-link"){
        $('.nav-ul li').removeClass('active');
        $(e.target).parents('li').addClass('active')
    }
});

