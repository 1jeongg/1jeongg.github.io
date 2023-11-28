 // alertbar later
    $(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y > 280) {
            $('.alertbar').fadeIn();
        } else {
            $('.alertbar').fadeOut();
        }
    });


// Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('nav').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down            
            $('nav').removeClass('nav-down').addClass('nav-up'); 
            $('.nav-up').css('top', - $('nav').outerHeight() + 'px');
           
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {               
                $('nav').removeClass('nav-up').addClass('nav-down');
                $('.nav-up, .nav-down').css('top', '0px');             
            }
        }

        lastScrollTop = st;
    }
    
    
    $('.site-content').css('margin-top', $('header').outerHeight() + 'px');


function loadSearch(){
    // Create a new Index
    idx = lunr(function(){
        this.field('id')
        this.field('title', { boost: 10 })
        this.field('summary')
    })
 
    // Send a request to get the content json file
    $.getJSON('/content.json', function(data){
 
        // Put the data into the window global so it can be used later
        window.searchData = data
 
        // Loop through each entry and add it to the index
        $.each(data, function(index, entry){
            idx.add($.extend({"id": index}, entry))
        })
    })
 
    // When search is pressed on the menu toggle the search box
    $('#search').on('click', function(){
        $('.searchForm').toggleClass('show')
    })
 
    // When the search form is submitted
    $('#searchForm').on('submit', function(e){
        // Stop the default action
        e.preventDefault()
 
        // Find the results from lunr
        results = idx.search($('#searchField').val())
 
        // Empty #content and put a list in for the results
        $('#content').html('<h1>Search Results (' + results.length + ')</h1>')
        $('#content').append('<ul id="searchResults"></ul>')
 
        // Loop through results
        $.each(results, function(index, result){
            // Get the entry from the window global
            entry = window.searchData[result.ref]
 
            // Append the entry to the list.
            $('#searchResults').append('<li><a href="' + entry.url + '">' + entry.title + '</li>')
        })
    })
}
//Tag filtering
$("[data-tag]").click((e) => {
    currentTag = e.target.dataset.tag;
    filterByTagName(currentTag);
    updateQueryString(currentTag);
  });
  
  //쿼리 파라미터
  $(document).ready(function() {
    let currentTag = "";
    const queryTag = getQuery().category;
    if (queryTag) {
      currentTag = queryTag;
      filterByTagName(currentTag);
    }
  });
  
  //필터링 함수
  function filterByTagName(tagName) {
    $('.post-wrapper').hide();
    $('.post-wrapper').each((index, elem) => {
      if (elem.hasAttribute(`data-${tagName}`)) {
        $(elem).show();
      }
    });
  }
  
  //사용자 쿼리 수정
  function updateQueryString(tagName) {
    const path = `${location.protocol}//${location.host}${location.pathname}?category=${tagName}`;
    window.history.replaceState({ path }, '', path);
  }

  //String to JSON
  function getQuery() {     
    var params = {};  
    var url = decodeURI(window.location.search);//한글 쿼리 지원
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, 
    	function(str, key, value) { 
        params[key] = value; 
      }
    );
    return params; 
  }
//   $(document).ready(function() {
//     let currentTag = "";
//     const queryTag = getQuery().category;
//     if (queryTag) {
//       currentTag = queryTag;
//       filterByTagName(currentTag)
//     }
//   });
  

// // //Smooth on external page
// $(function() {
//   setTimeout(function() {
//     if (location.hash) {
//       /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
//       window.scrollTo(0, 0);
//       target = location.hash.split('#');
//       smoothScrollTo($('#'+target[1]));
//     }
//   }, 1);

//   //taken from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
//   $('a[href*=\\#]:not([href=\\#])').click(function() {
//     console.log(this.hash);
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//       smoothScrollTo($(this.hash));
//       return false;
//     }
//   });

//   function smoothScrollTo(target) {
    
//     target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//     console.log(target);
   
//     if (target.length) {
//       $('html,body').animate({
//         scrollTop: target.offset().top
//       }, 1000);
//     }
//   }
//  });
