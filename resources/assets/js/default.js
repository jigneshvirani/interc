$(document).ready(function () {

    var direction = false;
    if ($('[lang="ar"]').length) {
        direction = true;
    }

    if ($('.landing-slider-init').length) {
        var item_count = parseInt($('.landing-slider-init').find('.landing-slide').length);
        $('.landing-slider-init.owl-carousel').owlCarousel({
            items: 1,
            animateIn: 'fadeIn',
            touchDrag: false,
            mouseDrag: false,
            autoplay: true,
            nav: true,
            rtl: direction,
            navText: ['', ''],
            animateOut: 'fadeOut',
            onInitialize: function (event) {
                if (item_count <= 1) {
                    this.options.autoplay = false;
                    this.options.loop = false;
                    this.options.dots = false;
                    this.options.nav = false;
                } else {
                    this.options.autoplay = true;
                    this.options.loop = true;
                    this.options.dots = true;
                    this.options.nav = true;
                }
            }
        });
    }

    if ($('.detail-slider-init').length) {
        var item_count = parseInt($('.detail-slider-init').find('.detail-slide').length);
        $('.detail-slider-init.owl-carousel').owlCarousel({
            items: 1,
            nav: true,
            dots: true,
            rtl: direction,
            navText: ['', ''],
            onInitialize: function (event) {
                if (item_count <= 1) {
                    this.options.autoplay = false;
                    this.options.loop = false;
                    this.options.dots = false;
                    this.options.nav = false;
                } else {
                    this.options.autoplay = true;
                    this.options.loop = true;
                    this.options.dots = true;
                    this.options.nav = true;
                }
            }
        });
        $('.detail-slider-init').find('.owl-nav div').unwrap();
    }

    if ($('.testimonial-slider-init').length) {
        var item_count = parseInt($('.testimonial-slider-init').find('.testimonial-slide').length);
        $('.testimonial-slider-init.owl-carousel').owlCarousel({
            items: 2,
            nav: true,
            dots: false,
            rtl: direction,
            navText: ['', ''],
            onInitialize: function (event) {
                if (item_count < 2) {
                    this.options.loop = false;
                    this.options.nav = false;
                } else {
                    this.options.loop = true;
                    this.options.nav = true;
                }
            },
            responsive: {
                0: {
                    items: 1,
                    dots: true
                },
                992: {
                    items: 2,
                    dots: true
                }
            }
        });
    }

    // Mobile navigation
    $('.menu-trigger').on('click', function () {
        navcheck();
        $('body').toggleClass('menu--open');
        $('.navigation').slideToggle('fast');
    });
    $('.arrow').on('click', function () {
        $(this).parent().siblings().removeClass('sun-nav--open').find('ul').slideUp('fast');
        $(this).parent().toggleClass('sun-nav--open').find('ul').slideToggle('fast');
    });


    //DropZone
    if ($(".drop-area").length) {
        $(".drop-area").dropzone({
            url: "images/uploads",
            paramName: "file",
            maxFilesize: 10,
            thumbnailWidth: 193,
            thumbnailHeight: 237,
            previewsContainer: ".file-preview",
            uploadMultiple: true,
            parallelUploads: 5,
            maxFiles: 20,
            init: function () {
                var cd;
                this.on("success", function (file, response) {

                });
                this.on("addedfile", function (file) {
                    $(document).on('click', '.dz-progress', function () {
                        $(this).parents('.dz-preview').remove();
                    });
                });
            }
        });
    }

    if ($('.range-slider').length) {
        $('.range-slider').each(function () {
            $(this).slider({
                tooltip: 'always',
                tooltip_split: true
            });
        });
    }

    setTimeout(function () {
        $('.loader-wrapper').fadeOut(300);
        $('body').addClass('page--loaded');
    },10000);

    //On change the main category.
    $(document).on('change', '.mainCategorySelect', function(){

        var dropdown = $('.innCategorySelect');
        $('.innCategorySelect').empty();
        $(".select-box2").hide();
        var item_id = $(this).val();
        
        if(item_id == 1){
            BrandsCalled();
            return false;
        }

        $.get('front/getinnercategory?category_id='+ item_id, function(response){
             console.log(response);
             if(response.success){
                $('.brand-select').hide();
                dropdown.append(
                        $('<option>', {
                            value: '0',
                            text: 'Select category'
                        }, '</option>'));
                response.data.forEach(function(entry) {
                    dropdown.append(
                        $('<option>', {
                            value: entry.id,
                            text: entry.en_name
                        }, '</option>'));
                });
                $(".select-box1").show();
             }else{

             }
        }); // $.get end
    });

    // To select the inner category.
    $(document).on('change', '.innCategorySelect', function(){
        var dropdown2=$('.innCategorySelect2');
        $('.innCategorySelect2').empty();

        var item_id2 = $(this).val();
        $.get('front/getinnercategory?category_id='+ item_id2, function(response){
            if(response.success){
                dropdown2.append(
                        $('<option>', {
                            value: '0',
                            text: 'Select category'
                        }, '</option>'));
               response.data.forEach(function(entry) {
                    dropdown2.append(
                        $('<option>', {
                            value: entry.id,
                            text: entry.en_name
                        }, '</option>'));
                });
               $(".select-box2").show();
             }else{
               $(".select-box2").hide(); 
             }
        }); // $.get end
    });

    // To Brands called.
    function BrandsCalled(){
        
        //brandSelection
        var dropdown4 = $('.brandSelection');
        $('.brandSelection').empty();

        $.get('front/getcarsbrand?category_id=1', function(response){
            if(response.success){
                dropdown4.append(
                        $('<option>', {
                            value: '0',
                            text: 'Select Brand'
                        }, '</option>'));
               response.data.forEach(function(entry) {
                    dropdown4.append(
                        $('<option>', {
                            value: entry.id,
                            text: entry.en_name
                        }, '</option>'));
                });

               $('.select-box1').hide();
               $('.brand-select').show();
             }else{
               $('.brand-select').hide();
             }
        }); // $.get end
    }

    // When change the brand.
    $(document).on('change', '.brandSelection', function(){

        var dropdown3= $('.modelSelection');
        $('.modelSelection').empty();
        var item_id3 = $(this).val();
        $.get('front/getbrandmodels?brand_id='+ item_id3, function(response){
            if(response.success){
                dropdown3.append(
                        $('<option>', {
                            value: '0',
                            text: 'Select Model'
                        }, '</option>'));
               response.data.forEach(function(entry) {
                    dropdown3.append(
                        $('<option>', {
                            value: entry.id,
                            text: entry.en_name
                        }, '</option>'));
                });
               $('.brand-select').show();
             }else{
               $('.brand-select').hide();
             }
        }); // $.get end
    });

    // To submit the application city form.
    $(document).on('change', '#application_city', function(){
       $("#cityForm").submit();
    });

    // Search functionality
    $(document).on('change','.searchMainCategory', function(){
        
        var mainCategorySelection = $(this).val();
        $('.subfirst').hide();
        $('.select-box1').hide();
        $('.select-box2').hide();
        $('.brand-select').hide();

        var searchSubcategory = $('.searchSubcategory');
        $('.searchSubcategory').empty();

        $.get('front/getsecondlevelcategory?category_id='+ mainCategorySelection, function(response){
             console.log(response);
             if(response.success){
                searchSubcategory.append(
                        $('<option>', {
                            value: '0',
                            text: 'Select category'
                        }, '</option>'));
                response.data.forEach(function(entry) {
                    searchSubcategory.append(
                        $('<option>', {
                            value: entry.id,
                            text: entry.en_name
                        }, '</option>'));
                });
                $(".subfirst").show();
             }else{

             }
        }); // $.get end
    });

    // Second level category.
    $(document).on('change', '.searchSubcategory', function(){

        var searchSubcategory = $(this).val();
        var innCategorySelect = $('.innCategorySelect');

        $('.innCategorySelect').empty();
        $('.select-box1').hide();
        $('.select-box2').hide();
        $('.brand-select').hide();

        // To search category.
        if(searchSubcategory == 1){
            BrandsCalled2();
            return false;
        }

        // To get the inner category.
        $.get('front/getinnercategory?category_id='+ searchSubcategory, function(response){
            if(response.success){
                innCategorySelect.append(
                        $('<option>', {
                            value: '0',
                            text: 'Select category'
                        }, '</option>'));
                response.data.forEach(function(entry) {
                    innCategorySelect.append(
                        $('<option>', {
                            value: entry.id,
                            text: entry.en_name
                        }, '</option>'));
                });
                $('.select-box1').show();
             }else{

             }
        }); // $.get end
    });

    // To Brands called.
    function BrandsCalled2(){
        
        //brandSelection
        var dropdown4 = $('.brandSelection');
        $('.brandSelection').empty();
        $('.select-box1').hide();
        $('.select-box2').hide();
        $('.brand-select').hide();

        $.get('front/getcarsbrand?category_id=1', function(response){
            if(response.success){
                dropdown4.append(
                        $('<option>', {
                            value: '0',
                            text: 'Select Brand'
                        }, '</option>'));
               response.data.forEach(function(entry) {
                    dropdown4.append(
                        $('<option>', {
                            value: entry.id,
                            text: entry.en_name
                        }, '</option>'));
                });
                $('.brand-select').show();
             }else{
               $('.brand-select').hide();
             }
        }); // $.get end
    }

    // To search by advance search
    $(document).on('click','.advanceFilterButton', function(e){
        e.preventDefault();
        $('.advance_search_open').val(1);
        $('.search-form-page').submit();
        alert('console');
    });


});

