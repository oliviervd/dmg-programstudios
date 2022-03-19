import object_colors from "../data/objects_color.json";

const MasonryGrid = (props) => {

        var images = '';

        object_colors = object_colors.filter(function(entry) {
            return entry.color_names.includes("green") //todo:fix
        })

        console.log(props.c);

        for (var i=1; i<6; ++i) {
            // pick random image from the collection
            var x = Math.floor(Math.random() * object_colors.length) // todo: add function that uses each number only once.
            // convert string to array and clean up value
            var _im = object_colors[x]["IIIF_image"].replace("['","").replace("']","").replace("'","").split(",")

            images += '<div>' +
                '<img src='+_im[0].replace("/full/0/default.jpg","/500,/0/default.jpg")+'></img>' +
                '<div class="hexBox"> In 1967 "Marine" was loved by [author] when he used this color in the process of crafting this object.' +
                '</div>' +
                '</div>';

        }

        document.getElementById('imageRandom').innerHTML = images
    };

export default MasonryGrid;