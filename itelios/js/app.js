(function () {

    "use strict";

    function getJson(fileName, callback) {
        var xmlhttp;
        xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), xmlhttp.onreadystatechange = function() {
            if (4 === xmlhttp.readyState && 200 === xmlhttp.status) {
                var jsonData;
                try {
                    jsonData = JSON.parse(xmlhttp.responseText)
                } catch (e) {
                    eval("jsonData = (" + xmlhttp.responseText + ");")
                }
                callback.apply(this, [jsonData])
            }
        }, xmlhttp.open("GET", fileName, !0), xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), xmlhttp.send(null)
    }

    function createProductItem(data, type){

        var html = "",
            businessId = data.businessId,
            name = (data.name).match(/.{1,84}/g),
            imageName = data.imageName.replace('//www.itelios.com.br/arquivos/imagens','images'),
            price = data.price,
            oldPrice = data.oldPrice,
            paymentConditions = data.productInfo.paymentConditions.replace('ou até','ou <strong>').replace('sem juros','</strong> sem juros');

        html += '<div class="product-item">';
        html += '<div class="product-image"><a href="#"><img src="'+imageName+'" alt="'+name+'"/></a></div>';
        html += '<div class="product-info">';
        html += '<h3 class="product-name"><a href="#">'+ name[0] + '...</a></h3>';
        html += '<p class="product-price"><a href="#">';
        html += '<span class="new-price">Por: <strong>'+price+'</strong></span><br/>';
        html += '<span class="price-conditions">'+paymentConditions+'</span>';
        html += '</a></p>';
        html += '</div>';
        html += '<div class="product-actions"><a href="#" class="btn btn-addtocart">adicionar ao carrinho <i class="material-icons">add_shopping_cart</i></a></div>';
        html += '</div>';

        document.querySelector(type).insertAdjacentHTML("beforeend", html);
    }

    function shelfRecommended(){
        getJson("products.json", function(j){ 

            var productVisited = j[0].data.item;
            var recommendedProduct = j[0].data.recommendation;

            createProductItem(productVisited, ".product-visited");

            for (var i = 0; i < recommendedProduct.length; i++) {
                createProductItem(recommendedProduct[i], ".shelf-recommended-items");
            }

            recommendedCarousel();
        });
    }

    function recommendedCarousel(){
        var shelfRecommended = $('.shelf-recommended-items');
        if(shelfRecommended.find('.product-item').length < 1) return false;

        shelfRecommended.owlCarousel({
            items: 3,
            nav: true,
            responsive:{
                0:{
                    items:1
                },
                // 479:{
                //     items:4
                // },
                768:{
                    items:2
                },
                992:{
                    items:3
                },
                1200:{
                    items:3
                }

              }
        });
    }

    shelfRecommended();
})();