$(window).resize(function () {
    if (winw() < 992) {
        navcheck();
    }
});

$(window).load(function () {
    $('.loader-wrapper').fadeOut(300);
    $('body').addClass('page--loaded');
});

function navcheck() {
    if (winw() < 993) {
        $('.navigation').css('max-height', winh() - headerh());
    }
}

function winw() {
    return $(window).width();
}

function winh() {
    return $(window).height();
}

function headerh() {
    return $('header').outerHeight();
}

// Front angular js
// Dev: Jigs Virani
// 06 March 2018

var app = angular.module('mallyApp', ['ngRoute', 'ui.bootstrap']);

app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);

app.config(function($logProvider){
    $logProvider.debugEnabled(true);
});

// Home controller
app.controller('homeController', function($scope, $http) {
    
    $scope.showCategory = false;
    $scope.showinnerCategory = false;
    $scope.allsecinnercategory = '';

    // To fetch the main category.
    $scope.mainCategory = function(category_id){
        $scope.mainCategoryone =false;
        $scope.showinnerCategory = false;
        
        $http.get('front/getsubcategory?category_id='+ category_id, {cache: false}).
            success(function (response, status, headers, config) {
                $scope.showCategory = true;
                $scope.allsecinnercategory = '';
                $scope.allsubcategory = response.data;
                 console.log(response.data);
            }).
            error(function (data, status, headers, config) {
            });
     }

    // Main category has been selected.
    $scope.mainCategoryChanged = function(item_id){

        $http.get('front/getinnercategory?category_id='+ item_id, {cache: false}).
        success(function (response, status, headers, config) {
            $scope.allinnercategory = response.data;
            $scope.allsecinnercategory = '';
            $scope.showinnerCategory =true;

        }).
        error(function (data, status, headers, config) {
        });
    }

    // To fetch the inner category.
    $scope.innerCategoryChanged = function(inner_id){
    
        $http.get('front/getinnercategory?category_id='+ inner_id, {cache: false}).
        success(function (response, status, headers, config) {
            if(response.data){
                
                $scope.allsecinnercategory = response.data;
            }
        }).
        error(function (data, status, headers, config) {
        });
    }

});