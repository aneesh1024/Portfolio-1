import UserData from './Userdata.json' assert { type: 'json' }

// Getting HTML for the User 
const userName = document.getElementById('user-name');
const userDesc = document.getElementById('user-desc');
const phoneNumber = document.getElementById('phone-number');
const linkedinLink = document.getElementById('linkedin-link');
const instaLink = document.getElementById('insta-link');
const aboutME = document.querySelector('.about-me-para');
const recentWorks = document.querySelector('.recent-works');
const cvBtn = document.querySelector('.btn');

// Setting the User Details from json 
userName.innerHTML = `${UserData.name}`;
userDesc.innerHTML = `${UserData.desc}`;
aboutME.innerHTML = `${UserData.aboutMe}`
phoneNumber.setAttribute('href', `tel:${UserData.phoneNumber}`);
linkedinLink.setAttribute('href', `${UserData.ContactLinks.linkedin}`);
instaLink.setAttribute('href', `${UserData.ContactLinks.instagram}`);
// cvBtn.children[0].setAttribute('href', `${UserData.CVlink}`)

// Navbar 
const links = document.querySelectorAll('.link');
links.forEach(item => item.addEventListener('click', () => {
    links.forEach(i => i.classList.remove('active-link'));
    item.classList.add('active-link');
    links.forEach(i => document.querySelector(`.${i.children[0].id}-page`).style.display = 'none');
    document.querySelector(`.${item.children[0].id}-page`).style.display = 'flex';
}));

// Adding Elements to Recent Works dynamically
var workList = Object.entries(UserData.recentWorks);
workList.forEach((item) => {
    var index = workList.indexOf(item)
    recentWorks.innerHTML += `
    <div class="work${index} work" data-inviewport="scale-in">
        <div class="work-about">
            <h3>${workList[index][1]['workName']}</h3>
            <p>${workList[index][1]['workDesc']}</p>
        </div>
        <div class="work-image">
            <img src=${workList[index][1]['imageUrl']} alt="" />
        </div>
    </div>
    `
})

// Animate elements when visible in viewport
const inViewport = (entries, observer) => {
    entries.forEach(entry => {
        entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
    });
};
const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};
const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
ELs_inViewport.forEach(EL => {
    Obs.observe(EL, obsOptions);
});

// Scroll to top button
const scrollToTop = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollToTop.style.display = 'block';
    } else {
        scrollToTop.style.display = 'none';
    }
}
)

scrollToTop.addEventListener('click', () => {
    topFunction();
})


function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}