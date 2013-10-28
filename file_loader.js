function handleFileSelect(evt) {
    var file = evt.target.files[0]; // FileList object
    var reader = new FileReader();

    // files is a FileList of File objects. List some properties.
    var output = [];
    output.push('&bull; Loaded file: ')
    output.push('<strong>', escape(file.name), '</strong>');
    output.push(' - ');
    output.push('<i>', file.size, ' kb </i>');
    document.getElementById('data_info_box').innerHTML = output.join('');

    reader.onload = function(e) {
        var data = $.csv.toObjects(e.target.result);
        drawScatterplot(data);
    };

    var rawCSV = reader.readAsText(file);
    console.log(rawCSV);
   }

$(document).ready(function(){
    document.getElementById('data_1').addEventListener('change', handleFileSelect, false);
});
