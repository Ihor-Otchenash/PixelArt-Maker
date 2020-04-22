document.addEventListener('DOMContentLoaded', function () {
    const setButton = document.getElementById('setButton');
    let grid = document.getElementById('grid');
    const tableWidthField = document.getElementById('tableWidth');
    const tableHeightField = document.getElementById('tableHeight');
    const colorPaletteDraw = document.getElementById('colorPaletteDraw');
    const colorPaletteBackground = document.getElementById('colorPaletteBackground');
    const colorPaletteBorder = document.getElementById('colorPaletteBorder');
    const tableContainer = document.getElementById('tableContainer');
    const error = document.querySelector('.error');
    let isMouseDown = false;
    
    createGrid(grid, getWidthValue(), getHeightValue());

    function getWidthValue(){
        return tableWidthField.value;
    };

    function getHeightValue(){
        return tableHeightField.value;
    };

    /* COLOR PICKER FOR DRAWING */

    function getColorDraw() {
        return colorPaletteDraw.value;
    };

    let selectedColorDraw = getColorDraw();

    colorPaletteDraw.addEventListener("change", function (){
            selectedColorDraw = getColorDraw();
        });

    /* COLOR PICKER FOR BACKGROUND */

    function getColorBackground() {
        return colorPaletteBackground.value;
    };

    let selectedColorBackground = getColorBackground();

    colorPaletteBackground.addEventListener("change", function (evt){
        selectedColorBackground = getColorBackground();
        grid.style.backgroundColor = selectedColorBackground;
    });

    /* COLOR PICKER FOR BORDERS */

    function getColorBorder() {
        return colorPaletteBorder.value;
    };

    let selectedColorBorder = getColorBorder();

    colorPaletteBorder.addEventListener("change", function (){
        selectedColorBorder = getColorBorder();
        grid.style.borderColor = selectedColorBorder;
    });
    
    function createGrid(tableWrap, height, width) {
        var gridBuild = "";
        for (var r = 0; r < height; r++) {
            gridBuild += '<tr>';
            for (var c = 0; c < width; c++) {
                gridBuild += '<td></td>'
            }
            gridBuild += '</tr>';
        }
        tableWrap.innerHTML = gridBuild;
    };

    /* SET BUTTON CONFIGURATION ACCORDING TO THE WIDTH/HEIGHT DATA*/

    setButton.addEventListener('click', function(event) {
        event.preventDefault();
        grid.style.backgroundColor = "none";
        createGrid(grid, getHeightValue(), getWidthValue());
        if (getHeightValue() > 80 || getHeightValue() < 1 || getWidthValue() > 80 || getWidthValue() < 1) {
            grid.style.display = "none";
            alert('Please check your entry');
            error.classList.add('errorAppear');
        } else {
            grid.style.display = "inline-block";
            error.classList.remove('errorAppear');
        }
    });

    /*APPLY ALREADY USED COLOR WHICH EXISTS IN THE GRID */

    grid.oncontextmenu = function(evt){
        return false;
    }

    function rgb2hex(rgb){
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
            ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }

    grid.addEventListener("contextmenu", function(evt) {
        let target = evt.target.closest("td");
        if (!target) return;
        selectedColorDraw = target.style.backgroundColor;
        if (selectedColorDraw == "") {
            colorPaletteDraw.value = getColorBackground();
        } else {
            colorPaletteDraw.value = rgb2hex(selectedColorDraw);
        }
    });

    /*APPLY CHOSEN COLOR TO DRAW ON THE GRID */

    grid.addEventListener('click', function(evt){
        let target = evt.target.closest("td");
        if (!target) return;
        target.style.backgroundColor = selectedColorDraw;
    });

    document.addEventListener('mousedown', function(evt){
        isMouseDown = true;
    });

    document.addEventListener('mouseup', function(evt){
        isMouseDown = false;
    });

    grid.addEventListener('mousemove', function(evt){
        if (isMouseDown) {
            let target = evt.target.closest("td");
            if (!target) return;
            target.style.backgroundColor = selectedColorDraw;
        }
    });

});