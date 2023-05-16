$.ajax({
    url:'/database',
    type:'GET',
})
.then(data=>{
    console.log(data)
    server_database_data = data;
    console.log(server_database_data[1].gioithieu)
    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        var item = $(`
        <li id="${element.id_name}" class="mydataitemclass provider-card" data-sponsorship="NONE" data-position="${element.id}">
        <span aria-label="List position" class="provider-card__position">${element.id}</span>
        <div class="provider-card__intro">
            <button type="button" onclick="addFavouriteFunc(${element.id})">Add to favourite</button>
            <div class="provider-card__header">
                <a href="${element.companylink}"
                    target="_blank" rel="nofollow"
                    class="provider-card__logo provider-logo track-website-visit">
                    <img property="image"
                        src="${element.img_companylink}"
                        alt="${element.company_name} Logo">
                </a>
                <h3 class="provider-card__title" title="${element.company_name}">
                    <a href="${element.companylink}"
                        target="_blank" rel="nofollow" class="track-website-visit">
                        ${element.company_name}
                    </a>
                </h3>
            </div>
            <div class="rating-box">
                <div class="rating-box__overall">
                    <div class="rating-box__overall-heading">
                        <p class="rating-box__overall-title">(${element.review_num})</p>
                        <a href="${element.clutchlink}"
                            target="_blank" rel="nofollow" class="rating-box__overall-reviews-link">
                            Read Full Reviews on Clutch
                        </a>
                    </div>
                    <span class="rating-box__overall-score">${element.diemdanhgia}</span>
                </div>
                <ul class="rating-box__details">
                    <li class="rating-box__detail">
                        <p class="rating-box__detail-title">Scheduling</p>
                        <span class="rating-box__detail-score">${element.rating1}</span>
                        <div class="rating-box__detail-line" style="--rating: ${element.rating1}">
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                        </div>
                    </li>
                    <li class="rating-box__detail">
                        <p class="rating-box__detail-title">Quality</p>
                        <span class="rating-box__detail-score">${element.rating2}</span>
                        <div class="rating-box__detail-line" style="--rating: ${element.rating2}">
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                        </div>
                    </li>
                    <li class="rating-box__detail">
                        <p class="rating-box__detail-title">Cost</p>
                        <span class="rating-box__detail-score">${element.rating3}</span>
                        <div class="rating-box__detail-line" style="--rating: ${element.rating3}">
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                        </div>
                    </li>
                    <li class="rating-box__detail">
                        <p class="rating-box__detail-title">NPS</p>
                        <span class="rating-box__detail-score">${element.rating4}</span>
                        <div class="rating-box__detail-line" style="--rating: ${element.rating4}">
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                            <div class="rating-box__detail-line-divider"></div>
                        </div>
                    </li>
                </ul>
            </div>
            <a href="${element.clutchlink}"
                target="_blank" rel="nofollow" class="rating-box__overall-reviews-link mobile">
                Read Full Reviews on Clutch
            </a>
            <a href="${element.companylink}"
                target="_blank" rel="nofollow" class="provider-card__visit-link track-website-visit">
                Visit Site
            </a>
        </div>
        <div class="provider-card__body">
            <ul class="provider-card__details">
                <li aria-label="Budget" class="provider-card__details-item">
                    <div class="provider-card__details-item-icon budget custom_popover"
                        data-content="<i>Min. Project Size</i>"></div>
                    <span>${element.min_project_size}</span>
                </li>
                <li aria-label="Employees" class="provider-card__details-item">
                    <div class="provider-card__details-item-icon employees custom_popover"
                        data-content="<i>Company Size</i>"></div>
                    <span>${element.company_size}</span>
                </li>
                <li aria-label="Location" class="provider-card__details-item">
                    <div class="provider-card__details-item-icon location custom_popover"
                        data-content="<i>Location</i>"></div>
                    <span><span class="locality">${element.location}</span></span>
                </li>
            </ul>
            <div class="provider-card__summary">
                <p class="gioithieuclass">${element.gioithieu}</p>
            </div>            

            <div class="provider-card__columns">
                    <div class="provider-card__columns-item clients-column">
                        <p class="provider-card__heading">Clients</p>
                            <ul class="clients-column__list my_columns_clients_arraylist_${element.id}">

                            </ul>
                    </div>
                    <div class="provider-card__columns-item industries-column">
                        <p class="provider-card__heading">Industries</p>
                            <ul class="industries-column__list my_columns_industries_arraylist_${element.id}">

                            </ul>
                    </div>             
            </div>

            <div class="provider-card__notable">
                <p class="provider-card__heading">Notable Project</p>
                <div class="provider-card__notable-text">
                    <p class="notable_class">${element.notable_project}</p>
                    <blockquote>
                        <p class="quotes_class">${element.quotes}</p>
                    </blockquote>
                </div>
            </div>
            <a href="${element.companylink}"
                target="_blank" rel="nofollow" class="provider-card__visit-link mobile track-website-visit">
                Visit Site
            </a>
        </div>
    </li>
        `)        

        $(`.directory-providers__list`).append(item);

        if(element.ds_clients != "" && element.ds_clients != null && element.ds_clients != undefined)
        {
            const dsclient_array = element.ds_clients.split(",");

            for (let j = 0; j < dsclient_array.length; j++) {
                const ele2 = dsclient_array[j];

                my_columns_clients_arraylist = $(`<li class="clients-column__item">${ele2}</li>`);
                $(`.my_columns_clients_arraylist_${element.id}`).append(my_columns_clients_arraylist);
            }
        }
        
        if(element.ds_industries != "" && element.ds_industries != null && element.ds_industries != undefined)
        {            
            const dsindus_array = element.ds_industries.split(",");
            const ds_class_indus_array = element.ds_classindustries.split(",");

            for (let z = 0; z < dsindus_array.length; z++) {
                const ele2 = dsindus_array[z];
                const ele3 = ds_class_indus_array[z];
                
                my_columns_industries_arraylist = $(`
                <li aria-label="${ele2}" class="industries-column__item custom_popover"
                    data-content="<i>${ele2}</i>">
                    <i class="${ele3}"></i>
                </li>
                `);

                $(`.my_columns_industries_arraylist_${element.id}`).append(my_columns_industries_arraylist);
            }
        }
    }
})
.catch(err=>{
    console.log("API Loi");
    console.log(err);
})

$.ajax({
    url:'/database-account',
    type:'GET',
})
.then(data=>{
    console.log(data);
})
.catch(err=>{
    console.log("API Loi");
    console.log(err);
})

const form = {
    company_name: document.getElementById('companynameinput'),
    indus_name: document.getElementById('indusnameinput')    
};

(function ($) {
    function processForm(e) {
        closeAll(10);

        $.ajax({
            type: "POST",
            url: '/database/',
            contentType: 'application/x-www-form-urlencoded',
            data: `company=${form.company_name.value}&indus=${form.indus_name.value}`,
            success: function (data, textStatus, jQxhr) {
                console.log(data);
                if(data == 'false')
                {
                    alert("No Company Found!");
                }
                else
                {
                    const data_array = data.split(","); 
                    alert("Found " + (data_array.length - 1) + " Company");

                    for (let i = 0; i < data_array.length - 1; i++) {
                        const element = data_array[i];
                     
                        if(document.getElementById(data_array[i]) != null)
                        {
                            document.getElementById(data_array[i]).style.display = "flex";
                        }
                    }
                }
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }

    $('#formajax').submit(processForm);
})(jQuery);