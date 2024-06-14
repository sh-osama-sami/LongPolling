let file_div = document.getElementById('filecontent');

function load_data(lastmodtime) {
    $.ajax({
        url: 'http://127.0.0.1:5000/longpolling', 
        method: 'GET',
        data: {
            lastmod: lastmodtime
        },
        success: function (data) {
            response_data = JSON.parse(JSON.stringify(data));
            console.log(response_data);
            file_div.innerHTML = `<h4>${response_data.data}</h4>`;
            file_div.innerHTML += `<hr/>`;
            lastmodtime = response_data.filetime;
            load_data(lastmodtime);
        },
        error: function () {
            console.log('Error loading data');
            file_div.innerHTML = '<h2 class="text-danger"> Error getting data</h2>';
            load_data(0);
        },
  
    });
}

load_data(0);
