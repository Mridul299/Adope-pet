
const loadcatagory = async() =>{
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
        const data = await res.json();
        displaycatagory(data.categories);
    }
    catch{
        console.error('Error fetching data:', error);
    }
    
};

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let btn of buttons) {
      btn.classList.remove("active");
    }
  };

const loadcatagorycard = (category)=>{
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) =>{

        removeActiveClass();

        const activeBtn = document.getElementById(`btn-${category}`);
        activeBtn.classList.add("active");
        displaycards(data.data)
    } )
    .catch((error)=>console.log(error))
};

// spinner
const loadallcards = () =>{
    document.getElementById("spineer").style.display = "none";

};

const handleCards = () =>{
    document.getElementById("spineer").style.display = "block";
  
    setTimeout(function(){
        loadallcards()
    },2000)
};

const displaycatagory =(categories)=>{
    const cetegoryContainer = document.getElementById("cetegory-container");
    categories.forEach((item) => {       
        // create button
        const buttoncontainer = document.createElement("div");
        // button.classList = 'btn bg-white flex  border rounded-2xl ';
    
        buttoncontainer.innerHTML = `
        <button id="btn-${item.category}" onclick="loadcatagorycard('${item.category}'),handleCards()" class=" category-btn lg:h-16 justify-center  flex items-center gap-2 lg:px-11 px-2 rounded-2xl border " >
        <span>
        <img class="lg:w-12 w-5" src=${item.category_icon} alt=""> </span>
        <span><h1 class="lg:text-2xl font-bold">${item.category}</h1></span>
        
       </button>
         `;     
        cetegoryContainer.append(buttoncontainer);
    });
};

const loadcards = async() =>{
    try{
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await res.json();
        displaycards(data.pets);
    }
    catch{
        console.error('Error fetching data:', error);
    }
    
};

const displaymodal = (petId) =>{
    const detailsContainer = document.getElementById('modalContainer');

    detailsContainer.innerHTML = `
      <div class="max-w-[500px] ">
        <div class=" rounded-lg">
            <img src=${petId.image} class="object-cover rounded-lg w-full" alt="">
        </div>
    
        <div class="my-4">
            <div class="my-5 border-b pb-3">
                <h1 class="text-2xl font-bold mb-4">${petId.pet_name}</h1>
                <div class="grid grid-cols-2 text-[#868585]">
                    <p><i class="fa-solid fa-cubes"></i> Breed : ${petId.breed? petId.breed : 'Not available'}</p>
                    <p><i class="fa-solid fa-calendar"></i> Birth: ${petId.date_of_birth? petId.date_of_birth : 'Not available'}</p>
                    <p><i class="fa-solid fa-mercury"></i> Gender: ${petId.gender? petId.gender: 'Not available'}</p>
                    <p><i class="fa-solid fa-dollar-sign"></i> Price: ${petId.price? petId.price: 'Not available'}$</p>
                    <p><i class="fa-solid fa-syringe"></i> Vaccinated status: ${petId.vaccinated_status? petId.vaccinated_status:'Not available'}</p>
                </div>
            </div>
            <div>
                <h2 class="text-base font-semibold mb-4">Details Information</h2>
                <p class="text-[#868585]">${petId.pet_details} </p>
            </div>
        </div>
        <div class="modal-action">
            <form method="dialog" class="w-full ">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn  w-full text-[#0E7A81] bg-[#b1e3e7] border">Close</button>
            </form>
        </div>
    </div>
    `;
    // way-1
    // document.getElementById('showModalData').click();
    // way-2
    document.getElementById("customModal").showModal();

};

const adopmodal = () =>{
    console.log('hello');
    const detailsContainer2 = document.getElementById('modalContainer2');
    detailsContainer2.innerHTML = `
     <div class="w-[500px] bg-white rounded-lg">
                <h2 class="font-semibold text-center text-4xl py-11">congratulation! <br> 🎉</h2>
        <div class="modal-action">
            <form method="dialog" class="w-full ">
                <!-- if there is a button in form, it will close the modal -->
                <button  class="btn w-full text-[#0E7A81] bg-[#b1e3e7] border">Close</button>
            </form>
        </div>
    </div>
    `;
    // way-1
    // document.getElementById('showModalData').click();
    // way-2
    document.getElementById("customModal2").showModal();
   

};

const loaddetails = async(petId) =>{
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
        const data = await res.json();
        displaymodal(data.petData);
    }
    catch{
        console.error('Error fetching data:', error);
    }
    

};

const addimage = (image) =>{
    const imgContainer = document.getElementById('imageContainer');
    const imagediv = document.createElement("div");
    imagediv.innerHTML = `
    <div>
     <img src=${image} class="rounded-lg" alt="">
    </div>
    `;
    imgContainer.append(imagediv);
};

const displaycards = (pets) =>{
    const cardContainer = document.getElementById("cardContainer");
    
    cardContainer.innerHTML = "";
    if(pets.length === 0){
        cardContainer.classList.remove('grid');
        cardContainer.innerHTML = `
       
            <div class="w-full flex flex-col gap-5 justify-center items-center my-16 ">
                <img src="./assets/error.webp" class="w-32 h-32" alt="">
                <h2 class="font-bold text-center text-2xl lg:text-3xl">No Information Available</h2>
                <p class="text-center text-xs lg:text-lg font-lato text-[#131313]">It is a long established fact that a reader will be distracted by the readable content   of a page when looking at 
                    its layout.</p>
            </div>
     
            `;
        return;
    }else{
        cardContainer.classList.add("grid");
    };

    pets.forEach((pet)=>{
        const card = document.createElement("div");
        card.classList = 'card card-compact ';
        card.innerHTML = 
        `
         <div class="p-2 border rounded-xl m-2">
            <figure class="rounded-lg">
                <img src=${pet.image} class="lg:max-w-64 w-full h-40" />
            </figure>
            <div class="border-b pb-2">
                <h1 class="text-xl font-bold mt-5">${pet.pet_name}</h1>
                <p class="text-slate-500"><i class="fa-solid fa-cubes"></i> Breed: ${pet.breed? pet.breed : "Not available"}</p>
                <p class="text-slate-500"><i class="fa-solid fa-calendar"></i>  Birth: ${pet.date_of_birth? pet.date_of_birth : "Not available"}</p>
                <p class="text-slate-500"><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender? pet.gender : "Not available"}</p>
                <p class="text-slate-500"><i class="fa-solid fa-dollar-sign"></i> Price: ${pet.price? pet.price : "Not available"}$</p>
            </div>
            <div class="flex justify-between items-center mt-2">
                    <button onclick="addimage('${pet.image}')" class="btn bg-white">
                        <img src="./assets/like.png" class="w-2 " alt="">
                    </button>
                    <button class="btn bg-white text-[#0E7A81] text-xs font-bold" onclick="adopmodal()" id="adopbtn">Adopt</button>
                    <button onclick="loaddetails('${pet.petId}')" class="btn bg-white text-[#0E7A81] text-xs font-bold">Details</button>
            </div>
        </div>
        
        `;

        cardContainer.append(card);
    })

}

loadcatagory();
loadcards();

