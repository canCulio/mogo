$(function(){
    const quoteContainer = document.getElementById('quote-container');
    const quoteText = document.getElementById('quote');
    const authorText = document.getElementById('author');
    const twitterBtn = document.getElementById('twitter');
    const newQuoteBtn = document.getElementById('new-quote');
    const loader = document.getElementById('loader');
    
    let apiQuotes = [];


    var header = $("#header"),
        introH = $("#intro").innerHeight(),
        scrollOffset = $(window).scrollTop();


        /* Fixed Header */
        checkScroll(scrollOffset);

    $(window).on("scroll", function(){
        scrollOffset = $(this).scrollTop();
        checkScroll(scrollOffset);
        
    });

    function checkScroll(scrollOffset){
        
        if(scrollOffset >= introH){
            header.addClass("fixed");
        }else{
            header.removeClass("fixed");
        }
    }


    /* Smooth scroll */
    $("[data-scroll]").on("click",function(event){
        event.preventDefault();
        var $this = $(this)
            blockId = $this.data('scroll'),
            blockOffset = $(blockId).offset().top;

            $("#nav a").removeClass("active");
            $this.addClass("active");


        $("html, body").animate({
            scrollTop: blockOffset
        }, 500);
    });

    /* Menu nav toggle */
    $("#nav-toggle").on("click", function(event){
        event.preventDefault();

        $(this).toggleClass("active");
        $("#nav").toggleClass("active");
    })


    /* Collapse */
    $("[data-collapse]").on("click",function(event){
        event.preventDefault();
        var $this = $(this),
        blockId = $this.data('collapse');

        $this.toggleClass("active");
        //$(blockId).slideToggle();
    });


    /* Slider */
    $("[data-slider]").slick({
        infinite: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    
    
    //Show loading
    function loading(){
        loader.hidden = false;
        quoteContainer.hidden = true;
    }
    
    //Hide loading
    function complete() {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
    
    function newQuote(){
        //loading();
        // Pick a random quote from apiQuotes array
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        //Check if Author field is blank and replace it with 'Unknown'
        if(!quote.author) {
            authorText.textContent = 'Unknown';
        } else {
            authorText.textContent = quote.author;
        }
    
        //Check quote length to determine styling
        if(quote.text.length > 120){
            quoteText.classList.add('long-quote');
        }else {
            quoteText.classList.remove('long-quote');
        }
        //set quote, hide loader
        quoteText.textContent = quote.text;
        complete();
    }
    
    // Get Quotes from API
    
    async function getQuotes(){
        //loading();
        const apiUrl = 'https://type.fit/api/quotes';
    
        try {
                const response = await fetch(apiUrl);
                apiQuotes = await response.json();
                newQuote();
        } catch(error) {
            //Catch error here
        }
    }
    
    
    // Tweet quote
    function tweetQuote(){
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
        window.open(twitterUrl, '_blank');
    }

    //Animation, toggle navbar
    
    
    // Event listeners
    newQuoteBtn.addEventListener('click',newQuote);
    twitterBtn.addEventListener('click', tweetQuote);
    

// On load
getQuotes();

});