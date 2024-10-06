let sections = document.querySelectorAll('section');

window.onscroll = () => {
    console.log('scroll');
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let triggerOffset = 500;  // Adjust this value to trigger the animation earlier

        if (top >= offset - triggerOffset && top < offset + height){
            sec.classList.add('show-animate');
        }else{
            sec.classList.remove('show-animate');
        }
    })
}
