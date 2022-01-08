$(document).ready(function() { 

    document.addEventListener("DOMContentLoaded", lazy_setup());



    function lazy_setup(){
        const images = document.querySelectorAll('[data-src]');
        if('IntersectionObserver' in window){
            var intersectionObserverOptions = {
                root: null,
                threshold : 0
            }
        
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function(entry) {
                    if(entry.isIntersecting){
                        const dataSrc = entry.target.getAttribute('data-src');
                        
                        // Make image visible
                        entry.target.setAttribute('src', dataSrc); 
                        
                        // remove 'data-src' attribute
                        entry.target.removeAttribute('data-src');

                        // remove 'lazy' class
                        entry.target.classList.remove('lazy'); 

                        // unobserve image
                        observer.unobserve(entry.target);
                    }
                });
            }, intersectionObserverOptions);
            images.forEach(function(img) {
                observer.observe(img);
            });
        }
        else{
            $(document).scroll(function () {
                processScroll();
            });
        }
    }

    function processScroll(){
        $('[data-src]').each(function (index) {
            var actual_image = $(this);
            if(elementInViewport(actual_image) && actual_image.hasClass('lazy')){
                const dataSrc = actual_image.get(0).getAttribute('data-src');

                // Make image visible
                actual_image.get(0).src = dataSrc; 

                // Remove 'data-src' attribute
                actual_image.get(0).removeAttribute('data-src');

                // Remove 'lazy' class
                actual_image.get(0).classList.remove('lazy');      
            }
        });
    }

    function elementInViewport(el){
        var elementTop = el.offset().top;
        var elementBottom = elementTop + el.outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

});
