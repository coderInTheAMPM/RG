export let x = undefined;
export let y = undefined;

window.addEventListener("mousemove", function(event){
    x = event.x;
    y = event.y;
});
